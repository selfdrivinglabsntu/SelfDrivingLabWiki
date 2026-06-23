# Hardware Assembly Guide

## Overview
This page contains instructions for the hardware assembly of the Automated Liquid Handler. Please refer to the [3D printing files](https://github.com/selfdrivinglabsntu/SelfDrivingLab/tree/main/Hardware) and the [Bill of Materials](bill_of_materials.md) for the relevant parts. 

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

![linear Actuator](images/components/linear_actuator.png)
</div>

<div class="flow-grid-item" markdown>
Stepper Motor
{: .flow-grid-title }

![Stepper Motor](images/components/stepper_motor.webp)
</div>

<div class="flow-grid-item" markdown>
Linear Rail
{: .flow-grid-title }

![Linear Rail](images/components/linear_rail.jfif)
</div>

<div class="flow-grid-item" markdown>
Belt
{: .flow-grid-title }

![belt](images/components/belt.webp){.img-xxs}
</div>

<div class="flow-grid-item" markdown>
Assembled PCB Board
{: .flow-grid-title }

![assembled pcb](images/components/assembled_pcb.jfif){.img-xxs}
</div>

</div>

Mechanical Fastners
{: .flow-subtitle }

<div class="flow-grid" markdown>

<div class="flow-grid-item" markdown>
M2x20mm x10  
M3x20   x20
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

Follow the Creality User Manual Instructions, but:

- Skip nozzle assembly and wire clamp installation
    - Dismantle the nozzle assembly and keep the **extruder sprite board** (Figure 1) aside 
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
    - Dismantle the nozzle assembly and keep the **extruder sprite board** (Figure 1) aside 
- Remove filament spool holder and filament sensor

</div>
</div> 
</div>

![Sprite Board](images/creality_sprite_board.png){.img-sm}
<p class="p-1">Figure 1: Ender 3 S1 Extruer Sprite Board</p>
</div>

<div class="flow-step" markdown>
##**Installation of z-limit switch**

<div class="flow-grid" markdown>
<div class="flow-grid-item" markdown>
You will need
{: .flow-grid-title }

<div class="parts-grid" markdown>

![screwdriver](images/icons/screwdriver.svg){.img-icon}

![screw1](images/icons/x2%20M5x10mm%20screw.svg){.img-icon}

![screw2](images/icons/x2%20M5x6mm%20screw.svg){.img-icon}

</div>
</div>
</div>

**Why we need a z-limit switch?**  
Traditionally, z-homing on the Ender 3 S1 is performed using a BL Touch sensor. This sensor operates strictly in the downward direction, meaning the Z = 0 reference point is only established when the probe physically contacts the print bed. This is not suitable for the purpose of our project as the bed plate is occupied by liquid handling appratus such as the well plates, sample solution holders, tip holder and the tip ejection module. These obstructions will prevent homing in downwards direction. Thus, a limit switch is installed on the top of the printer frame to perform z-homing upwards i.e. when the gantry moves upwards and hits the limit switch the Z_Max is recorded. 

**Installation steps**  
Remove the bottom casing of the printer. 

![Bottom Cover Remove](images/printer_bottom.jpg){.img-md}
<p class="p-1">Figure 2: Unscrew bottom casing of the 3D printer.</p>


Plug the z-limit switch into port J713 as shown in Figure 3A.  

![Bottom Cover](images/z-limit%20switch%20port.png)
<p class="p-1">Figure 3: Left - Diagramatic representation and description of mainboard interfaces and connections, Right - Photograph of mainboard with z-limit switch pugged in</p>

>**Important:** Note down the version of the chip on the mainboard for your printer as it will be needed when compiling the custom [Marlin Firmware](../software/firmware.md). 

**Mounting the z-limit switch**  
The z-limit switch was mounted as shown in Figure 3.

![z-limit switch mount](images/sketches/Z_limit_switch.svg){.center}

<p class="p-1">Figure 4: Left - location for mounting z-limit switch. Right - Close-up of the Z-limit switch installation The switch secures to the mount with two M3 x 6 mm screws; the mount fastens to the 3D printer's aluminium extrusion using two M5 x 10mm screws.</p>

![photo z-limit switch mount](images/components/z_limit_switch.jpeg){.center .img-sm}
<p class="p-1">Figure : Photograph of z-limit switch installed.</p>


</div>

<div class="flow-step" markdown>
##**Installation of the tip disposal and the 3D printed bed plate**

The tip disposal and the 3D printer bed plate are fixed onto the aluminium heat bed of the printer using the screws of the manual leveling knobs. 



**Removing the magnetic base** 

<div class="flow-grid" markdown>
<div class="flow-grid-item" markdown>
You will need
{: .flow-grid-title }

<div class="parts-grid" markdown>

![plier](images/icons/plier.svg){.img-icon} 

![screwdriver](images/icons/screwdriver.svg){.img-icon}

![labour](images/icons/labour_1to2.svg){.img-icon}

</div>

</div>

</div>

The magnetic base is stuck onto the aluminium heat bed using a very strong adhesive. We suggest using strong pliers to rip off the magnetic base and an extra pair of hands to hold down the 3D printer while the other person removes the magnetic base.

![remove magnetic base](images/magnetic_base_removal.png)
<p class="p-1">Figure 5: Magnetic base removal. (A) Photograph of magnetic base. (B) Magnetic base being removed.</p>

**Installing Bed Plate and Tip Disposal Module**  
You will notice that there already exist 4 screws that connect the manual levelling knobs to the aluminium bed. We will make use of these screws to fix our bed plate and tip disposal onto the aluminium bed.

![photo z-limit switch mount](images/sketches/bed_plate%20and%20tip_disposal.svg){.center}
<p class="p-1">Figure 6: Screw in bed plate and tip disposal. Replace springs with stand offs.</p>

<div class="parts-grid" markdown>

![manual leveling knob](images/leveling_knob.jpeg){.img-sm} 

![bed plate and tip disposal](images/bed_plate_tip_disposal.jpeg){.img-sm}  

</div>

</div>

<div class="flow-step" markdown>
##**Installation of Tip Ejector and Camera Mount**

<div class="flow-grid" markdown>
<div class="flow-grid-item" markdown>
You will need
{: .flow-grid-title }

<div class="parts-grid" markdown>

![plier](images/icons/plier.svg){.img-icon} 

![screwdriver](images/icons/screwdriver.svg){.img-icon}

![labour](images/icons/labour_1to2.svg){.img-icon}

</div>
</div>
</div>

<div class="parts-grid" markdown>

![tip ejector 1](images/sketches/Tip_ejector_2screws.svg){.img-sm}

![tip ejector 2](images/sketches/Tip_ejector_4screws.svg){.img-sm}

</div>

</div>

<div class="flow-step" markdown>
##**Installation of Frame**

<div class="flow-grid" markdown>
<div class="flow-grid-item" markdown>
You will need
{: .flow-grid-title }

<div class="parts-grid" markdown>

![plier](images/icons/plier.svg){.img-icon} 

![screwdriver](images/icons/screwdriver.svg){.img-icon}

![labour](images/icons/labour_1to2.svg){.img-icon}

</div>
</div>
</div>

<div class="parts-grid" markdown>


![Frame side view](images/sketches/frame_side_view.svg){.img-sm}


</div>

Add images

</div>

<div class="flow-step" markdown>




</div>

