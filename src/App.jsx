import React, { useState } from "react";
import { SplashScreen } from "./components/SplashScreen/SplashScreen";
import { LandingScreen } from "./components/LandingScreen/LandingScreen";
import { RoomScreen } from "./components/RoomScreen/RoomScreen";
import { SpaBooking } from "./components/SpaScreen";
import { ClimateScreen } from "./components/ClimateScreen";
import { LightingScreen } from "./components/LightingScreen";
import { CurtainsScreen } from "./components/CurtainsScreen";
import { PrivacyScreen } from "./components/PrivacyScreen";

const LAYER_BASE =
  "absolute inset-0 w-full h-full box-border overflow-hidden transition-[transform,opacity] duration-800 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[transform,opacity] motion-reduce:transition-none";
const LAYER_ACTIVE = "opacity-100 translate-y-0 scale-100 pointer-events-auto z-2";
const LAYER_INACTIVE = "opacity-0 translate-y-8 scale-98 pointer-events-none z-1";
const SPLASH_INACTIVE = "opacity-0 -translate-y-6 scale-96 pointer-events-none z-1";

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
    <div className="relative w-screen h-dvh m-0 p-0 overflow-hidden bg-[#e8f1ec] box-border">
      {/* Layar 1: Splash Screen (Otomatis di-unmount setelah transisi selesai) */}
      {isSplashMounted && (
        <div
          className={`${LAYER_BASE} ${
            currentScreen === "splash" ? LAYER_ACTIVE : SPLASH_INACTIVE
          }`}
          aria-hidden={currentScreen !== "splash"}
        >
          <SplashScreen onComplete={handleSplashComplete} />
        </div>
      )}

      {/* Layar 2: Landing Screen */}
      <div
        className={`${LAYER_BASE} ${
          currentScreen === "landing" ? LAYER_ACTIVE : LAYER_INACTIVE
        }`}
        aria-hidden={currentScreen !== "landing"}
      >
        <LandingScreen onSelectService={handleSelectService} />
      </div>

      {/* Layar 3: Room Screen (Room Service & Housekeeping) */}
      <div
        className={`${LAYER_BASE} ${
          currentScreen === "room" ? LAYER_ACTIVE : LAYER_INACTIVE
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
        className={`${LAYER_BASE} ${
          currentScreen === "spa-booking" ? LAYER_ACTIVE : LAYER_INACTIVE
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
        className={`${LAYER_BASE} ${
          currentScreen === "climate" ? LAYER_ACTIVE : LAYER_INACTIVE
        }`}
        aria-hidden={currentScreen !== "climate"}
      >
        <ClimateScreen onBack={() => setCurrentScreen("landing")} />
      </div>

      {/* Layar 6: Lighting Screen */}
      <div
        className={`${LAYER_BASE} ${
          currentScreen === "lighting" ? LAYER_ACTIVE : LAYER_INACTIVE
        }`}
        aria-hidden={currentScreen !== "lighting"}
      >
        <LightingScreen onBack={() => setCurrentScreen("landing")} />
      </div>

      {/* Layar 7: Curtains Screen */}
      <div
        className={`${LAYER_BASE} ${
          currentScreen === "curtains" ? LAYER_ACTIVE : LAYER_INACTIVE
        }`}
        aria-hidden={currentScreen !== "curtains"}
      >
        <CurtainsScreen onBack={() => setCurrentScreen("landing")} />
      </div>

      {/* Layar 8: Privacy Screen */}
      <div
        className={`${LAYER_BASE} ${
          currentScreen === "privacy" ? LAYER_ACTIVE : LAYER_INACTIVE
        }`}
        aria-hidden={currentScreen !== "privacy"}
      >
        <PrivacyScreen onBack={() => setCurrentScreen("landing")} />
      </div>
    </div>
  );
}

export default App;
