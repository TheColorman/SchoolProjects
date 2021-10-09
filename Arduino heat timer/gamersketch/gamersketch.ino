const int workStart = 8;  // Work starting hour
const int workEnd = 16;   // Work end hour
const int heatTime = 6;   // Time to heat house

//const timeDialation = 1000/60/60;
const int timeDialation = 1000;

const int relayPin = 9;
const int buttonPin = 7;

int buttonState = 0;
unsigned long previousMillis = 0;

void setup() {
    pinMode(buttonPin, INPUT);
    pinMode(relayPin, OUTPUT);
    pinMode(LED_BUILTIN, OUTPUT);

    Serial.begin(9600);
    digitalWrite(LED_BUILTIN, HIGH);
}

void loop() {
    buttonState = digitalRead(buttonPin);

    unsigned long currentMillis = millis();

    if ((unsigned long)(currentMillis - previousMillis)/timeDialation >= workStart - heatTime && (unsigned long)(currentMillis - previousMillis)/timeDialation <= workEnd - heatTime) {
        digitalWrite(relayPin, HIGH);
    } else {
        digitalWrite(relayPin, LOW);
    }

    if ((unsigned long)(currentMillis - previousMillis)/timeDialation >= 24000/timeDialation) {
        previousMillis = currentMillis;        
    }

    /*
    digitalWrite(relayPin, HIGH);
    delay(1000);
    digitalWrite(relayPin, LOW);
    delay(1000);
    */
}
