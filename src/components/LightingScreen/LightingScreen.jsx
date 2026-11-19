import React, { useState } from "react";
import "./LightingScreen.css";

export function LightingScreen({ onBack }) {
  const [isOn, setIsOn] = useState(false);

  return (
    <main className="lighting-screen" aria-label="Lighting Control">
      <div className="lighting-top-bar" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lightingHeaderTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#174f4c" />
              <stop offset="60%" stopColor="#1a615d" />
              <stop offset="100%" stopColor="#1f746f" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 1000 0 L 1000 88 Q 500 58 0 88 Z" fill="url(#lightingHeaderTeal)" />
        </svg>
      </div>

      <div className="lighting-container">
        <header className="lighting-header">
          <button
            type="button"
            className="lighting-back"
            onClick={onBack}
            aria-label="Kembali ke menu utama"
          >
            ←
          </button>
          <h1>Lighting</h1>
        </header>

        <section className="lighting-panel">
          <h2>Lamp Station</h2>

          <button
            type="button"
            className={`lighting-bulb-card ${isOn ? "active" : ""}`}
            onClick={() => setIsOn((current) => !current)}
            aria-label={isOn ? "Matikan lampu" : "Nyalakan lampu"}
            aria-pressed={isOn}
          >
            <svg
              className="lighting-bulb-icon"
              viewBox="0 0 180 180"
              role="img"
              aria-label={isOn ? "Lampu menyala" : "Lampu mati"}
            >
              <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M90 118c-1-23-27-29-27-54a27 27 0 0 1 54 0c0 25-26 31-27 54Z" />
                <path d="M72 118h36M75 129h30M80 140h20" />
                <path d="M42 38l11 11M138 38l-11 11M28 80h17M152 80h-17M48 122l13-9M132 122l-13-9M90 24v16" />
              </g>
              <path d="M78 143c3 11 21 11 24 0Z" fill="currentColor" />
            </svg>
          </button>

          <button
            type="button"
            className={`lighting-toggle ${isOn ? "active" : ""}`}
            onClick={() => setIsOn((current) => !current)}
            aria-pressed={isOn}
            aria-label={isOn ? "Matikan lampu" : "Nyalakan lampu"}
          >
            <span className="lighting-toggle-track" aria-hidden="true">
              <span className="lighting-toggle-thumb" />
            </span>
          </button>

          <button
            type="button"
            className="lighting-main-action"
            onClick={onBack}
          >
            ⌂ Kembali ke menu utama
          </button>
        </section>
      </div>

      <div className="lighting-bottom-bar" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M 0 12 Q 500 42 1000 12 L 1000 100 L 0 100 Z" fill="#17544f" />
        </svg>
      </div>
    </main>
  );
}

export default LightingScreen;
