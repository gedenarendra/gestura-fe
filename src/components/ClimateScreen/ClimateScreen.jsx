import React, { useState } from "react";
import "./ClimateScreen.css";

const MODES = [
  { id: "automatic", label: "Otomatis" },
  { id: "cool", label: "Dingin" },
  { id: "fan", label: "Kipas" },
];

export function ClimateScreen({ onBack }) {
  const [temperature, setTemperature] = useState(24);
  const [mode, setMode] = useState("automatic");

  const decreaseTemperature = () => {
    setTemperature((current) => Math.max(16, current - 1));
  };

  const increaseTemperature = () => {
    setTemperature((current) => Math.min(30, current + 1));
  };

  return (
    <main className="climate-screen" aria-label="Climate Control">
      <div className="climate-top-bar" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="climateHeaderTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#174f4c" />
              <stop offset="60%" stopColor="#1a615d" />
              <stop offset="100%" stopColor="#1f746f" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 1000 0 L 1000 88 Q 500 58 0 88 Z" fill="url(#climateHeaderTeal)" />
        </svg>
        <div className="climate-top-content">GESTURA</div>
      </div>

      <div className="climate-container">
        <header className="climate-header">
          <button type="button" className="climate-back" onClick={onBack} aria-label="Kembali ke menu utama">←</button>
          <h1>Climate</h1>
        </header>

        <section className="climate-panel">
          <h2>Air Conditioner Station</h2>

          <article className="climate-control-card">
            <div className="climate-card-top">
              <span className="climate-status-dot">AC menyala · contoh</span>
              <span className="climate-room-temp" aria-live="polite">Suhu ruang {temperature}°C*</span>
            </div>

            <div className="climate-dial-wrap">
              <button
                type="button"
                className="climate-step climate-step-minus"
                onClick={decreaseTemperature}
                disabled={temperature <= 16}
                aria-label="Kurangi suhu"
              >
                −
              </button>

              <div
                className="climate-dial"
                style={{ "--temperature-progress": `${((temperature - 16) / 14) * 100}%` }}
              >
                <div className="climate-dial-inner">
                  <span className="climate-snowflake" aria-hidden="true">❄</span>
                  <strong>{temperature}°</strong>
                  <small>Suhu yang dipilih</small>
                </div>
              </div>

              <button
                type="button"
                className="climate-step climate-step-plus"
                onClick={increaseTemperature}
                disabled={temperature >= 30}
                aria-label="Tambah suhu"
              >
                +
              </button>
            </div>

            <div className="climate-modes" role="group" aria-label="Mode AC">
              {MODES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={mode === item.id ? "active" : ""}
                  onClick={() => setMode(item.id)}
                  aria-pressed={mode === item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </article>

          <button type="button" className="climate-main-action" onClick={onBack}>⌂ Kembali ke menu utama</button>
        </section>
      </div>

      <div className="climate-bottom-bar" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M 0 12 Q 500 42 1000 12 L 1000 100 L 0 100 Z" fill="#17544f" />
        </svg>
      </div>
    </main>
  );
}

export default ClimateScreen;
