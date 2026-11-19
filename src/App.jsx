import React, { useState } from "react";
import { SplashScreen } from "./components/SplashScreen/SplashScreen";
import { LandingScreen } from "./components/LandingScreen/LandingScreen";
import { RoomScreen } from "./components/RoomScreen/RoomScreen";
import { SpaBooking } from "./components/SpaScreen";
import { ClimateScreen } from "./components/ClimateScreen";
import { LightingScreen } from "./components/LightingScreen";
import { CurtainsScreen } from "./components/CurtainsScreen";
import { PrivacyScreen } from "./components/PrivacyScreen";
import "./App.css";

/**
 * Root Application Component
 *
 * Mengelola alur 3 layar utama Gestura:
 * 1. SplashScreen (Intro & Onboarding)
 * 2. LandingScreen (Dashboard 6 Layanan Hotel)
 * 3. RoomScreen (Room Service & Housekeeping Workflow)
 *
 * Transisi antar layar dilindungi agar timer splash screen tidak pernah
 * menimpa layar yang sedang aktif (misalnya saat pengguna sudah berada di RoomScreen).
 */
function App() {
  const [currentScreen, setCurrentScreen] = useState("splash"); // "splash" | "landing" | "room" | "spa"
  const [roomInitialView, setRoomInitialView] = useState("selection");
  const [spaSession, setSpaSession] = useState(0);
  const [isSplashMounted, setIsSplashMounted] = useState(true);

  const handleSplashComplete = () => {
    // HANYA alihkan ke 'landing' jika posisi saat ini memang masih di 'splash'
    setCurrentScreen((prev) => (prev === "splash" ? "landing" : prev));

    // Setelah animasi transisi 800ms selesai, unmount SplashScreen agar semua timer bersih total
    setTimeout(() => {
      setIsSplashMounted(false);
    }, 850);
  };

  const handleSelectService = (service) => {
    if (service.id === "room-service") {
      setRoomInitialView("selection");
      setCurrentScreen("room");
    }

    if (service.id === "spa-booking") {
      setRoomInitialView("spa");
      setSpaSession((session) => session + 1);
      setCurrentScreen("spa-booking");
    }

    if (service.id === "climate") {
      setCurrentScreen("climate");
    }

    if (service.id === "lighting") {
      setCurrentScreen("lighting");
    }

    if (service.id === "curtains") {
      setCurrentScreen("curtains");
    }

    if (service.id === "privacy") {
      setCurrentScreen("privacy");
    }
  };

  return (
    <div className="app-root">
      {/* Layar 1: Splash Screen (Otomatis di-unmount setelah transisi selesai) */}
      {isSplashMounted && (
        <div
          className={`app-screen-layer screen-splash ${
            currentScreen === "splash" ? "active" : "inactive"
          }`}
          aria-hidden={currentScreen !== "splash"}
        >
          <SplashScreen onComplete={handleSplashComplete} />
        </div>
      )}

      {/* Layar 2: Landing Screen */}
      <div
        className={`app-screen-layer screen-landing ${
          currentScreen === "landing" ? "active" : "inactive"
        }`}
        aria-hidden={currentScreen !== "landing"}
      >
        <LandingScreen onSelectService={handleSelectService} />
      </div>

      {/* Layar 3: Room Screen (Room Service & Housekeeping) */}
      <div
        className={`app-screen-layer screen-room ${
          currentScreen === "room" ? "active" : "inactive"
        }`}
        aria-hidden={currentScreen !== "room"}
      >
        <RoomScreen
          initialView={currentScreen === "room" ? roomInitialView : "selection"}
          onBack={() => setCurrentScreen("landing")}
        />
      </div>

      {/* Layar 4: Spa Booking Screen */}
      <div
        className={`app-screen-layer screen-spa-booking ${
          currentScreen === "spa-booking" ? "active" : "inactive"
        }`}
        aria-hidden={currentScreen !== "spa-booking"}
      >
        <SpaBooking
          key={spaSession}
          onBack={() => setCurrentScreen("landing")}
        />
      </div>

      {/* Layar 5: Climate Screen */}
      <div
        className={`app-screen-layer screen-climate ${
          currentScreen === "climate" ? "active" : "inactive"
        }`}
        aria-hidden={currentScreen !== "climate"}
      >
        <ClimateScreen onBack={() => setCurrentScreen("landing")} />
      </div>

      {/* Layar 6: Lighting Screen */}
      <div
        className={`app-screen-layer screen-lighting ${
          currentScreen === "lighting" ? "active" : "inactive"
        }`}
        aria-hidden={currentScreen !== "lighting"}
      >
        <LightingScreen onBack={() => setCurrentScreen("landing")} />
      </div>

      {/* Layar 7: Curtains Screen */}
      <div
        className={`app-screen-layer screen-curtains ${
          currentScreen === "curtains" ? "active" : "inactive"
        }`}
        aria-hidden={currentScreen !== "curtains"}
      >
        <CurtainsScreen onBack={() => setCurrentScreen("landing")} />
      </div>

      {/* Layar 8: Privacy Screen */}
      <div
        className={`app-screen-layer screen-privacy ${
          currentScreen === "privacy" ? "active" : "inactive"
        }`}
        aria-hidden={currentScreen !== "privacy"}
      >
        <PrivacyScreen onBack={() => setCurrentScreen("landing")} />
      </div>
    </div>
  );
}

export default App;
