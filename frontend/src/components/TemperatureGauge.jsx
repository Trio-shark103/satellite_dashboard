import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import { motion, AnimatePresence } from "framer-motion";

function TemperatureGauge() {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const fakeTemp = 20 + Math.random() * 15;
      setTemp(fakeTemp.toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-slate-900 p-5 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-center">🌡️ Temperature</h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={temp}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <GaugeChart
            id="temperature-gauge"
            nrOfLevels={30}
            percent={temp / 100}
            formatTextValue={() => `${temp} °C`}
            colors={["#00ffcc", "#ff8800", "#ff0000"]}
            arcWidth={0.3}
            needleColor="#ffffff"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export default TemperatureGauge;
