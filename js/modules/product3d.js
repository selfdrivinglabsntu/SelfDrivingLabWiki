/** Scroll-driven 3D product orbit. Renders the (Draco-compressed) product GLB
 *  in #product3dCanvas and sweeps the camera around it as the visitor scrolls
 *  through #product3dPin. Vendored three.js (see vendor/three) resolved via
 *  the page's import map. */
import * as THREE from 'three';
import { GLTFLoader } from '../../vendor/three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '../../vendor/three/examples/jsm/loaders/DRACOLoader.js';

const MODEL_URL = 'assets/heimdall.compressed.glb';
const DRACO_DECODER_PATH = 'vendor/three/examples/jsm/libs/draco/';

// Orbit shape: azimuth sweeps a wide arc left-to-right around the model's
// vertical (Y) axis; polar angle and radius breathe slightly mid-scroll so
// the camera reads as a slow, deliberate dolly rather than a flat turntable.
const AZIMUTH_SPAN = THREE.MathUtils.degToRad(250);
const AZIMUTH_START = THREE.MathUtils.degToRad(-125);
const POLAR_BASE = THREE.MathUtils.degToRad(68);
const POLAR_SWING = THREE.MathUtils.degToRad(10);
const RADIUS_BASE = 4.7;
const RADIUS_SWING = 0.75;

// The source GLB was exported lying on its back (Z-up CAD convention baked
// into the mesh); tip it upright around X, with a small Y correction so the
// front faces the camera at theta = 0 (the midpoint of the azimuth sweep).
const MODEL_ROTATION = new THREE.Euler(
  THREE.MathUtils.degToRad(90),
  THREE.MathUtils.degToRad(2),
  0
);

function buildEnvironment(renderer) {
  const canvas = document.createElement('canvas');
  canvas.width = 8; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, '#0c0f15');
  grad.addColorStop(0.42, '#1b2c36');
  grad.addColorStop(0.5, '#57cdff');
  grad.addColorStop(0.58, '#16232b');
  grad.addColorStop(1, '#050608');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 8, 128);

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envMap = pmrem.fromEquirectangular(tex).texture;
  pmrem.dispose();
  tex.dispose();
  return envMap;
}

function frameModel(root) {
  // Some exported meshes carry stale/incorrect bounding-box metadata baked
  // into the glTF accessors; three.js trusts that cached data by default
  // (Box3's "fast" path), which silently measures the wrong region. Force
  // fresh per-vertex bounds before doing anything else.
  root.traverse((node) => {
    if (node.isMesh) {
      node.geometry.computeBoundingBox();
      node.geometry.computeBoundingSphere();
    }
  });

  // Scale first, then re-measure in already-scaled space before centering —
  // some exported hierarchies carry nested transforms that make a single
  // pre-computed offset drift, so each step re-reads the real box instead
  // of trusting an algebraic projection forward.
  const rawBox = new THREE.Box3().setFromObject(root, true);
  const rawSize = rawBox.getSize(new THREE.Vector3());
  const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
  root.scale.setScalar(1.6 / maxDim);
  root.updateMatrixWorld(true);

  const scaledBox = new THREE.Box3().setFromObject(root, true);
  const center = scaledBox.getCenter(new THREE.Vector3());
  root.position.x -= center.x;
  root.position.z -= center.z;
  root.position.y -= scaledBox.min.y;
  root.updateMatrixWorld(true);

  const finalBox = new THREE.Box3().setFromObject(root, true);
  return finalBox.getSize(new THREE.Vector3()).y * 0.5;
}

