# Smart Home Automation System (IoT)

A complete IoT-based Smart Home Automation solution that enables remote control of home appliances and real-time sensor monitoring.

## Project Overview
This system utilizes the **ESP32** microcontroller to bridge the gap between physical home appliances and digital cloud platforms. It provides a seamless way to monitor environmental data and control devices from anywhere in the world using a responsive web browser interface.

## Tech Stack
* **Microcontroller:** ESP32 DevKit V1
* **Cloud Backend:** Firebase Realtime Database
* **Data Analytics:** ThingSpeak
* **Frontend:** HTML, CSS, JavaScript (Responsive Web Dashboard)
* **Simulation Platform:** Wokwi

---

## Project Visuals
### Web Dashboard (Normal vs. Gas Alert State)
<div align="center">

| Normal State | Gas Alert State |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/a5f91365-b72e-4cb7-9a79-8cb15bec40e3" width="900" height="500"> | <img src="https://github.com/user-attachments/assets/d0e2288f-84d6-4c27-8f71-a8b257475030" width="900" height="500"> |

</div>

### Circuit & Hardware
<div align="center">

| Circuit Diagram | Hardware Prototype |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/97acb3e5-34cc-41dc-a073-cd84043664b6" width="700"> | <img src="https://github.com/user-attachments/assets/9d7d2b51-e4b1-48d9-9e0e-a97c308b4640" width="700"> |

</div>

### Graphs
<div align="center">

| ThingSpeak Analytics Graphs |
| :---: |
| <img src="https://github.com/user-attachments/assets/d492acd0-622e-451d-b93f-007348aaa797" width="1000"> <br> <img src="https://github.com/user-attachments/assets/cc0aa668-99b5-42bc-83c7-c58dca345086" width="1000"> |

</div>
</div>

---

## Live Simulation
View the working project here: [Wokwi Simulation](https://wokwi.com/projects/463638858277415937)

## Hardware Setup & Pin Configuration
<div align="center">
  
| Component           | ESP32 GPIO Pin | Purpose                  |
| :---                | :---           | :---                     |
| **PIR Sensor**      | GPIO 13        | Motion detection         |
| **MQ2 Gas Sensor**  | GPIO 34 (ADC)  | Gas leakage detection    |
| **DHT11 Sensor**    | GPIO 4         | Temp/Humidity monitoring |
| **Relay 1 (Light)** | GPIO 26        | Appliance Control        |
| **Relay 2 (Fan)**   | GPIO 27        | Appliance Control        |

</div>

*Note: Use an external 5V/2A power supply for relay modules to ensure stable operation.*

## Project Setup & Configuration
Follow these steps to set up the Smart Home Automation system:

### 1. Wokwi Simulation
* **Create Account:** Sign up at [Wokwi](https://wokwi.com/).
* **Load Project:** Open the provided [Wokwi Simulation link](https://wokwi.com/projects/463638858277415937).
* **Update Credentials:** In the `main.ino` file, update your Wi-Fi `SSID` and `Password` to match your local network.
* **Run:** Click the "Start" button to initialize the simulation.

### 2. Firebase Realtime Database
* **Project Creation:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
* **Database Setup:** Navigate to "Realtime Database" and click "Create Database".
* **Configure Rules:** Set the database rules for `read` and `write` to `true` to allow data flow.
* **Integration:** Copy your Firebase `API Key` and `Database URL` from project settings. Paste these credentials into your `main.ino` (for ESP32) and `script.js` (for Web Dashboard).

### 3. ThingSpeak Analytics
* **Account Setup:** Sign up at [ThingSpeak](https://thingspeak.com/).
* **Channel Configuration:** Create a "New Channel". Enable "Field 1" for Temperature, "Field 2" for Humidity, "Field 3" for Motion Detection, and "Field 4" for LED/FAN.
* **API Key:** Go to the "API Keys" tab in your channel, copy the **Write API Key**, and update it in your ESP32 code (`main.ino`).

### 4. Web Dashboard
* **File Configuration:** Open the `/web` folder and edit `script.js`.
* **Update Config:** Replace the placeholder Firebase configuration with the credentials obtained from your Firebase project.
* **Execution:** Open `index.html` in any modern web browser to view the real-time sensor monitoring dashboard.

---
*Note: Ensure your ESP32 has a stable internet connection and that all GPIO pins match the hardware configuration provided in the table above.*
---

## Future Roadmap
To further enhance the capabilities of this smart home system, the following upgrades are planned:

* **AI Integration:** Implementing predictive automation and pattern recognition using **TensorFlow Lite**.
* **Voice Control:** Enabling hands-free accessibility via **MQTT-based** Alexa/Google Assistant integration.
* **Biometrics:** Implementing advanced security through **Face Recognition** using ESP32-CAM and OpenCV.
* **Energy Management:** Real-time monitoring of **Solar Panel** health and intelligent **Load Shedding Management** during power outages.

## Author & Certification
* **Author:** Shehar Bano
* **License:** [MIT License](LICENSE)
