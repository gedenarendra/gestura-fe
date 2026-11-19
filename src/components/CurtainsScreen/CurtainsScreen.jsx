import React, { useState } from "react";
import "./CurtainsScreen.css";

const CURTAIN_OPTIONS = [
  { value: 0, label: "Tertutup", shortLabel: "0%" },
  { value: 50, label: "Setengah", shortLabel: "50%" },
  { value: 100, label: "Terbuka", shortLabel: "100%" },
];

export function CurtainsScreen({ onBack }) {
  const [position, setPosition] = useState(50);

  const selectedOption = CURTAIN_OPTIONS.find((option) => option.value === position);

  return (
    <main className="curtain-screen" aria-label="Curtain Control">
      <div className="curtain-top-bar" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curtainHeaderTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#174f4c" />
              <stop offset="60%" stopColor="#1a615d" />
              <stop offset="100%" stopColor="#1f746f" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 1000 0 L 1000 88 Q 500 58 0 88 Z" fill="url(#curtainHeaderTeal)" />
        </svg>
      </div>

      <div className="curtain-container">
        <header className="curtain-header">
          <button
            type="button"
            className="curtain-back"
            onClick={onBack}
            aria-label="Kembali ke menu utama"
          >
            ←
          </button>
          <h1>Curtain</h1>
        </header>

        <section className="curtain-panel">
          <h2>Curtain Station</h2>

          <div className={`curtain-preview position-${position}`}>
            <div className="curtain-window" aria-hidden="true">
              <div className="curtain-rod" />
              <div className="curtain-left" />
              <div className="curtain-right" />
              <div className="curtain-window-light" />
            </div>
            <strong aria-live="polite">
              {position === 100 ? "Open" : position === 50 ? "Setengah" : "Close"}
            </strong>
          </div>

          <div className="curtain-options" role="radiogroup" aria-label="Posisi tirai">
            {CURTAIN_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={position === option.value}
                className={position === option.value ? "active" : ""}
                onClick={() => setPosition(option.value)}
              >
                <strong>{option.shortLabel}</strong>
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          <button type="button" className="curtain-main-action" onClick={onBack}>
            ⌂ Kembali ke menu utama
          </button>
        </section>
      </div>

      <div className="curtain-bottom-bar" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M 0 12 Q 500 42 1000 12 L 1000 100 L 0 100 Z" fill="#17544f" />
        </svg>
      </div>
    </main>
  );
}

export default CurtainsScreen;
