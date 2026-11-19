import React, { useState } from "react";
import iconRoomService from "../../assets/icon-room-service.png";
import iconSpaBooking from "../../assets/icon-spa-booking.png";
import iconClimate from "../../assets/icon-climate.png";
import iconLighting from "../../assets/icon-lighting.png";
import iconCurtains from "../../assets/icon-curtains.png";
import iconPrivacy from "../../assets/icon-privacy.png";
import "./LandingScreen.css";

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
    <main className="landing-screen" aria-label="Gestura Concierge Dashboard">
      {/* Bar atas lengkung dark teal */}
      <div className="landing-top-bar" aria-hidden="true">
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="landing-bar-svg"
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
      <div className="landing-container">
        {/* Header Ucapan Salam & Ikon Bunga Kamboja */}
        <header className="landing-header">
          <h1 className="landing-greeting">
            <span>{greeting}</span>
            <img
              src="/Bunga%20kamboja%20GESTURA.png"
              alt=""
              className="landing-greeting-flower"
              aria-hidden="true"
            />
          </h1>
        </header>

        {/* Grid 6 Kartu Layanan Hotel */}
        <section
          className="landing-services-grid"
          role="region"
          aria-label="Pilihan Layanan Hotel"
        >
          {HOTEL_SERVICES.map((service) => {
            const isSelected = activeServiceId === service.id;
            return (
              <button
                key={service.id}
                type="button"
                className={`landing-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleServiceClick(service)}
                aria-label={`${service.label}: ${service.description}`}
                aria-pressed={isSelected}
              >
                <div className="landing-card-icon-wrapper" aria-hidden="true">
                  <img
                    src={service.icon}
                    alt=""
                    className="landing-card-icon"
                  />
                </div>
                <span className="landing-card-label">{service.label}</span>
              </button>
            );
          })}
        </section>
      </div>

      {/* Bar bawah lengkung dark teal */}
      <div className="landing-bottom-bar" aria-hidden="true">
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="landing-bar-svg"
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