export function initProduct3D(animated) {
  const stage = document.getElementById('product3dStage');
  const canvas = document.getElementById('product3dCanvas');
  const loading = document.getElementById('product3dLoading');
  if (!stage || !canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.environment = buildEnvironment(renderer);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

  const hemi = new THREE.HemisphereLight(0xa8bfce, 0x14110c, 0.55);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff4e6, 3.4);
  key.position.set(3.2, 4.4, 2.6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 12;
  key.shadow.bias = -0.0025;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xbfe4ff, 1.1);
  rim.position.set(-3.4, 2.2, -3.2);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0xfff0dd, 0.6);
  fill.position.set(-2, 1, 3);
  scene.add(fill);

  const shadowPlane = new THREE.Mesh(
    new THREE.CircleGeometry(3.2, 48),
    new THREE.ShadowMaterial({ opacity: 0.35 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  const pivot = new THREE.Group();
  scene.add(pivot);

  let targetHeight = 0.6;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(DRACO_DECODER_PATH);
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    MODEL_URL,
    (gltf) => {
      const root = gltf.scene;
      root.rotation.copy(MODEL_ROTATION);
      root.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      targetHeight = frameModel(root);
      pivot.add(root);
      if (loading) {
        loading.classList.add('is-hidden');
        setTimeout(() => { loading.style.display = 'none'; }, 550);
      }
      initColorDebug(root);
    },
    undefined,
    (err) => {
      console.error('HEIMDALL 3D viewer: failed to load', MODEL_URL, err);
      if (loading) loading.innerHTML = '<span>Couldn’t load the 3D model.</span>';
    }
  );

  function cameraForProgress(p) {
    const theta = AZIMUTH_START + p * AZIMUTH_SPAN;
    const wave = Math.sin(p * Math.PI);
    const phi = POLAR_BASE - wave * POLAR_SWING;
    const radius = RADIUS_BASE - wave * RADIUS_SWING;
    return new THREE.Vector3().setFromSpherical(new THREE.Spherical(radius, phi, theta));
  }

  let current = 0;
  let target = 0;
  const lookTarget = new THREE.Vector3();

  function render() {
    lookTarget.set(0, targetHeight * 0.85, 0);
    const pos = cameraForProgress(current);
    pos.y += targetHeight * 0.15;
    camera.position.copy(pos);
    camera.lookAt(lookTarget);
    renderer.render(scene, camera);
  }

  let rafId = null;
  function tick() {
    current += (target - current) * 0.08;
    render();
    rafId = requestAnimationFrame(tick);
  }
  function startLoop() { if (rafId === null) tick(); }
  function stopLoop() { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } }

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  const io = new IntersectionObserver(
    (entries) => { entries[0].isIntersecting ? startLoop() : stopLoop(); },
    { threshold: 0.01 }
  );
  io.observe(stage);

  if (animated && window.gsap && window.ScrollTrigger) {
    const proxy = { p: 0 };
    window.gsap.to(proxy, {
      p: 1, ease: 'none',
      scrollTrigger: { trigger: '#product3dPin', start: 'top top', end: 'bottom bottom', scrub: true },
      onUpdate: () => { target = proxy.p; }
    });
  } else {
    // Reduced motion / no GSAP: settle on one considered, static angle.
    target = current = 0.4;
  }

  // TEMP DEBUG: click a part on the model to jump to its material in the
  // panel, then pick a new color — updates live. Report the hex values back
  // and they'll get baked into the GLB permanently; remove this block after.
  function initColorDebug(root) {
    // How many meshes currently reference each material — >1 means clicking
    // one of those parts should split off an independent copy rather than
    // recoloring every part that shares it.
    const usageCount = new Map();
    function countUsage() {
      usageCount.clear();
      root.traverse((node) => {
        if (!node.isMesh || !node.material) return;
        const mats = Array.isArray(node.material) ? node.material : [node.material];
        mats.forEach((m) => usageCount.set(m.uuid, (usageCount.get(m.uuid) || 0) + 1));
      });
    }
    countUsage();

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.textContent = 'Hide colors';
    toggleBtn.style.cssText = 'position:absolute;top:8px;right:8px;z-index:11;' +
      'background:rgba(0,0,0,.75);color:#fff;font:11px monospace;border:none;border-radius:4px;' +
      'padding:5px 9px;cursor:pointer;';
    stage.appendChild(toggleBtn);

    const panel = document.createElement('div');
    panel.style.cssText = 'position:absolute;top:38px;right:8px;bottom:8px;width:210px;overflow:auto;' +
      'background:rgba(0,0,0,.75);color:#fff;font:11px monospace;padding:8px;border-radius:6px;z-index:10;';
    stage.appendChild(panel);

    toggleBtn.addEventListener('click', () => {
      const hidden = panel.style.display === 'none';
      panel.style.display = hidden ? 'block' : 'none';
      toggleBtn.textContent = hidden ? 'Hide colors' : 'Show colors';
    });

    const exportBtn = document.createElement('button');
    exportBtn.type = 'button';
    exportBtn.textContent = 'Export current colors';
    exportBtn.style.cssText = 'display:block;width:100%;margin-bottom:8px;background:rgba(255,255,255,.12);' +
      'color:#fff;font:11px monospace;border:1px solid rgba(255,255,255,.35);border-radius:4px;' +
      'padding:5px;cursor:pointer;';
    panel.appendChild(exportBtn);

    exportBtn.addEventListener('click', () => {
      const dump = [];
      let i = 0;
      root.traverse((node) => {
        if (!node.isMesh || !node.material) return;
        const mat = Array.isArray(node.material) ? node.material[0] : node.material;
        dump.push({ meshIndex: i++, originalMaterial: mat.name || null, colorHex: '#' + mat.color.getHexString() });
      });
      const json = JSON.stringify(dump, null, 1);
      let ta = panel.querySelector('textarea');
      if (!ta) {
        ta = document.createElement('textarea');
        ta.readOnly = true;
        ta.style.cssText = 'width:100%;height:220px;font:10px monospace;margin-top:6px;' +
          'background:#111;color:#8f8;border:1px solid rgba(255,255,255,.3);border-radius:4px;';
        panel.appendChild(ta);
      }
      ta.value = json;
      ta.select();
      if (navigator.clipboard) navigator.clipboard.writeText(json).catch(() => {});
      exportBtn.textContent = 'Copied — paste to Claude';
      setTimeout(() => { exportBtn.textContent = 'Export current colors'; }, 1800);
    });

    const rows = new Map();
    function addRow(mat, splitOff) {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:6px;padding:3px 2px;border-radius:3px;transition:background .3s;';

      const input = document.createElement('input');
      input.type = 'color';
      input.value = '#' + mat.color.getHexString();
      input.style.cssText = 'width:22px;height:18px;border:none;padding:0;background:none;cursor:pointer;flex:none;';

      const label = document.createElement('span');
      label.textContent = (mat.name || mat.uuid.slice(0, 6)) + (splitOff ? ' · split' : '');
      label.style.cssText = 'flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';

      const hexOut = document.createElement('span');
      hexOut.textContent = input.value;
      hexOut.style.cssText = 'opacity:.7;flex:none;';

      input.addEventListener('input', () => {
        mat.color.set(input.value);
        hexOut.textContent = input.value;
        render();
      });

      row.append(input, label, hexOut);
      panel.appendChild(row);
      rows.set(mat.uuid, row);
      return row;
    }

    const materials = new Map();
    root.traverse((node) => {
      if (!node.isMesh || !node.material) return;
      const mats = Array.isArray(node.material) ? node.material : [node.material];
      mats.forEach((m) => materials.set(m.uuid, m));
    });
    materials.forEach((mat) => addRow(mat, false));

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObject(pivot, true)[0];
      if (!hit) return;
      const mesh = hit.object;
      let mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;

      if (usageCount.get(mat.uuid) > 1) {
        // Shared by other parts still on screen — split this mesh onto its
        // own material copy instead of recoloring everything that uses it.
        const clone = mat.clone();
        mesh.material = clone;
        usageCount.set(mat.uuid, usageCount.get(mat.uuid) - 1);
        usageCount.set(clone.uuid, 1);
        mat = clone;
        addRow(mat, true);
      }

      const row = rows.get(mat.uuid);
      if (!row) return;
      row.scrollIntoView({ block: 'center' });
      row.style.background = 'rgba(255,255,255,.2)';
      setTimeout(() => { row.style.background = ''; }, 800);
      row.querySelector('input').focus();
    });
  }
}
