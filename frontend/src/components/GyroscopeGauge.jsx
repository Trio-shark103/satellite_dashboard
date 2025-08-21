import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";

function GyroscopeGauge() {
  const [gx, setGx] = useState(0);
  const [gy, setGy] = useState(0);
  const [gz, setGz] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGx(parseFloat((Math.random() * 2 - 1).toFixed(2))); // simulate -1 to 1
      setGy(parseFloat((Math.random() * 2 - 1).toFixed(2)));
      setGz(parseFloat((Math.random() * 2 - 1).toFixed(2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-slate-900 p-5 rounded-2xl shadow-xl flex flex-col gap-6 items-center">
      <h2 className="text-xl font-semibold text-center mb-2">🧭 Gyroscope</h2>

      <GaugeChart
        id="gauge-gx"
        nrOfLevels={20}
        percent={(gx + 1) / 2}
        formatTextValue={() => `X: ${gx}`}
        arcWidth={0.25}
        colors={["#03a9f4", "#ff9800", "#f44336"]}
        needleColor="#ffffff"
        style={{ width: "100%", height: "160px" }}
      />
      <GaugeChart
        id="gauge-gy"
        nrOfLevels={20}
        percent={(gy + 1) / 2}
        formatTextValue={() => `Y: ${gy}`}
        arcWidth={0.25}
        colors={["#03a9f4", "#ff9800", "#f44336"]}
        needleColor="#ffffff"
        style={{ width: "100%", height: "160px" }}
      />
      <GaugeChart
        id="gauge-gz"
        nrOfLevels={20}
        percent={(gz + 1) / 2}
        formatTextValue={() => `Z: ${gz}`}
        arcWidth={0.25}
        colors={["#03a9f4", "#ff9800", "#f44336"]}
        needleColor="#ffffff"
        style={{ width: "100%", height: "160px" }}
      />
    </div>
  );
}
export default GyroscopeGauge;