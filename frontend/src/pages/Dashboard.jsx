import React from "react";
import TemperatureGauge from "../components/TemperatureGauge";
import TemperatureBarChart from "../components/TemperatureBarChart";
import AtmosphericGauge from "../components/AtmosphericGauge";
import OrientationChart from "../components/OrientationChart";
import AccelerationChart from "../components/AccelerationChart";
import AccelerometerGauge from "../components/AccelerometerGaugeX";
import GyroscopeGauge from "../components/GyroscopeGauge";
import Footer from "../components/Footer";
import AltitudeBarChart from "../components/AltitudeBarChart";

function Dashboard({ isPaused }) {
  return (
    <div className="flex flex-wrap gap-6 px-2">
      <div className="w-full md:w-[48%]"><TemperatureGauge isPaused={isPaused} /></div>
      <div className="w-full md:w-[48%]"><AtmosphericGauge isPaused={isPaused} /></div>
      <div className="w-full md:w-[48%]"><OrientationChart isPaused={isPaused} /></div>
      <div className="w-full md:w-[48%]"><AccelerationChart isPaused={isPaused} /></div>
      <div className="w-full md:w-[48%]"><AccelerometerGauge isPaused={isPaused} /></div>
      <div className="w-full md:w-[48%]"><GyroscopeGauge isPaused={isPaused} /></div>
      <div className="w-full md:w-[48%]"><AltitudeBarChart isPaused={isPaused} /></div>
      <div className="w-full md:w-[48%]"><TemperatureBarChart isPaused={isPaused} /></div>
      <Footer />
    </div>
  );
}

export default  Dashboard;