import React, { useState } from "react";

const CURTAIN_OPTIONS = [
  { value: 0, label: "Tertutup", shortLabel: "0%" },
  { value: 50, label: "Setengah", shortLabel: "50%" },
  { value: 100, label: "Terbuka", shortLabel: "100%" },
];

export function CurtainsScreen({ onBack }) {
  const [position, setPosition] = useState(50);

  return (
    <main className="relative w-screen h-dvh overflow-hidden bg-[#f8f9f6]" aria-label="Curtain Control">
      <div className="absolute top-0 left-0 w-full h-[85px] z-[5] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full block" viewBox="0 0 1000 100" preserveAspectRatio="none">
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

      <div className="relative z-[2] w-full max-w-[480px] h-full mx-auto box-border pt-[5.5rem] px-[1.25rem] pb-[5.2rem] overflow-y-auto no-scrollbar max-h-short:pt-[4.8rem]">
        <header className="flex items-center gap-[0.7rem] mb-[1.15rem]">
          <button
            type="button"
            className="border-0 bg-transparent text-[#142520] text-[2.15rem] leading-none py-0 px-[0.25rem] cursor-pointer"
            onClick={onBack}
            aria-label="Kembali ke menu utama"
          >
            ←
          </button>
          <h1 className="m-0 font-georgia text-[clamp(1.55rem,5vw,1.95rem)] font-medium text-[#142520]">
            Curtain
          </h1>
        </header>

        <section className="min-h-[calc(100%-62px)] flex flex-col items-center">
          <h2 className="mt-[0.85rem] mx-0 mb-[2.15rem] font-georgia text-[clamp(1.25rem,4vw,1.5rem)] font-medium text-[#142520] text-center max-h-short:mt-[0.35rem] max-h-short:mb-[1.25rem]">
            Curtain Station
          </h2>

          <div
            className={`curtain-preview position-${position} w-full min-h-[320px] border border-[rgba(31,116,111,0.07)] rounded-[18px] bg-white shadow-[0_7px_18px_rgba(18,63,60,0.07)] flex flex-col items-center justify-center box-border transition-[background] duration-[250ms] ease-in-out max-w-390:min-h-[290px] max-h-short:min-h-[280px]`}
          >
            <div
              className="relative w-[260px] h-[230px] overflow-hidden border-[3px] border-[#171717] border-b-0 bg-[#edf3f1] box-border max-w-390:w-[220px] max-w-390:h-[205px] max-h-short:w-[220px] max-h-short:h-[190px]"
              aria-hidden="true"
            >
              <div className="absolute z-[4] top-0 left-[-3px] w-[calc(100%+6px)] h-[14px] bg-[#171717]" />
              <div className="curtain-drape curtain-left absolute z-[3] top-[14px] bottom-[-20px] left-0 w-1/2 motion-reduce:transition-none" />
              <div className="curtain-drape curtain-right absolute z-[3] top-[14px] bottom-[-20px] right-0 w-1/2 -scale-x-100 motion-reduce:transition-none" />
              <div className="curtain-window-light absolute inset-[44px_28px_0] bg-[linear-gradient(135deg,#f8fbf9_0%,#dbe9e5_100%)] opacity-95 transition-[opacity,transform] duration-[280ms] ease-in-out motion-reduce:transition-none" />
            </div>
            <strong
              className="mt-[0.55rem] text-[#142520] font-georgia text-[1.65rem] font-medium"
              aria-live="polite"
            >
              {position === 100 ? "Open" : position === 50 ? "Setengah" : "Close"}
            </strong>
          </div>

          <div className="w-full grid grid-cols-3 gap-[0.55rem] mt-[1.75rem] max-h-short:mt-[1.15rem]" role="radiogroup" aria-label="Posisi tirai">
            {CURTAIN_OPTIONS.map((option) => {
              const isActive = position === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  className={`min-h-[82px] rounded-[12px] bg-white flex flex-col items-center justify-center gap-[0.25rem] cursor-pointer shadow-[0_2px_7px_rgba(18,63,60,0.03)] transition-[border,background,color,transform] duration-[180ms] ease-in-out max-w-390:min-h-[76px] motion-reduce:transition-none ${
                    isActive
                      ? "border-[1.5px] border-[#65b2a9] text-[#142520] -translate-y-[1px]"
                      : "border border-[#edf1ef] text-[#71827c]"
                  }`}
                  onClick={() => setPosition(option.value)}
                >
                  <strong className="text-[1.35rem] text-[#1f746f] font-bold">{option.shortLabel}</strong>
                  <span className="text-[0.82rem]">{option.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="w-full min-h-[58px] mt-auto border-0 rounded-[12px] bg-[#1f746f] text-white text-[1rem] font-bold cursor-pointer shadow-[0_5px_14px_rgba(31,116,111,0.18)]"
            onClick={onBack}
          >
            ⌂ Kembali ke menu utama
          </button>
        </section>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[85px] z-[5] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full block" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M 0 12 Q 500 42 1000 12 L 1000 100 L 0 100 Z" fill="#17544f" />
        </svg>
      </div>
    </main>
  );
}

export default CurtainsScreen;
