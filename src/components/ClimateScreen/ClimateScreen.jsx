import React, { useState } from "react";

const MODES = [
  { id: "automatic", label: "Otomatis" },
  { id: "cool", label: "Dingin" },
  { id: "fan", label: "Kipas" },
];

const STEP_BTN_CLASS =
  "w-[62px] h-[62px] border-0 rounded-full bg-[#eef3f1] text-[#1f746f] text-[1.9rem] leading-none cursor-pointer shadow-[0_4px_12px_rgba(18,63,60,0.06)] transition-[transform,background] duration-[180ms] ease-in-out hover:enabled:scale-[1.05] hover:enabled:bg-[#e5eeea] active:enabled:scale-[0.96] disabled:text-[#a8b5b1] disabled:bg-[#f2f4f3] disabled:shadow-none disabled:cursor-not-allowed max-w-390:w-[50px] max-w-390:h-[50px] motion-reduce:transition-none";

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
    <main className="relative w-screen h-dvh overflow-hidden bg-[#f8f9f6]" aria-label="Climate Control">
      <div className="absolute top-0 left-0 w-full h-[85px] z-[5] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full block" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="climateHeaderTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#174f4c" />
              <stop offset="60%" stopColor="#1a615d" />
              <stop offset="100%" stopColor="#1f746f" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 1000 0 L 1000 88 Q 500 58 0 88 Z" fill="url(#climateHeaderTeal)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-white font-georgia text-[clamp(1.25rem,4vw,1.7rem)] tracking-[0.05em] pb-[16px]">
          GESTURA
        </div>
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
            Climate
          </h1>
        </header>

        <section className="flex flex-col items-center">
          <h2 className="mt-[0.75rem] mx-0 mb-[1.15rem] font-georgia text-[clamp(1.25rem,4vw,1.5rem)] font-medium text-[#142520] text-center max-h-short:mt-[0.2rem] max-h-short:mb-[0.65rem]">
            Air Conditioner Station
          </h2>

          <article className="w-full min-h-[390px] box-border pt-[1.35rem] px-[1.25rem] pb-[1.25rem] border border-[rgba(31,116,111,0.08)] rounded-[20px] bg-white shadow-[0_7px_22px_rgba(18,63,60,0.08)] max-h-short:min-h-[350px]">
            <div className="flex items-center justify-between gap-[1rem] mb-[1.05rem] text-[0.78rem] font-bold">
              <span className="text-[#23817a]">AC menyala · contoh</span>
              <span className="text-[#93a29d] font-medium" aria-live="polite">
                Suhu ruang {temperature}°C*
              </span>
            </div>

            <div className="min-h-[250px] grid grid-cols-[62px_minmax(190px,238px)_62px] items-center justify-center gap-[0.55rem] max-w-390:grid-cols-[50px_minmax(174px,210px)_50px] max-h-short:min-h-[220px]">
              <button
                type="button"
                className={STEP_BTN_CLASS}
                onClick={decreaseTemperature}
                disabled={temperature <= 16}
                aria-label="Kurangi suhu"
              >
                −
              </button>

              <div
                className="climate-dial relative w-[238px] h-[238px] max-w-full aspect-square rounded-full max-w-390:w-[210px] max-w-390:h-[210px] max-h-short:w-[210px] max-h-short:h-[210px]"
                style={{ "--temperature-progress": `${((temperature - 16) / 14) * 100}%` }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[#318b84] text-[1.2rem] mb-[0.15rem]" aria-hidden="true">
                    ❄
                  </span>
                  <strong className="text-[#17544f] font-georgia text-[clamp(3.7rem,14vw,5.2rem)] leading-none font-normal">
                    {temperature}°
                  </strong>
                  <small className="mt-[0.55rem] text-[#82948f] text-[0.78rem]">
                    Suhu yang dipilih
                  </small>
                </div>
              </div>

              <button
                type="button"
                className={STEP_BTN_CLASS}
                onClick={increaseTemperature}
                disabled={temperature >= 30}
                aria-label="Tambah suhu"
              >
                +
              </button>
            </div>

            <div className="grid grid-cols-3 gap-[0.55rem] mt-[0.25rem]" role="group" aria-label="Mode AC">
              {MODES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`min-h-[48px] border-0 rounded-[10px] text-[0.86rem] font-bold cursor-pointer transition-all duration-[180ms] ease-in-out motion-reduce:transition-none ${
                    mode === item.id
                      ? "bg-[#1f746f] text-white shadow-[0_5px_12px_rgba(31,116,111,0.18)]"
                      : "bg-[#eef3f1] text-[#61736d]"
                  }`}
                  onClick={() => setMode(item.id)}
                  aria-pressed={mode === item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </article>

          <button
            type="button"
            className="w-full min-h-[58px] mt-[1.25rem] border-0 rounded-[12px] bg-[#1f746f] text-white text-[1rem] font-bold cursor-pointer shadow-[0_5px_14px_rgba(31,116,111,0.18)]"
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

export default ClimateScreen;
