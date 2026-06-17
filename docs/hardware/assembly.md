# Hardware Assembly Guide

## Overview
This page contains instructions for the hardware assembly of the Automated Liquid Handler. Please refer to the [3D printing files] and the [Bill of Materials](bill_of_materials.md) for the relevant parts. 

<div class="flow" markdown>

<div class="flow-step" markdown>
Parts List
{: .flow-title }

Gather all items.

<p>3D printed Parts</p>
<div class="flow-grid" markdown>
<div class="flow-grid-item" markdown>
Tip collector
{: .flow-grid-title }

Holder for loading tips.
![Tip Holder](images/Ender_3_S1_magnetic_plate_removal.jpg)
</div>


<div class="flow-grid-item" markdown>
Spin-coater bracket
{: .flow-grid-title }

3D-printed, PETG.
</div>

<div class="flow-grid-item" markdown>
2.5 mm hex key
{: .flow-grid-title }
</div>

<div class="flow-grid-item" markdown>
2.5 mm hex key
{: .flow-grid-title }
</div>

</div>
</div>
<div class="flow-step" markdown>
Fit the X-axis rail
{: .flow-title }

Slide the linear rail into the dovetail and push it flush against the rear stop.
</div>

<div class="flow-step is-decision" markdown>
Check
{: .flow-eyebrow }

Is the rail square to within 0.5&nbsp;mm?
{: .flow-title }
</div>

<div class="flow-split" markdown>

<div class="flow-branch" markdown>
Yes →
{: .flow-branch-label }

<div class="flow-step" markdown>
Torque the standoffs
{: .flow-title }

Cross-pattern to 0.6&nbsp;N·m.
</div>
</div>

<div class="flow-branch" markdown>
No ↺
{: .flow-branch-label }

<div class="flow-step" markdown>
Loosen & reseat
{: .flow-title }

Back off the rear stop, re-square, and return to the check.
</div>
</div>

</div>

<div class="flow-step" markdown>
Wire the ESP32 spin controller
{: .flow-title }

Connect the motor driver to the ESP32 and route the harness through the strain-relief clip.
</div>

<div class="flow-step" markdown>
Power-on test
{: .flow-title }

Command 3000&nbsp;RPM — the firmware floor — and confirm steady rotation before closing up.
</div>

</div>


<!-->
## Parts Checklist
<div class="parts-grid">

  <div class="parts-card">
    <details>
    <summary>🔩 Stepper Motor</summary>
    **Quantity:** 2  
        **Type:** NEMA 17  
        **Torque:** 40 N·cm  

        ![Motor](images/motor.png)
    </details>
  </div>

  <div class="parts-card">
    <b>Allen Keys</b><br>
    Metric set required
    <input type="checkbox">
  </div>

  <div class="parts-card">
    <b>Multimeter</b><br>
    Voltage & continuity check
    <input type="checkbox">
  </div>

  <div class="parts-card">
    🧪 <b>Multimeter</b><br>
    Voltage & continuity check
    <input type="checkbox">
  </div>
</div>
---

## Step 1: Frame Assembly
Description of the step.

![Frame Assembly](images/step1_frame.jpg)

---

## Step 2: Mount Motors
Description of what to do.

![Motor Mounting](images/step2_motor.jpg)

---

## Step 3: Wiring
Explain connections clearly.

<img src="images/wiring_diagram.png" width="500">

---

## Step 4: Final Setup
Final checks and calibration steps.

---

## Troubleshooting
- Motor not spinning → check power supply
- Loose movement → tighten couplers
