# Hardware Assembly Guide

## Overview
This page contains instructions for the hardware assembly of the Automated Liquid Handler. Please refer to the [3D printing files] and the [Bill of Materials](bill_of_materials.md) for the relevant parts. 

<div class="flow" markdown>

<div class="flow-step" markdown>
##Parts List

Gather all items.

3D Printed Parts
{: .flow-subtitle }
<div class="flow-grid" markdown>
<div class="flow-grid-item" markdown>
Tip Holder
{: .flow-grid-title }

![Tip Holder Tiny](images/CAD_Images/Tip%20Holder%202-200microliter.png)

[more options]()
</div>

<div class="flow-grid-item" markdown>
Bed Plate
{: .flow-grid-title }

![Bed Plate](images/CAD_Images/Bed_Plate.png)
</div>

<div class="flow-grid-item" markdown>
Tip Disposal
{: .flow-grid-title }

![Tip Disposal](images/CAD_Images/Tip%20Disposal.png)
</div>

<div class="flow-grid-item" markdown>
Tip Ejector
{: .flow-grid-title }

![Tip Ejector](images/CAD_Images/Tip%20Ejector.png)
</div>

<div class="flow-grid-item" markdown>
Tip Catcher
{: .flow-grid-title }

![Tip catcher](images/CAD_Images/Tip%20Catcher.png)
</div>

<div class="flow-grid-item" markdown>
Camera Mount
{: .flow-grid-title }

![Camera Module](images/CAD_Images/camera%20mount.png)
</div>

<div class="flow-grid-item" markdown>
96 Well Plate Holder
{: .flow-grid-title }

![Well Plates](images/CAD_Images/96%20well%20Plate%20holder.png)
</div>

<div class="flow-grid-item" markdown>
Sample Holder
{: .flow-grid-title }

![Stock Holder](images/CAD_Images/8%20Sample%20Holder.png)
</div>

<div class="flow-grid-item" markdown>
Frame
{: .flow-grid-title }

![Pipette Bracket](images/CAD_Images/Frame.png)</div>

<div class="flow-grid-item" markdown>
Frame Linear Actuator Mount
{: .flow-grid-title }

![Frame Linear Actuator Mount](images/CAD_Images/Frame%20Linear%20Actuator%20Mount.png)
</div>

<div class="flow-grid-item" markdown>
Pipette Bracket
{: .flow-grid-title }

![Pipette Bracket](images/CAD_Images/Pipette%20Bracket.png)
</div>

<div class="flow-grid-item" markdown>
Z-limit switch mount
{: .flow-grid-title }

![Pipette Bracket](images/CAD_Images/z_limit_bracket_final.png)
</div>
</div>

Components
{: .flow-subtitle }

<div class="flow-grid" markdown>

<div class="flow-grid-item" markdown>
Linear Actuator
{: .flow-grid-title }

![M3 screws](image/)
</div>

<div class="flow-grid-item" markdown>
Stepper Motor
{: .flow-grid-title }

![M3 screws](image/)
</div>

<div class="flow-grid-item" markdown>
Linear Rail
{: .flow-grid-title }

![M3 screws](image/)
</div>

<div class="flow-grid-item" markdown>
Belt
{: .flow-grid-title }

![M3 screws](image/)
</div>

<div class="flow-grid-item" markdown>
Power Adaptor 12V
{: .flow-grid-title }

![M3 screws](image/)
</div>

<div class="flow-grid-item" markdown>
Assembled PCB Board
{: .flow-grid-title }

![M3 screws](image/)
</div>

</div>

Mechanical Fastners
{: .flow-subtitle }

<div class="flow-grid" markdown>

<div class="flow-grid-item" markdown>
M2x20mm 
{: .flow-grid-title }
![M3 screws](image/)
<p>Head Cap Screws</p>
</div>

<div class="flow-grid-item" markdown>
M3x30mm 
{: .flow-grid-title }
![M3 screws](image/)
<p>Head Cap Screws</p>
</div>

<div class="flow-grid-item" markdown>
M5x20mm 
{: .flow-grid-title }
![M3 screws](image/)
<p>Head Cap Screws</p>
</div>

