# Printing Parts for Your Machine

Before diving into the production of your parts, it is important to consider your manufacturing approach. The core spirit and intent of this open-source project is to empower you to utilize a 3D printer to rapidly fabricate the entire machine yourself. However, practical testing has shown that printing every component locally can be highly time-consuming, requiring significant machine calibration, print time, and post-processing. 

If you are on a tight timeline or require maximum structural reliability right out of the box, we highly suggest outsourcing these files to a commercial 3D printing service (such as JLCPCB, PCBWay, or Craftcloud) for rapid production.

---

## 0. Print Settings

If you choose to print the components yourself, group your print jobs using the following configurations to handle the different mechanical stresses experienced by the liquid handler:

| Part Category | Wall Loops / Perimeters | Infill Density | Top/Bottom Layers |
| :--- | :---: | :---: | :---: |
| **Gears** | 4 – 5 | 100% | 5 |
| **Structural & Load-Bearing Parts**<br>*(Mounts, brackets, clamps)* | 4 – 5 | 40% (Gyroid) | 5 |
| **Enclosures & Trays**<br>*(Electronics cases, sample/disposal holders)* | 2 | 15% – 20% (Grid/Gyroid) | 2 |

---

## 1. 3D Printed Parts Checklist

All files are located in the `hardware` folder of our repository.

## 1.1. Key Parts

| Part Name | File Location | Print Setting Category |
| :--- | :--- | :--- |
| [Frame](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/Frame.stl) | `Frame.stl` | Structural & Load-Bearing |
| [Upper Frame](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/Frame%20Linear%20Actuator%20Mount.stl) | `Frame Linear Actuator Mount.stl` | Structural & Load-Bearing |
| [Pipette Bracket](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/Pipette%20Bracket.stl) | `Pipette Bracket.stl` | Structural & Load-Bearing |
| [Driver Gear](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/Driver%20Gear.stl) | `Driver Gear.stl` | Gears |
| [Driven Gear](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/Driven%20Gear.stl) | `Driven Gear.stl` | Gears |
| [Tip Disposal](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/Tip%20Disposal.stl) | `Tip Disposal.stl` | Structural & Load-Bearing |
| [Tip Ejector](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/Tip%20Ejector.stl) | `Tip Ejector.stl` | Structural & Load-Bearing |
| [Tip Catcher](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/Tip%20Catcher.stl) | `Tip Catcher.stl` | Enclosures & Trays |
| [Camera Mount](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/Board%20Camera%20Mount.stl) | `Board Camera Mount.stl` | Enclosures & Trays |
| [Bed Plate](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/Bed%20plate.stl) | `Bed plate.stl` | Enclosures & Trays |

---

## 1.2. Accessories

| Part Name | File Location | Print Setting Category | Description | Equipment Model Name |
| :--- | :--- | :--- | :--- | :--- |
| [8 Sample Holder](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/8%20Sample%20Holder.stl) | `8 Sample Holder.stl` | Enclosures & Trays | Holds 6 5ml and 2 20ml bottles | 6-5ml-sample-holder & 2-20ml-bottle-holder |
| [12 Sample Holder](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/12%20Bottle%20Holder.stl) | `12 Sample Holder.stl` | Enclosures & Trays | Holds 12 4ml bottles | 12-sample-holder |
| [96 Wellplate Holder](https://github.com/selfdrivinglabsntu/SelfDrivingLab/blob/main/Hardware/STL%20Files/96%20Wellplate%20Holder.stl) | `96 Wellplate Holder.stl` | Enclosures & Trays | Holds 96 wellplate | 96-wellplate |

