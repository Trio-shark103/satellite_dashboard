import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";

function AccelerometerGauge() {
  const [ax, setAx] = useState(0);
  const [ay, setAy] = useState(0);
  const [az, setAz] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAx(parseFloat((Math.random() * 2 - 1).toFixed(2))); // range: -1 to 1
      setAy(parseFloat((Math.random() * 2 - 1).toFixed(2)));
      setAz(parseFloat((Math.random() * 2 - 1).toFixed(2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-slate-900 p-5 rounded-2xl shadow-xl flex flex-col gap-6 items-center">
      <h2 className="text-xl font-semibold text-center mb-2">📡 Accelerometer</h2>

      <GaugeChart
        id="gauge-ax"
        nrOfLevels={20}
        percent={(ax + 1) / 2}
        formatTextValue={() => `X: ${ax}`}
        arcWidth={0.25}
        colors={["#00bcd4", "#ffc107", "#ff5722"]}
        needleColor="#ffffff"
        style={{ width: "100%", height: "160px" }}
      />
      <GaugeChart
        id="gauge-ay"
        nrOfLevels={20}
        percent={(ay + 1) / 2}
        formatTextValue={() => `Y: ${ay}`}
        arcWidth={0.25}
        colors={["#00bcd4", "#ffc107", "#ff5722"]}
        needleColor="#ffffff"
        style={{ width: "100%", height: "160px" }}
      />
      <GaugeChart
        id="gauge-az"
        nrOfLevels={20}
        percent={(az + 1) / 2}
        formatTextValue={() => `Z: ${az}`}
        arcWidth={0.25}
        colors={["#00bcd4", "#ffc107", "#ff5722"]}
        needleColor="#ffffff"
        style={{ width: "100%", height: "160px" }}
      /> 
    </div>
  );
}
export default AccelerometerGauge;