<div class="flow-grid-item" markdown>
M5x25mm 
{: .flow-grid-title }
![M3 screws](image/)
<p>Head Cap Screws</p>
</div>

</div>
</div>


<div class="flow-step" markdown>
##3D-Printer Assembly 

<div class="flow-split" markdown>

<div class="flow-branch" markdown>
<div class="flow-step" markdown>
Assembling Ender 3 S1
{: .flow-title }

Follow the User Manual Instructions, but do the following:

- Skip Nozzle assembly and wire clamp installation
    - Dismantle the nozzle assembly and keep the **extruder sprite board** aside 
- Install the Gantry Frame
- Do not install the filament spool holder and filament sensor


</div>
</div>
<div>OR</div>
<div class="flow-branch" markdown>
<div class="flow-step" markdown>
Modifying Existing Ender 3 S1
{: .flow-title }

Dismantle your 3D printer as follow:

- Remove the nozzle assembly and wire clamp 
    - Dismantle the nozzle assembly and keep the **extruder sprite board** aside 
- Remove filament spool holder and filament sensor

</div>
</div> 
</div>

![Sprite Board](images/creality_sprite_board.png){.img-sm}
<p class="p-1">Figure 1: Ender 3 S1 Extruer Sprite Board</p>
</div>

<div class="flow-step" markdown>
##**Installation of z-limit switch**

**Why we need a z-limit switch?**  
Traditionally, z-homing on the Ender 3 S1 is performed using a BL Touch sensor. This sensor operates strictly in the downward direction, meaning the Z = 0 reference point is only established when the probe physically contacts the print bed. This is not suitable for the purpose of our project as the bed plate is occupied by liquid handling appratus such as the well plates, sample solution holders, tip holder and the tip ejection module. These obstructions will prevent homing in downwards direction. Thus, a limit switch is installed on the top of the printer frame to perform z-homing upwards i.e. when the gantry moves upwards and hits the limit switch the Z_Max is recorded. 

**Installation steps**  
Remove the bottom casing of the printer. 

![Bottom Cover Remove](images/printer_bottom.jpg){.img-md}
<p class="p-1">Figure 2: Unscrew bottom casing of the 3D printer.</p>


Plug the z-limit switch into port J713 as shown in Figure 3 (A).  

![Bottom Cover](images/z-limit%20switch%20port.png)
<p class="p-1">Figure 3: Left - Diagramatic representation and description of mainboard interfaces and connections, Right - Photograph of mainboard with z-limit switch pugged in</p>

**Make a note of:**  
  - The chip used on the mainboard for your printer as it will be needed when compiling custom [Marlin Firmware](). 

**Mounting the z-limit switch**  
The z-limit switch was mounted as shown in Figure 3.

![z-limit switch mount](images/z-limit%20installation.png)

<p class="p-1">Figure 4: Z-limit switch installation. (A) Close-up of the Z-limit switch. The switch secures to the mount with two M3 x 6 mm screws; the mount fastens to the 3D printer's aluminium extrusion using two M5 x 10mm screws. (B) Photograph of installed z-limit switch.</p>

</div>

<div class="flow-step" markdown>
##**Installation of the tip disposal and the 3D printed bed plate**

The tip disposal and the 3D printer bed plate are fixed onto the aluminium heat bed of the printer using the screws of the manual leveling knobs. 



**Removing the magnetic base stuck on top of the aluminium heat bed**  
The magnetic base is stuck onto the aluminium heat bed using a very strong adhesive. We suggest using strong pliars to rip off the magnetic base and an extra pair of hands to hold down the 3D printer while the other person removes the magnetic base.

![remove magnetic base](images/magnetic_base_removal.png)
<p class="p-1">Figure 5: Magnetic base removal. (A) Photograph of magnetic base. (B) Magnetic base being removed.</p>

**Installing Bed Plate and Tip Disposal Module**  
You will notice that there are 4 screws that connect the manual levelling knobs to the aluminium bed. We will make use of these screws to fix our bed plate and tip disposal 3D prints onto the aluminium bed.




</div>

<div class="flow-step" markdown>
Installation of Tip Disposal Module
{: .flow-title }


</div>

<div class="flow-step" markdown>

{: .flow-title }


</div>

</div>

