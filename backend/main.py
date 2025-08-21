from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import serial
import threading

app = FastAPI()

# Allow requests from frontend
origins = ["http://localhost:3001"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serial setup
try:
    ser = serial.Serial('/dev/cu.usbmodem1413201', 9600, timeout=1)
except Exception as e:
    ser = None
    print("Serial error:", e)

# In-memory storage
telemetry_history = []  # List of dicts
max_history_length = 500

# Background thread to read serial data continuously
def read_serial_loop():
    if not ser:
        return
    while True:
        try:
            line = ser.readline().decode().strip()
            if not line:
                continue
            if "id:" in line:  # Expected formatted string
                parsed = parse_telemetry_line(line)
                if parsed:
                    telemetry_history.append(parsed)
                    # Keep history short
                    if len(telemetry_history) > max_history_length:
                        telemetry_history.pop(0)
        except Exception as e:
            print("Serial read error:", e)

def parse_telemetry_line(line):
    try:
        parts = line.split(",")
        data = {}
        for part in parts:
            if ":" in part:
                key, value = part.split(":")
                data[key.strip()] = value.strip()

        return {
            "id": int(data.get("id", 0)),
            "timestamp": int(data.get("timestamp", 0)),
            "temperature": float(data.get("temp", 0)),
            "pressure": float(data.get("pressure", 0)),
            "altitude": float(data.get("altitude", 0)),
            "speed": float(data.get("speed", 0)),
            "accel": {
                "x": float(data.get("ax", 0)),
                "y": float(data.get("ay", 0)),
                "z": float(data.get("az", 0)),
            },
            "gyro": {
                "x": float(data.get("gx", 0)),
                "y": float(data.get("gy", 0)),
                "z": float(data.get("gz", 0)),
            },
        }
    except Exception as e:
        print("Parsing error:", e)
        return None

# Start background serial reading
if ser:
    threading.Thread(target=read_serial_loop, daemon=True).start()

# API Endpoints

@app.get("/telemetry")
def get_latest_telemetry():
    if telemetry_history:
        return telemetry_history[-1]  # Return most recent
    return {"error": "No telemetry data available yet"}

@app.get("/telemetry/history")
def get_all_telemetry():
    return telemetry_history
