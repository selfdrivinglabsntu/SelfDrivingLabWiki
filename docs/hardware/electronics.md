# Setting Up Electronics

### 0. Parts & Tools Required

#### 0.1. Components & Materials:
* Mounting Case
* ESP32 Development Board
* TB6612FNG Motor Driver Module
* DC Barrel Jack (for 12V input)
* Linear Actuator
* Donut Board / Perforated PCB
* Creality Extruder Breakout Board
* Female Header Pins (x2, to socket the ESP32/driver)
* JST 2-Pin Male PCB Headers (x2)
* JST 2-Pin Female Wire Connectors (x2)
* Butt Crimp Connectors
* 24 AWG Hook-up Wire (recommended)
* Solder
* USB-C Cable
* M2 & M3 Screws
* Ender 3 S1 Extruder Breakout Board
* Molex PicoBlade (1.25mm pitch) 4-pin male Connectors
* Stepper Motor JST Connector

#### 0.2. Required Tools:
* Soldering Iron & Solder Wire
* Wire Strippers
* Crimping Tool (for JST/butt crimps)
* Multimeter

#### 0.3. Required Software
Download and install [Arduino IDE](https://docs.arduino.cc/software/ide/).

---

### 1. Soldering the PCB

![Electronics wiring diagram](images/Electronics%20wiring.drawio.png)

Follow the schematic diagram above to assemble your control board on the donut board:

1. Solder the female header pins onto the donut board for the ESP32 and TB6612FNG motor driver.
2. Run your 24 AWG wires along the back of the board to establish the connections between the ESP32 pins, the motor driver logic pins, and the power rails.
3. Solder the two **JST 2-Pin Male Headers** onto the board. One will serve as the dedicated 12V power supply input, and the other will serve as the motor driver output to the linear actuator.
4. Use multimeter continuity tester to check connections.

---

### 2. Wiring the Motor and 12V Power Supply

Once your main control board is soldered, prepare the external connections:

1. **Power Supply Connection:** * Strip the ends of the positive and negative wires coming from your 12V DC barrel jack.
   * Crimp these wires into a **JST 2-pin female connector housing**. 
   * Double-check your polarity (+/-) against your PCB layout before plugging it into the power input JST header.
2. **Linear Actuator Connection:**
   * Cut the factory leads of the linear actuator to your desired length and strip the ends.
   * Crimp a **JST 2-pin female connector housing** onto the actuator leads using your crimping tool (or use butt crimps if extending the wires permanently).
   * Plug this connector into the designated motor output JST header on your board.

### 3. Flash ESP firmware

If you have not already done so, download the project repository from the [Software Setup Guide](../software/git.md).

1. Open the Arduino IDE on your computer and connect your ESP32 development board using a USB-C cable. 
2. Within the IDE menu, navigate to **Tools > Board** and select **ESP32 Dev Module** (or your specific ESP32 board variant). Next, go to **Tools > Port** and select the active COM port assigned to your plugged-in board.

3. Locate the downloaded repository, open the file located at `ESP32/esp_comm/esp_comm.ino` with the Arduino IDE and open it.
4. Click the **Upload** button (the right-arrow icon) to flash the firmware onto the board.

### 4. Extruder Motor Wiring

Solder or crimp your extruder motor wires to a **Molex PicoBlade (1.25mm pitch)** male connector. 

Ensure your wire pinning matches your specific stepper motor's phase coils before plugging it in.

<!-- ![Extruder connection diagram](images/extruder_connection.png) -->

### 5. Mounting Electronics

1. Thread the M3 screws loosely into the T-slot nuts through the mounting holes of the electronics enclosure case.
2. Align the T-slot nuts with the channels on the liquid handler's aluminum metal extrusions, press the case flat against the frame, and tighten the screws securely.
3. Mount your extruder breakout board into its designated slot within the case, then plug in the extruder motor cable, and plug main cable into the board through the top of the case.
4. Mount your main control PCB into the enclosure. Connect the 12V power supply JST connector, the linear actuator JST connector, and the USB-C data cable to the ESP32.
5. Close enclosure with 2 M3 Screws.