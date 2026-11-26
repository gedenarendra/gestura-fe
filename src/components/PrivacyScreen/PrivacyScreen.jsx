import React, { useState } from "react";

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
    <main className="relative w-screen h-dvh overflow-hidden bg-[#f8f9f6]" aria-label="Privacy Settings">
      <div className="absolute top-0 left-0 w-full h-[85px] z-5 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full block" viewBox="0 0 1000 100" preserveAspectRatio="none">
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

      <div className="relative z-2 w-full max-w-[480px] h-full mx-auto box-border pt-22 px-5 pb-[5.2rem] overflow-y-auto no-scrollbar max-h-short:pt-[4.8rem]">
        <header className="flex items-center gap-[0.7rem] mb-[1.15rem]">
          <button
            type="button"
            className="border-0 bg-transparent text-[#142520] text-[2.15rem] leading-none py-0 px-1 cursor-pointer"
            onClick={onBack}
            aria-label="Kembali ke menu utama"
          >
            ←
          </button>
          <h1 className="m-0 font-georgia text-[clamp(1.55rem,5vw,1.95rem)] font-medium text-[#142520]">
            Privacy
          </h1>
        </header>

        <section className="min-h-[calc(100%-62px)] flex flex-col">
          <article className="w-full min-h-[290px] box-border border border-[#1f746f]/8 rounded-[20px] bg-white py-[1.65rem] px-[1.55rem] shadow-[0_8px_22px_rgba(18,63,60,0.08)] max-h-short:py-[1.1rem] max-h-short:px-5">
            <h2 className="mt-0 mx-0 mb-[1.45rem] text-[#1b4845] text-[clamp(1.05rem,3vw,1.18rem)] font-bold">
              Privasi & sensor
            </h2>

            <div className="flex flex-col gap-[1.35rem] max-h-short:gap-3">
              {PRIVACY_OPTIONS.map((option) => {
                const isActive = preferences[option.id];
                return (
                  <div className="min-h-[58px] flex items-center justify-between gap-5" key={option.id}>
                    <div className="min-w-0 flex flex-col gap-[0.28rem]">
                      <strong className="text-[#1b4845] text-[clamp(0.98rem,3vw,1.08rem)] leading-[1.25] font-bold">
                        {option.title}
                      </strong>
                      <span className="text-[#71827c] text-[clamp(0.82rem,2.5vw,0.92rem)] leading-[1.35]">
                        {option.description}
                      </span>
                    </div>
                    <button
                      type="button"
                      className={`relative w-[58px] h-[36px] shrink-0 grow-0 basis-[58px] border-0 rounded-full p-0 cursor-pointer transition-colors duration-250 ease-in-out motion-reduce:transition-none ${
                        isActive ? "bg-[#1f746f]" : "bg-[#dfe4e2]"
                      }`}
                      onClick={() => togglePreference(option.id)}
                      role="switch"
                      aria-checked={isActive}
                      aria-label={option.title}
                    >
                      <span
                        className={`absolute top-[5px] w-[26px] h-[26px] rounded-full bg-white shadow-[0_2px_7px_rgba(18,63,60,0.16)] transition-[left] duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                          isActive ? "left-[27px]" : "left-[5px]"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </article>

          <div className="flex flex-col gap-[0.8rem] mt-auto pt-[1.65rem]">
            <button
              type="button"
              className={`w-full min-h-[62px] rounded-xl text-[clamp(0.96rem,3vw,1.05rem)] font-bold cursor-pointer border-0 text-white shadow-[0_5px_14px_rgba(31,116,111,0.18)] flex items-center justify-center gap-[0.55rem] ${
                saved ? "bg-[#175f5b]" : "bg-[#1f746f]"
              }`}
              onClick={handleSave}
            >
              <span className="text-[1.15rem]" aria-hidden="true">✓</span>
              {saved ? "Preferensi tersimpan" : "Simpan preferensi"}
            </button>
            <button
              type="button"
              className="w-full min-h-[62px] rounded-xl text-[clamp(0.96rem,3vw,1.05rem)] font-bold cursor-pointer border border-[#dfe6e3] bg-white text-[#1f746f]"
              onClick={onBack}
            >
              Kembali ke menu utama
            </button>
          </div>
        </section>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[85px] z-5 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full block" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M 0 12 Q 500 42 1000 12 L 1000 100 L 0 100 Z" fill="#17544f" />
        </svg>
      </div>
    </main>
  );
}

export default PrivacyScreen;
