#include <WiFi.h>
#include <FirebaseESP32.h>
#include <DHT.h>
#include "ThingSpeak.h"

// 1. Network & Cloud Credentials
// Replace the following strings with your own credentials
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"
#define FIREBASE_HOST "YOUR_FIREBASE_PROJECT_ID.firebaseio.com" 
#define FIREBASE_AUTH "YOUR_FIREBASE_DATABASE_SECRET"
#define TS_CHANNEL_ID 000000 // Replace with your Channel ID
#define TS_API_KEY "YOUR_THINGSPEAK_WRITE_API_KEY"

// 2. Pin Definitions
#define DHTPIN 15
#define DHTTYPE DHT22
#define PIR_PIN 13
#define GAS_PIN 34
#define LIGHT_LED 2
#define FAN_LED 4
#define BUZZER 12

DHT dht(DHTPIN, DHTTYPE);
FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;
WiFiClient client;

unsigned long lastTime = 0;
unsigned long timerDelay = 20000; // ThingSpeak update interval (20 secs)

void setup() {
  Serial.begin(115200);
  
  pinMode(PIR_PIN, INPUT);
  pinMode(GAS_PIN, INPUT);
  pinMode(LIGHT_LED, OUTPUT);
  pinMode(FAN_LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  dht.begin();

  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected!");

  // Initialize Firebase
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Initialize ThingSpeak
  ThingSpeak.begin(client);
}

void loop() {
  // A. Read Sensor Values
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int motion = digitalRead(PIR_PIN);
  int gasValue = analogRead(GAS_PIN);

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // B. Send Real-time Data to Firebase
  Firebase.setFloat(firebaseData, "/Home/Temperature", t);
  Firebase.setFloat(firebaseData, "/Home/Humidity", h);
  Firebase.setInt(firebaseData, "/Home/Motion", motion);
  Firebase.setInt(firebaseData, "/Home/GasLevel", gasValue);

  // C. Remote Control Logic (Corrected access using firebaseData object)
  if (Firebase.getInt(firebaseData, "/Home/Control/Light")) {
    digitalWrite(LIGHT_LED, firebaseData.intData() == 1 ? HIGH : LOW);
  }
  
  if (Firebase.getInt(firebaseData, "/Home/Control/Fan")) {
    digitalWrite(FAN_LED, firebaseData.intData() == 1 ? HIGH : LOW);
  }

  // D. Automation Scenarios
  if (gasValue > 2000) { // Safety Scenario
    digitalWrite(BUZZER, HIGH);
    Firebase.setString(firebaseData, "/Home/Alert", "Gas Leak Detected!");
  } else {
    digitalWrite(BUZZER, LOW);
    Firebase.setString(firebaseData, "/Home/Alert", "Normal");
  }

  // E. Send Periodic Analytics to ThingSpeak
  if ((millis() - lastTime) > timerDelay) {
    ThingSpeak.setField(1, t);
    ThingSpeak.setField(2, h);
    ThingSpeak.setField(3, motion);
    
    int x = ThingSpeak.writeFields(TS_CHANNEL_ID, TS_API_KEY);
    if(x == 200){
      Serial.println("ThingSpeak Update Successful.");
    }
    lastTime = millis();
  }

  // Serial Monitor Output
  Serial.print("Temp: "); Serial.print(t);
  Serial.print("°C | Gas: "); Serial.println(gasValue);
  
  delay(2000); 
}