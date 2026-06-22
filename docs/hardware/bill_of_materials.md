# Bill of Materials

## 0. Key Items

<div class="bom-wrapper">
  <table id="key-items-table">
    <thead>
      <tr>
        <th style="width: 80px;">Status</th>
        <th>Item</th>
        <th>Link</th>
        <th>Need</th>
      </tr>
    </thead>
    <tbody id="key-items-body">
      <tr>
        <td colspan="4" style="text-align: center; color: #888;">Loading key items...</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
const keyItemsSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-TwlT31GEgkXPduyDL73LmU-yBtenwhAyGXJrb6wXF8_biwNA0957p6VpCppg4n3GPIFQAodvInfr/pub?gid=1714966897&single=true&output=csv";

async function loadKeyItems() {
  try {
    const response = await fetch(keyItemsSpreadsheetUrl);
    if (!response.ok) throw new Error("Could not fetch the 'key items' tab");
    
    const csvData = await response.text();
    const rows = csvData.split("\n")
                        .map(row => row.split(","))
                        .filter(row => row.length > 1 && row[0].trim() !== "");
    
    const tbody = document.getElementById("key-items-body");
    tbody.innerHTML = ""; 

    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i];
      const tr = document.createElement("tr");
      
      const tdCheck = document.createElement("td");
      tdCheck.style.textAlign = "center";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      
      const storageKey = `key-items-row-${i}`;
      checkbox.checked = localStorage.getItem(storageKey) === 'true';
      checkbox.addEventListener('change', (e) => localStorage.setItem(storageKey, e.target.checked));
      
      tdCheck.appendChild(checkbox);
      tr.appendChild(tdCheck);
      
      for (let j = 0; j < Math.min(3, rowData.length); j++) {
        const td = document.createElement("td");
        const cellValue = rowData[j].replace(/^"|"$/g, '').trim(); 
        
        // Looks at index 1 (Link column) for the URL transformation
        if (j === 1&& (cellValue.startsWith("http://") || cellValue.startsWith("https://"))) {
          const link = document.createElement("a");
          link.href = cellValue;          
          link.textContent = "link";     
          link.target = "_blank";         
          link.rel = "noopener noreferrer"; 
          td.appendChild(link);
        } else {
          td.textContent = cellValue;
        }
        
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("key-items-body").innerHTML = 
      `<tr><td colspan="4" style="text-align: center; color: red;">Error loading data. Verify your link and tab spelling.</td></tr>`;
  }
}
document.addEventListener("DOMContentLoaded", loadKeyItems);
</script>

