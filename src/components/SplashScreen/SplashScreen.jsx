import React, { useState, useEffect, useRef } from "react";
import rectangleLeft from "../../assets/rectangle-9.png";
import rectangleRight from "../../assets/rectangle-10.png";
import cardIconMic from "../../assets/logo mic gestura.png";
import cardIconGesture from "../../assets/Logo Gesture Gestura.png";

const SPLASH_VIEW_BASE =
  "absolute inset-0 w-full h-full box-border overflow-hidden transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity,transform] motion-reduce:transition-none";
const SPLASH_VIEW_ACTIVE = "opacity-100 scale-100 pointer-events-auto z-[2]";
const SPLASH_VIEW_INACTIVE = "opacity-0 scale-[0.985] pointer-events-none z-[1]";
const ONBOARDING_CARD_BASE =
  "group flex items-center gap-[1.35rem] bg-transparent border-0 py-[0.5rem] px-[0.25rem] m-0 text-left cursor-pointer rounded-[20px] transition-[transform,opacity] duration-200 ease-in-out select-none [-webkit-tap-highlight-color:transparent] hover:-translate-y-[2px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#1f746f] focus-visible:outline-offset-[6px] motion-reduce:transition-none";
const ONBOARDING_ICON_BOX_BASE =
  "w-[82px] h-[82px] min-w-[82px] rounded-[18px] overflow-hidden flex items-center justify-center bg-[#a4b2ab] transition-[box-shadow,transform] duration-[250ms] ease-in-out group-hover:scale-[1.02] motion-reduce:transition-none";

/**
 * SplashScreen Component
 *
 * Menampilkan alur splash screen:
 * - Tampilan 1: Gestura Splash (logo plumeria + kurva rectangle 9 & 10 di pojok kiri/kanan).
 * - Tampilan 2: Onboarding ("Bagaimana kami membantu?", Mikrofon & Gesture).
 * - Menjamin callback onComplete hanya dipanggil TEPAT SATU KALI dengan pembersihan timer total.
 */
