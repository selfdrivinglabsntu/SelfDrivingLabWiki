/**
 * PIPER landing page — entry point.
 * GSAP (+ ScrollTrigger) is loaded as globals via <script> tags in index.html.
 * This module wires up the animation modules and degrades gracefully.
 */
import { buildPlate } from './modules/plate.js';
import { initHero } from './modules/hero.js';
import { initLoop } from './modules/loop.js';
import { initPrecision, staticCounts } from './modules/precision.js';
import { initReveals } from './modules/reveals.js';
import { initProduct3D } from './modules/product3d.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const { gsap, ScrollTrigger } = window;

// Static content is built regardless of motion settings.
buildPlate();

if (!gsap || prefersReducedMotion) {
  // No animation: show final numbers so nothing reads as "0".
  staticCounts();
  // The loop diagram is still interactive (hover), just without auto-cycle.
  initLoop(false);
  initProduct3D(false);
} else {
  gsap.registerPlugin(ScrollTrigger);

  initReveals();
  initHero();
  initLoop(true);
  initPrecision();
  initProduct3D(true);

  // Recalculate trigger positions once web fonts have settled.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
