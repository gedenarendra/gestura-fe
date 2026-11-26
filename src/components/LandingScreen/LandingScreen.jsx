import React, { useState } from "react";
import iconRoomService from "../../assets/icon-room-service.png";
import iconSpaBooking from "../../assets/icon-spa-booking.png";
import iconClimate from "../../assets/icon-climate.png";
import iconLighting from "../../assets/icon-lighting.png";
import iconCurtains from "../../assets/icon-curtains.png";
import iconPrivacy from "../../assets/icon-privacy.png";

const LANDING_CARD_BASE =
  "relative bg-white border border-solid rounded-[20px] aspect-square flex flex-col items-center justify-center py-4 px-2 m-0 cursor-pointer transition-[transform,box-shadow,border-color] duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] select-none [-webkit-tap-highlight-color:transparent] outline-none box-border hover:-translate-y-1 hover:scale-102 hover:shadow-[0_14px_30px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.05)] hover:border-[#1f746f]/20 active:-translate-y-px active:scale-[0.99] focus-visible:outline-[2.5px] focus-visible:outline-[#1f746f] focus-visible:outline-offset-[4px] motion-reduce:transition-none";

/**
 * Daftar layanan hotel pada Landing Screen
 */
const HOTEL_SERVICES = [
  {
    id: "room-service",
    label: "room service",
    icon: iconRoomService,
    description: "Pemesanan makanan & minuman ke kamar",
  },
  {
    id: "spa-booking",
    label: "spa booking",
    icon: iconSpaBooking,
    description: "Reservasi relaksasi & perawatan spa",
  },
  {
    id: "climate",
    label: "climate",
    icon: iconClimate,
    description: "Pengaturan suhu & AC kamar",
  },
  {
    id: "lighting",
    label: "lighting",
    icon: iconLighting,
    description: "Kontrol pencahayaan kamar",
  },
  {
    id: "curtains",
    label: "curtains",
    icon: iconCurtains,
    description: "Buka dan tutup tirai otomatis",
  },
  {
    id: "privacy",
    label: "privacy",
    icon: iconPrivacy,
    description: "Mode privasi & jangan ganggu",
  },
];

/**
 * LandingScreen Component
 *
 * Halaman utama (dashboard concierge) Gestura dengan grid 6 layanan hotel:
 * - room service, spa booking, climate, lighting, curtains, privacy.
 * Mengikuti desain visual dengan header/footer melengkung teal dan ucapan "Good Morning".
 */
export function LandingScreen({ onSelectService, greeting = "Good Morning" }) {
  const [activeServiceId, setActiveServiceId] = useState(null);

  const handleServiceClick = (service) => {
    setActiveServiceId(service.id);
    if (onSelectService) {
      onSelectService(service);
    }
  };

  return (
    <main
      className="relative w-screen h-dvh m-0 p-0 overflow-hidden bg-[#e8f1ec] box-border flex flex-col items-center justify-center"
      aria-label="Gestura Concierge Dashboard"
    >
      {/* Bar atas lengkung dark teal */}
      <div className="absolute top-0 left-0 right-0 w-full h-[80px] z-3 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient
              id="landingHeaderTeal"
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
            fill="url(#landingHeaderTeal)"
          />
        </svg>
      </div>

      {/* Konten Utama */}
      <div className="relative z-2 w-full max-w-[480px] h-full flex flex-col justify-center items-center pt-22 px-7 pb-20 box-border animate-landing-fade-in max-h-short:pt-18 max-h-short:px-5 max-h-short:pb-16 motion-reduce:animate-none">
        {/* Header Ucapan Salam & Ikon Bunga Kamboja */}
        <header className="mb-9 flex justify-center items-center w-full max-h-short:mb-5">
          <h1 className="m-0 inline-flex items-center justify-center gap-[0.65rem] font-serif-brand text-[clamp(2rem,5.5vw,2.5rem)] font-medium tracking-[0.02em] text-[#162420] leading-[1.2]">
            <span>{greeting}</span>
            <img
              src="/Bunga%20kamboja%20GESTURA.png"
              alt=""
              className="w-[clamp(52px,11vw,68px)] h-[clamp(52px,11vw,68px)] object-contain object-center select-none [-webkit-user-drag:none] mix-blend-screen [filter:saturate(0.92)_contrast(1.04)_drop-shadow(0_5px_8px_rgba(20,34,30,0.12))] -translate-y-px"
              aria-hidden="true"
            />
          </h1>
        </header>

        {/* Grid 6 Kartu Layanan Hotel */}
        <section
          className="grid grid-cols-2 gap-[clamp(1rem,3.5vw,1.35rem)] w-full max-w-[400px] mx-auto"
          role="region"
          aria-label="Pilihan Layanan Hotel"
        >
          {HOTEL_SERVICES.map((service) => {
            const isSelected = activeServiceId === service.id;
            return (
              <button
                key={service.id}
                type="button"
                className={`${LANDING_CARD_BASE} ${
                  isSelected
                    ? "border-[#1f746f] shadow-[0_0_0_2px_#1f746f,0_14px_30px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.05)]"
                    : "border-black/3 shadow-[0_8px_22px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]"
                }`}
                onClick={() => handleServiceClick(service)}
                aria-label={`${service.label}: ${service.description}`}
                aria-pressed={isSelected}
              >
                <div
                  className="h-[58px] flex items-center justify-center mb-[0.65rem] pointer-events-none max-h-short:h-[44px] max-h-short:mb-[0.4rem]"
                  aria-hidden="true"
                >
                  <img
                    src={service.icon}
                    alt=""
                    className="w-auto h-auto max-w-[52px] max-h-[52px] object-contain block max-h-short:max-w-[40px] max-h-short:max-h-[40px]"
                  />
                </div>
                <span className="font-serif-brand text-[clamp(1.05rem,3vw,1.25rem)] font-medium text-[#162420] text-center leading-[1.15] tracking-[0.01em] lowercase pointer-events-none">
                  {service.label}
                </span>
              </button>
            );
          })}
        </section>
      </div>

      {/* Bar bawah lengkung dark teal */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[80px] z-3 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient
              id="landingFooterTeal"
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
            fill="url(#landingFooterTeal)"
          />
        </svg>
      </div>
    </main>
  );
}

export default LandingScreen;