export function SplashScreen({
  step: controlledStep,
  initialStep = 1,
  autoTransition = true,
  view1Duration = 800,
  view2Duration = 3200,
  onComplete,
}) {
  const [internalStep, setInternalStep] = useState(initialStep);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Mencegah pemanggilan onComplete ganda atau timer zombie di background
  const hasCompletedRef = useRef(false);
  const timerAutoRef = useRef(null);
  const timerStepRef = useRef(null);

  const currentStep = controlledStep !== undefined ? controlledStep : internalStep;

  // Fungsi pengiriman selesainya splash screen (hanya dipanggil 1 kali)
  const triggerComplete = (method) => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    // Bersihkan semua timer aktif seketika
    if (timerAutoRef.current) clearTimeout(timerAutoRef.current);
    if (timerStepRef.current) clearTimeout(timerStepRef.current);

    if (onComplete) {
      onComplete(method);
    }
  };

  // 1. Transisi dari Tampilan 1 ke Tampilan 2 setelah 800 ms
  useEffect(() => {
    if (!autoTransition || controlledStep !== undefined || hasCompletedRef.current) return;

    timerStepRef.current = setTimeout(() => {
      setInternalStep(2);
    }, view1Duration);

    return () => {
      if (timerStepRef.current) clearTimeout(timerStepRef.current);
    };
  }, [autoTransition, controlledStep, view1Duration]);

  // 2. Transisi otomatis dari SplashScreen (Tampilan 2) ke LandingScreen
  useEffect(() => {
    if (
      !autoTransition ||
      !onComplete ||
      currentStep !== 2 ||
      hasCompletedRef.current
    )
      return;

    timerAutoRef.current = setTimeout(() => {
      triggerComplete(selectedMethod);
    }, view2Duration);

    return () => {
      if (timerAutoRef.current) clearTimeout(timerAutoRef.current);
    };
  }, [autoTransition, onComplete, currentStep, view2Duration, selectedMethod]);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    // Batalkan timer otomatis saat user sudah memilih opsi manual
    if (timerAutoRef.current) clearTimeout(timerAutoRef.current);

    // Beri sedikit feedback visual kartu sebelum trigger transisi layar
    setTimeout(() => {
      triggerComplete(method);
    }, 280);
  };

  return (
    <section
      className="relative w-screen h-dvh m-0 p-0 overflow-hidden bg-white box-border"
      aria-label="Gestura Splash Screen"
    >
      {/* ====================================================================
          TAMPILAN 1: Initial Splash Screen (Gestura Branding)
          ==================================================================== */}
      <div
        className={`${SPLASH_VIEW_BASE} bg-white flex items-center justify-center ${
          currentStep === 1 ? SPLASH_VIEW_ACTIVE : SPLASH_VIEW_INACTIVE
        }`}
        aria-hidden={currentStep !== 1}
      >
        {/* Pojok kiri: dekorasi lengkung kiri */}
        <img
          src={rectangleLeft}
          alt=""
          className="absolute top-0 bottom-0 left-0 h-full w-auto pointer-events-none select-none [-webkit-user-drag:none] z-[1]"
          aria-hidden="true"
        />

        {/* Pojok kanan: dekorasi lengkung kanan */}
        <img
          src={rectangleRight}
          alt=""
          className="absolute top-0 bottom-0 right-0 h-full w-auto pointer-events-none select-none [-webkit-user-drag:none] z-[1]"
          aria-hidden="true"
        />

        {/* Central branding content */}
        <div className="relative z-[2] flex flex-col items-center text-center mt-[-6vh] px-[1.5rem] max-w-[min(90vw,420px)] w-full box-border">
          <div className="w-full min-h-[clamp(170px,38vw,260px)] flex justify-center items-center">
            <img
              src="/Bunga%20kamboja%20GESTURA.png"
              alt="Gestura Plumeria Emblem"
              className="w-full max-w-[clamp(180px,52vw,260px)] h-[clamp(170px,38vw,260px)] object-contain object-center select-none [-webkit-user-drag:none] mix-blend-screen [filter:saturate(0.96)_contrast(1.03)_drop-shadow(0_8px_14px_rgba(20,34,30,0.09))]"
            />
          </div>

          <div className="mt-[1.5rem] flex flex-col items-center">
            <h1 className="m-0 font-serif-brand text-[clamp(2rem,5.8vw,2.7rem)] font-medium tracking-[0.12em] text-black leading-[1.15] uppercase">
              GESTURA
            </h1>
            <p className="mt-[0.45rem] mb-0 font-serif-brand text-[clamp(1.05rem,3.2vw,1.35rem)] font-normal tracking-[0.04em] text-black leading-[1.2] lowercase">
              smart concierge
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================================
          TAMPILAN 2: Onboarding Feature Selection Screen
          ==================================================================== */}
      <div
        className={`${SPLASH_VIEW_BASE} bg-[#e8f1ec] flex flex-col items-center justify-center ${
          currentStep === 2 ? SPLASH_VIEW_ACTIVE : SPLASH_VIEW_INACTIVE
        }`}
        aria-hidden={currentStep !== 2}
      >
        {/* Top curved dark teal header bar */}
        <div className="absolute top-0 left-0 right-0 w-full h-[80px] z-[3] pointer-events-none" aria-hidden="true">
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <defs>
              <linearGradient
                id="headerTealGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#174f4c" />
                <stop offset="60%" stopColor="#1a615d" />
                <stop offset="100%" stopColor="#1f746f" />
              </linearGradient>
            </defs>
            <path
              d="M 0 0 L 1000 0 L 1000 88 Q 500 58 0 88 Z"
              fill="url(#headerTealGrad)"
            />
          </svg>
        </div>

        {/* Onboarding center body content */}
        <div className="relative z-[2] w-full max-w-[500px] h-full flex flex-col justify-center pt-[5rem] px-[1.75rem] pb-[4.5rem] box-border">
          <header className="mb-[2.25rem] text-left">
            <h2 className="mt-0 mx-0 mb-[0.5rem] font-serif-brand text-[clamp(1.75rem,5vw,2.2rem)] font-semibold text-[#14221e] leading-[1.25]">
              Bagaimana kami membantu?
            </h2>
            <p className="m-0 font-sans-system text-[clamp(0.92rem,2.5vw,1.05rem)] font-normal text-[#566861] leading-[1.45]">
              Pilih cara yang paling nyaman. Anda dapat menggantinya kapan saja.
            </p>
          </header>

          {/* Assistance Selection Cards */}
          <div
            className="flex flex-col gap-[1.35rem] mb-[2.75rem] w-full"
            role="radiogroup"
            aria-label="Pilihan metode bantuan"
          >
            {/* Card 1: Mikrofon */}
            <button
              type="button"
              className={ONBOARDING_CARD_BASE}
              onClick={() => handleSelectMethod("mikrofon")}
              aria-pressed={selectedMethod === "mikrofon"}
            >
              <div
                className={`${ONBOARDING_ICON_BOX_BASE} ${
                  selectedMethod === "mikrofon"
                    ? "shadow-[0_0_0_3px_#1f746f,0_6px_16px_rgba(0,0,0,0.12)]"
                    : "shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                }`}
                aria-hidden="true"
              >
                <img
                  src={cardIconMic}
                  alt="Ikon Mikrofon"
                  className="w-[68px] h-[68px] max-w-[calc(100%-16px)] max-h-[calc(100%-16px)] object-contain object-center block"
                />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h3 className="mt-0 mx-0 mb-[0.35rem] font-serif-brand text-[clamp(1.35rem,3.8vw,1.55rem)] font-semibold text-[#14221e] leading-[1.2]">
                  Mikrofon
                </h3>
                <p className="m-0 font-sans-system text-[clamp(0.85rem,2.3vw,0.95rem)] font-normal text-[#566861] leading-[1.4]">
                  Fitur ini akan membantu kalian untuk membantu memilih sebuah
                  layanan dengan menggunakan audio.
                </p>
              </div>
            </button>

            {/* Card 2: Gesture */}
            <button
              type="button"
              className={ONBOARDING_CARD_BASE}
              onClick={() => handleSelectMethod("gesture")}
              aria-pressed={selectedMethod === "gesture"}
            >
              <div
                className={`${ONBOARDING_ICON_BOX_BASE} ${
                  selectedMethod === "gesture"
                    ? "shadow-[0_0_0_3px_#1f746f,0_6px_16px_rgba(0,0,0,0.12)]"
                    : "shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                }`}
                aria-hidden="true"
              >
                <img
                  src={cardIconGesture}
                  alt="Ikon Gesture"
                  className="w-[68px] h-[68px] max-w-[calc(100%-16px)] max-h-[calc(100%-16px)] object-contain object-center block"
                />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h3 className="mt-0 mx-0 mb-[0.35rem] font-serif-brand text-[clamp(1.35rem,3.8vw,1.55rem)] font-semibold text-[#14221e] leading-[1.2]">
                  Gesture
                </h3>
                <p className="m-0 font-sans-system text-[clamp(0.85rem,2.3vw,0.95rem)] font-normal text-[#566861] leading-[1.4]">
                  Fitur ini akan membantu kalian untuk membantu memilih sebuah
                  layanan dengan menggunakan gesture.
                </p>
              </div>
            </button>
          </div>

          {/* Bottom informative note */}
          <p className="m-0 font-sans-system text-[clamp(0.9rem,2.4vw,0.98rem)] font-normal text-[#14221e] leading-[1.45] text-left">
            Dengan fitur ini kami harap akan membantu penggunaan layanan hotel
            yang praktik dan efesien.
          </p>
        </div>

        {/* Bottom curved dark teal footer bar */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[80px] z-[3] pointer-events-none" aria-hidden="true">
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <defs>
              <linearGradient
                id="footerTealGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#22736c" />
                <stop offset="50%" stopColor="#1a615d" />
                <stop offset="100%" stopColor="#17544f" />
              </linearGradient>
            </defs>
            <path
              d="M 0 12 Q 500 42 1000 12 L 1000 100 L 0 100 Z"
              fill="url(#footerTealGrad)"
            />
          </svg>
        </div>
      </div>

      {/* Navigasi indikator titik */}
      <nav
        className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center gap-[8px] z-[10] py-[4px] px-[8px] bg-black/15 rounded-[12px] backdrop-blur-[4px]"
        aria-label="Pindah tampilan splash screen"
      >
        <button
          type="button"
          className={`h-[8px] p-0 m-0 border-0 cursor-pointer transition-all duration-300 ease-in-out ${
            currentStep === 1 ? "w-[22px] rounded-[4px] bg-white" : "w-[8px] rounded-full bg-white/50"
          }`}
          onClick={() => setInternalStep(1)}
          aria-label="Tampilan 1: Gestura Splash"
        />
        <button
          type="button"
          className={`h-[8px] p-0 m-0 border-0 cursor-pointer transition-all duration-300 ease-in-out ${
            currentStep === 2 ? "w-[22px] rounded-[4px] bg-white" : "w-[8px] rounded-full bg-white/50"
          }`}
          onClick={() => setInternalStep(2)}
          aria-label="Tampilan 2: Bagaimana Kami Membantu"
        />
      </nav>
    </section>
  );
}

export default SplashScreen;
