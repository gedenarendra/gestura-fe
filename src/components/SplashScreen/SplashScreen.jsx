import React, { useState, useEffect, useRef } from "react";
import rectangleLeft from "../../assets/rectangle-9.png";
import rectangleRight from "../../assets/rectangle-10.png";
import cardIconMic from "../../assets/logo mic gestura.png";
import cardIconGesture from "../../assets/Logo Gesture Gestura.png";
import "./SplashScreen.css";

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
    <section className="splash-screen" aria-label="Gestura Splash Screen">
      {/* ====================================================================
          TAMPILAN 1: Initial Splash Screen (Gestura Branding)
          ==================================================================== */}
      <div
        className={`splash-view splash-view-initial ${
          currentStep === 1 ? "active" : "inactive"
        }`}
        aria-hidden={currentStep !== 1}
      >
        {/* Pojok kiri: dekorasi lengkung kiri */}
        <img
          src={rectangleLeft}
          alt=""
          className="splash-flank splash-flank-left"
          aria-hidden="true"
        />

        {/* Pojok kanan: dekorasi lengkung kanan */}
        <img
          src={rectangleRight}
          alt=""
          className="splash-flank splash-flank-right"
          aria-hidden="true"
        />

        {/* Central branding content */}
        <div className="splash-content">
          <div className="splash-emblem-container">
            <img
              src="/Bunga%20kamboja%20GESTURA.png"
              alt="Gestura Plumeria Emblem"
              className="splash-emblem-image"
            />
          </div>

          <div className="splash-branding">
            <h1 className="splash-title">GESTURA</h1>
            <p className="splash-subtitle">smart concierge</p>
          </div>
        </div>
      </div>

      {/* ====================================================================
          TAMPILAN 2: Onboarding Feature Selection Screen
          ==================================================================== */}
      <div
        className={`splash-view splash-view-onboarding ${
          currentStep === 2 ? "active" : "inactive"
        }`}
        aria-hidden={currentStep !== 2}
      >
        {/* Top curved dark teal header bar */}
        <div className="onboarding-top-bar" aria-hidden="true">
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="onboarding-bar-svg"
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
        <div className="onboarding-content-container">
          <header className="onboarding-header">
            <h2 className="onboarding-title">Bagaimana kami membantu?</h2>
            <p className="onboarding-subtitle">
              Pilih cara yang paling nyaman. Anda dapat menggantinya kapan saja.
            </p>
          </header>

          {/* Assistance Selection Cards */}
          <div
            className="onboarding-cards-list"
            role="radiogroup"
            aria-label="Pilihan metode bantuan"
          >
            {/* Card 1: Mikrofon */}
            <button
              type="button"
              className={`onboarding-card ${
                selectedMethod === "mikrofon" ? "selected" : ""
              }`}
              onClick={() => handleSelectMethod("mikrofon")}
              aria-pressed={selectedMethod === "mikrofon"}
            >
              <div className="onboarding-icon-box" aria-hidden="true">
                <img
                  src={cardIconMic}
                  alt="Ikon Mikrofon"
                  className="onboarding-icon-img"
                />
              </div>
              <div className="onboarding-card-text">
                <h3 className="onboarding-card-title">Mikrofon</h3>
                <p className="onboarding-card-desc">
                  Fitur ini akan membantu kalian untuk membantu memilih sebuah
                  layanan dengan menggunakan audio.
                </p>
              </div>
            </button>

            {/* Card 2: Gesture */}
            <button
              type="button"
              className={`onboarding-card ${
                selectedMethod === "gesture" ? "selected" : ""
              }`}
              onClick={() => handleSelectMethod("gesture")}
              aria-pressed={selectedMethod === "gesture"}
            >
              <div className="onboarding-icon-box" aria-hidden="true">
                <img
                  src={cardIconGesture}
                  alt="Ikon Gesture"
                  className="onboarding-icon-img"
                />
              </div>
              <div className="onboarding-card-text">
                <h3 className="onboarding-card-title">Gesture</h3>
                <p className="onboarding-card-desc">
                  Fitur ini akan membantu kalian untuk membantu memilih sebuah
                  layanan dengan menggunakan gesture.
                </p>
              </div>
            </button>
          </div>

          {/* Bottom informative note */}
          <p className="onboarding-footer-note">
            Dengan fitur ini kami harap akan membantu penggunaan layanan hotel
            yang praktik dan efesien.
          </p>
        </div>

        {/* Bottom curved dark teal footer bar */}
        <div className="onboarding-bottom-bar" aria-hidden="true">
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="onboarding-bar-svg"
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
        className="splash-step-indicators"
        aria-label="Pindah tampilan splash screen"
      >
        <button
          type="button"
          className={`step-dot ${currentStep === 1 ? "active" : ""}`}
          onClick={() => setInternalStep(1)}
          aria-label="Tampilan 1: Gestura Splash"
        />
        <button
          type="button"
          className={`step-dot ${currentStep === 2 ? "active" : ""}`}
          onClick={() => setInternalStep(2)}
          aria-label="Tampilan 2: Bagaimana Kami Membantu"
        />
      </nav>
    </section>
  );
}

export default SplashScreen;
