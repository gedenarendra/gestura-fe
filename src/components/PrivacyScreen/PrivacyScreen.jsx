import React, { useState } from "react";
import "./PrivacyScreen.css";

const PRIVACY_OPTIONS = [
  {
    id: "microphone",
    title: "Mikrofon sesi",
    description: "Izin untuk mode suara · tidak disimpan",
  },
  {
    id: "camera",
    title: "Kamera gesture",
    description: "Mati · tidak ada pengenalan wajah",
  },
  {
    id: "do-not-disturb",
    title: "Jangan ganggu",
    description: "Minta staf tidak mengetuk kamar",
  },
];

export function PrivacyScreen({ onBack }) {
  const [preferences, setPreferences] = useState({
    microphone: true,
    camera: false,
    "do-not-disturb": false,
  });
  const [saved, setSaved] = useState(false);

  const togglePreference = (id) => {
    setSaved(false);
    setPreferences((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const handleSave = () => {
    setSaved(true);
    window.clearTimeout(window.__privacySaveTimeout);
    window.__privacySaveTimeout = window.setTimeout(() => setSaved(false), 2400);
  };

  return (
    <main className="privacy-screen" aria-label="Privacy Settings">
      <div className="privacy-top-bar" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="privacyHeaderTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#174f4c" />
              <stop offset="60%" stopColor="#1a615d" />
              <stop offset="100%" stopColor="#1f746f" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 1000 0 L 1000 88 Q 500 58 0 88 Z" fill="url(#privacyHeaderTeal)" />
        </svg>
      </div>

      <div className="privacy-container">
        <header className="privacy-header">
          <button
            type="button"
            className="privacy-back"
            onClick={onBack}
            aria-label="Kembali ke menu utama"
          >
            ←
          </button>
          <h1>Privacy</h1>
        </header>

        <section className="privacy-panel">
          <article className="privacy-card">
            <h2>Privasi & sensor</h2>

            <div className="privacy-options">
              {PRIVACY_OPTIONS.map((option) => (
                <div className="privacy-option" key={option.id}>
                  <div className="privacy-option-text">
                    <strong>{option.title}</strong>
                    <span>{option.description}</span>
                  </div>
                  <button
                    type="button"
                    className={`privacy-switch ${preferences[option.id] ? "active" : ""}`}
                    onClick={() => togglePreference(option.id)}
                    role="switch"
                    aria-checked={preferences[option.id]}
                    aria-label={option.title}
                  >
                    <span className="privacy-switch-thumb" />
                  </button>
                </div>
              ))}
            </div>
          </article>

          <div className="privacy-actions">
            <button type="button" className={`privacy-save ${saved ? "saved" : ""}`} onClick={handleSave}>
              <span aria-hidden="true">✓</span>
              {saved ? "Preferensi tersimpan" : "Simpan preferensi"}
            </button>
            <button type="button" className="privacy-main-action" onClick={onBack}>
              Kembali ke menu utama
            </button>
          </div>
        </section>
      </div>

      <div className="privacy-bottom-bar" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M 0 12 Q 500 42 1000 12 L 1000 100 L 0 100 Z" fill="#17544f" />
        </svg>
      </div>
    </main>
  );
}

export default PrivacyScreen;