### 0.1. [3D Printer](3D_printer.md)
You should get a [Creality Ender-3 S1](https://www.creality.com/products/creality-ender-3-s1-3d-printer) printer (preferable) or a [Creality Ender-3 S1 Pro](https://www.creality.com/products/creality-ender-3-s1-pro-fdm-3d-printer).

![Creality Ender-3 S1 3D Printer](https://cdn.creality.com/product-detial/us/creality-ender-3-s1-3d-printer/b5eadd06dd183bda9c1f47d245de2f59_540x.jpg)

If you are unable to get access to either of these, refer to [choosing your printer](3D_printer.md)

![X-Axis Motor Outside Frame (Recommended)](images/xmotor_outside.jpg)
*Figure 2: Preferred external layout maximizing clear movement area.*

### 0.2. Pipette

Heimdall is designed to use [Precipette™ Pipettes](https://www.4esci.com/Precipette-Pipettes-Single-channel-Adjustable-Volume-Pipette-pd47194942.html?srsltid=AfmBOoqAO3kqhTNZNMEfX73jpDfjbU-w6qV1anIF-a96RKfOx6sGQAOJ).

![Precipette™ Pipettes](images/pipette.png)

It is highly recommended to source this exact model to guarantee compatibility with the 3D-printed mounts and drive gears. If you must use an alternative pipette, ensure it meets the following criteria:

* **Front-Facing Volume Display:** The digital volume adjustment window must face directly forward to remain visible once mounted.
* **Front-Facing Tip Ejection:** The mechanical tip ejection mechanism must trigger from the front to properly interface with the automated tip disposal system.


## 1. Electronics

<div class="bom-wrapper">
  <table id="electronics-table">
    <thead>
      <tr>
        <th style="width: 80px;">Status</th>
        <th>Item</th>
        <th>Link</th>
        <th>Need</th>
      </tr>
    </thead>
    <tbody id="electronics-body">
      <tr>
        <td colspan="4" style="text-align: center; color: #888;">Loading electronics...</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
// Paste your new "Electronics" tab published CSV link here later
const electronicsSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-TwlT31GEgkXPduyDL73LmU-yBtenwhAyGXJrb6wXF8_biwNA0957p6VpCppg4n3GPIFQAodvInfr/pub?gid=488062266&single=true&output=csv";

async function loadElectronics() {
  try {
    const response = await fetch(electronicsSpreadsheetUrl);
    if (!response.ok) throw new Error("Could not fetch the 'electronics' tab");
    
    const csvData = await response.text();
    const rows = csvData.split("\n")
                        .map(row => row.split(","))
                        .filter(row => row.length > 1 && row[0].trim() !== "");
    
    const tbody = document.getElementById("electronics-body");
    tbody.innerHTML = ""; 

    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i];
      const tr = document.createElement("tr");
      
      const tdCheck = document.createElement("td");
      tdCheck.style.textAlign = "center";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      
      // Kept storage key unique to 'electronics' so checkboxes save correctly
      const storageKey = `electronics-row-${i}`;
      checkbox.checked = localStorage.getItem(storageKey) === 'true';
      checkbox.addEventListener('change', (e) => localStorage.setItem(storageKey, e.target.checked));
      
      tdCheck.appendChild(checkbox);
      tr.appendChild(tdCheck);
      
      for (let j = 0; j < Math.min(3, rowData.length); j++) {
        const td = document.createElement("td");
        const cellValue = rowData[j].replace(/^"|"$/g, '').trim(); 
        
        // This targets the second column (index 1) for the custom link replacement
        if (j === 1 && (cellValue.startsWith("http://") || cellValue.startsWith("https://"))) {
          const link = document.createElement("a");
          link.href = cellValue;            
          link.textContent = "link";       
          link.target = "_blank";           
          link.rel = "noopener noreferrer"; 
          td.appendChild(link);
        } else {
          td.textContent = cellValue;
        }
        
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("electronics-body").innerHTML = 
      `<tr><td colspan="4" style="text-align: center; color: red;">Error loading data. Verify your link and tab spelling.</td></tr>`;
  }
}
document.addEventListener("DOMContentLoaded", loadElectronics);
</script>

## 2. [Hardware](hardware.md)

<div class="bom-wrapper">
  <table id="hardware-table">
    <thead>
      <tr>
        <th style="width: 80px;">Status</th>
        <th>Item</th>
        <th>Link</th>
        <th>Need</th>
      </tr>
    </thead>
    <tbody id="hardware-body">
      <tr>
        <td colspan="4" style="text-align: center; color: #888;">Loading hardware...</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
// Paste your new "Hardware" tab published CSV link here later
const hardwareSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-TwlT31GEgkXPduyDL73LmU-yBtenwhAyGXJrb6wXF8_biwNA0957p6VpCppg4n3GPIFQAodvInfr/pub?gid=0&single=true&output=csv";

async function loadHardware() {
  try {
    const response = await fetch(hardwareSpreadsheetUrl);
    if (!response.ok) throw new Error("Could not fetch the 'hardware' tab");
    
    const csvData = await response.text();
    const rows = csvData.split("\n")
                        .map(row => row.split(","))
                        .filter(row => row.length > 1 && row[0].trim() !== "");
    
    const tbody = document.getElementById("hardware-body");
    tbody.innerHTML = ""; 

    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i];
      const tr = document.createElement("tr");
      
      const tdCheck = document.createElement("td");
      tdCheck.style.textAlign = "center";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      
      const storageKey = `hardware-row-${i}`;
      checkbox.checked = localStorage.getItem(storageKey) === 'true';
      checkbox.addEventListener('change', (e) => localStorage.setItem(storageKey, e.target.checked));
      
      tdCheck.appendChild(checkbox);
      tr.appendChild(tdCheck);
      
      for (let j = 0; j < Math.min(3, rowData.length); j++) {
        const td = document.createElement("td");
        const cellValue = rowData[j].replace(/^"|"$/g, '').trim(); 
        
        if (j === 1 && (cellValue.startsWith("http://") || cellValue.startsWith("https://"))) {
          const link = document.createElement("a");
          link.href = cellValue;            
          link.textContent = "link";       
          link.target = "_blank";           
          link.rel = "noopener noreferrer"; 
          td.appendChild(link);
        } else {
          td.textContent = cellValue;
        }
        
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("hardware-body").innerHTML = 
      `<tr><td colspan="4" style="text-align: center; color: red;">Error loading data. Verify your link and tab spelling.</td></tr>`;
  }
}
document.addEventListener("DOMContentLoaded", loadHardware);
</script>

## 3. Tools

<div class="bom-wrapper">
  <table id="tools-table">
    <thead>
      <tr>
        <th style="width: 80px;">Status</th>
        <th>Item</th>
        <th>Link</th>
        <th>Need</th>
      </tr>
    </thead>
    <tbody id="tools-body">
      <tr>
        <td colspan="4" style="text-align: center; color: #888;">Loading tools...</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
// Paste your new "Tools" tab published CSV link here later
const toolsSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-TwlT31GEgkXPduyDL73LmU-yBtenwhAyGXJrb6wXF8_biwNA0957p6VpCppg4n3GPIFQAodvInfr/pub?gid=375458509&single=true&output=csv";

async function loadTools() {
  try {
    const response = await fetch(toolsSpreadsheetUrl);
    if (!response.ok) throw new Error("Could not fetch the 'tools' tab");
    
    const csvData = await response.text();
    const rows = csvData.split("\n")
                        .map(row => row.split(","))
                        .filter(row => row.length > 1 && row[0].trim() !== "");
    
    const tbody = document.getElementById("tools-body");
    tbody.innerHTML = ""; 

    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i];
      const tr = document.createElement("tr");
      
      const tdCheck = document.createElement("td");
      tdCheck.style.textAlign = "center";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      
      // Kept storage key unique to 'tools' so checkboxes save correctly
      const storageKey = `tools-row-${i}`;
      checkbox.checked = localStorage.getItem(storageKey) === 'true';
      checkbox.addEventListener('change', (e) => localStorage.setItem(storageKey, e.target.checked));
      
      tdCheck.appendChild(checkbox);
      tr.appendChild(tdCheck);
      
      for (let j = 0; j < Math.min(3, rowData.length); j++) {
        const td = document.createElement("td");
        const cellValue = rowData[j].replace(/^"|"$/g, '').trim(); 
        
        // Correctly targeting the second column (index 1) for the link mask
        if (j === 1 && (cellValue.startsWith("http://") || cellValue.startsWith("https://"))) {
          const link = document.createElement("a");
          link.href = cellValue;            
          link.textContent = "link";       
          link.target = "_blank";           
          link.rel = "noopener noreferrer"; 
          td.appendChild(link);
        } else {
          td.textContent = cellValue;
        }
        
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("tools-body").innerHTML = 
      `<tr><td colspan="4" style="text-align: center; color: red;">Error loading data. Verify your link and tab spelling.</td></tr>`;
  }
}
document.addEventListener("DOMContentLoaded", loadTools);
</script>