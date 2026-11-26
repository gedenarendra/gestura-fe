import React, { useState } from "react";

export function LightingScreen({ onBack }) {
  const [isOn, setIsOn] = useState(false);

  return (
    <main className="relative w-screen h-dvh overflow-hidden bg-[#f8f9f6]" aria-label="Lighting Control">
      <div className="absolute top-0 left-0 w-full h-[85px] z-[5] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full block" viewBox="0 0 1000 100" preserveAspectRatio="none">
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
            Lighting
          </h1>
        </header>

        <section className="min-h-[calc(100%-62px)] flex flex-col items-center">
          <h2 className="mt-[0.85rem] mx-0 mb-[2.15rem] font-georgia text-[clamp(1.25rem,4vw,1.5rem)] font-medium text-[#142520] text-center max-h-short:mt-[0.35rem] max-h-short:mb-[1.25rem]">
            Lamp Station
          </h2>

          <button
            type="button"
            className={`w-[340px] max-w-[calc(100%-16px)] h-[272px] border border-[rgba(31,116,111,0.07)] rounded-[12px] text-[#171717] flex items-center justify-center cursor-pointer transition-[background,color,transform,box-shadow] duration-[250ms] ease-in-out hover:-translate-y-[2px] max-w-390:h-[250px] max-h-short:h-[220px] motion-reduce:transition-none ${
              isOn
                ? "bg-[#ffd400] shadow-[0_9px_18px_rgba(90,79,0,0.16)]"
                : "bg-white shadow-[0_7px_16px_rgba(18,63,60,0.12)]"
            }`}
            onClick={() => setIsOn((current) => !current)}
            aria-label={isOn ? "Matikan lampu" : "Nyalakan lampu"}
            aria-pressed={isOn}
          >
            <svg
              className="w-[190px] h-[190px] block max-w-390:w-[170px] max-w-390:h-[170px] max-h-short:w-[155px] max-h-short:h-[155px]"
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
            className="w-[340px] max-w-[calc(100%-16px)] h-[70px] mt-[4.25rem] border-0 rounded-full bg-transparent p-0 cursor-pointer max-w-390:mt-[3.25rem] max-h-short:mt-[2.25rem] max-h-short:h-[62px]"
            onClick={() => setIsOn((current) => !current)}
            aria-pressed={isOn}
            aria-label={isOn ? "Matikan lampu" : "Nyalakan lampu"}
          >
            <span
              className={`relative block w-full h-full rounded-full shadow-[inset_0_1px_2px_rgba(20,37,32,0.03)] transition-[background] duration-[250ms] ease-in-out motion-reduce:transition-none ${
                isOn ? "bg-[#ffd400]" : "bg-[#e2e6ec]"
              }`}
              aria-hidden="true"
            >
              <span
                className={`absolute top-[12px] w-[46px] h-[46px] rounded-full bg-white shadow-[0_3px_9px_rgba(18,63,60,0.12)] transition-[left] duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] max-h-short:top-[9px] max-h-short:w-[44px] max-h-short:h-[44px] motion-reduce:transition-none ${
                  isOn
                    ? "left-[calc(100%-58px)] max-h-short:left-[calc(100%-53px)]"
                    : "left-[12px]"
                }`}
              />
            </span>
          </button>

          <button
            type="button"
            className="w-full min-h-[58px] mt-auto mb-0 border-0 rounded-[12px] bg-[#1f746f] text-white text-[1rem] font-bold cursor-pointer shadow-[0_5px_14px_rgba(31,116,111,0.18)]"
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

export default LightingScreen;
