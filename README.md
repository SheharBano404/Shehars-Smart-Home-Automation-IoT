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
<div align="center">

### Web Dashboard (Normal vs. Gas Alert State)
<img width="600" style="border: 2px solid #ddd; border-radius: 8px; margin: 15px;" alt="image" src="https://github.com/user-attachments/assets/a5f91365-b72e-4cb7-9a79-8cb15bec40e3" /> 
<img width="600" style="border: 2px solid #ddd; border-radius: 8px; margin: 15px;" alt="image" src="https://github.com/user-attachments/assets/d0e2288f-84d6-4c27-8f71-a8b257475030" />

### Circuit Diagram
<img width="600" style="border: 2px solid #ddd; border-radius: 8px; margin: 15px;" alt="image" src="https://github.com/user-attachments/assets/97acb3e5-34cc-41dc-a073-cd84043664b6" />

### Hardware Prototype
<img width="600" style="border: 2px solid #ddd; border-radius: 8px; margin: 15px;" alt="image" src="https://github.com/user-attachments/assets/9d7d2b51-e4b1-48d9-9e0e-a97c308b4640" />

### ThingSpeak Analytics Graphs
<img width="600" style="border: 2px solid #ddd; border-radius: 8px; margin: 15px;" alt="image" src="https://github.com/user-attachments/assets/d492acd0-622e-451d-b93f-007348aaa797" />
<img width="600" style="border: 2px solid #ddd; border-radius: 8px; margin: 15px;" alt="image" src="https://github.com/user-attachments/assets/cc0aa668-99b5-42bc-83c7-c58dca345086" />

</div>

---

## Hardware Setup & Pin Configuration
| Component           | ESP32 GPIO Pin | Purpose                  |
| :---                | :---           | :---                     |
| **PIR Sensor**      | GPIO 13        | Motion detection         |
| **MQ2 Gas Sensor**  | GPIO 34 (ADC)  | Gas leakage detection    |
| **DHT11 Sensor**    | GPIO 4         | Temp/Humidity monitoring |
| **Relay 1 (Light)** | GPIO 26        | Appliance Control        |
| **Relay 2 (Fan)**   | GPIO 27        | Appliance Control        |

*Note: Use an external 5V/2A power supply for relay modules to ensure stable operation.*

## Live Simulation
View the working project here: [Wokwi Simulation](https://wokwi.com/projects/463638858277415937)

## Future Roadmap
To further enhance the capabilities of this smart home system, the following upgrades are planned:

* **AI Integration:** Implementing predictive automation and pattern recognition using **TensorFlow Lite**.
* **Voice Control:** Enabling hands-free accessibility via **MQTT-based** Alexa/Google Assistant integration.
* **Biometrics:** Implementing advanced security through **Face Recognition** using ESP32-CAM and OpenCV.
* **Energy Management:** Real-time monitoring of **Solar Panel** health and intelligent **Load Shedding Management** during power outages.

## Author & Certification
* **Author:** Shehar Bano
* **License:** [MIT License](LICENSE)
