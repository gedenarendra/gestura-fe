import React, { useState } from "react";
import roomDiningCard from "../../assets/gambar orang makan.png";
import roomHkCard from "../../assets/gambar orang spa.png";
import diningBanner from "../../assets/dining-banner.jpg";
import hkBanner from "../../assets/housekeeping-banner.jpg";
import foodNasiGoreng from "../../assets/food-nasi-goreng.jpg";
import foodJusJeruk from "../../assets/food-jus-jeruk.jpg";
import serviceMakeupRoom from "../../assets/service-makeup-room.jpg";
import serviceFreshTowels from "../../assets/service-fresh-towels.jpg";

/**
 * Menu Makanan & Minuman Default (In-Room Dining)
 */
const INITIAL_DINING_ITEMS = [
  {
    id: "nasi-goreng",
    title: "Nasi goreng Bali",
    description: "Telur, sate ayam & sambal terpisah",
    price: 85000,
    image: foodNasiGoreng,
    quantity: 2,
    category: "Morning Energize",
  },
  {
    id: "jus-jeruk",
    title: "Jus jeruk segar",
    description: "250 ml · tanpa tambahan gula",
    price: 30000,
    image: foodJusJeruk,
    quantity: 1,
    category: "Morning Energize",
  },
];

/**
 * Layanan Housekeeping & Amenities
 */
const INITIAL_HK_SERVICES = [
  {
    id: "make-up-room",
    title: "Make Up Room",
    description: "Permintaan agar staf segera membersihkan kamar.",
    image: serviceMakeupRoom,
    quantity: 1,
    category: "Room Cleaning",
  },
  {
    id: "fresh-towels",
    title: "Fresh Towels Bundle",
    description: "Permintaan penggantian atau tambahan handuk mandi.",
    image: serviceFreshTowels,
    quantity: 1,
    category: "Room Cleaning",
  },
];

const ROOM_BACK_BTN =
  "bg-transparent border-0 text-[1.65rem] leading-none text-[#14221e] cursor-pointer p-1 m-0 rounded-lg flex items-center justify-center transition-[transform,opacity] duration-200 ease-in-out hover:-translate-x-0.5 hover:opacity-80";
const ROOM_MAIN_TITLE =
  "m-0 font-serif-brand text-[clamp(1.45rem,4.5vw,1.85rem)] font-medium text-[#14221e] leading-[1.15]";
const STEPPER_BTN =
  "bg-transparent border-0 text-[1.15rem] leading-none text-[#185752] cursor-pointer py-0.5 px-1.5 font-semibold rounded-md transition-colors duration-150 ease-in-out hover:bg-[#185752]/12";
const BTN_PRIMARY_ACTION =
  "bg-[#185752] text-white border-0 rounded-[14px] p-[0.95rem] text-[0.95rem] font-semibold cursor-pointer shadow-[0_4px_14px_rgba(24,87,82,0.25)] transition-[transform,background-color] duration-200 ease-in-out w-full hover:enabled:bg-[#123f3c] hover:enabled:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed";
const BTN_ACTION_OUTLINE =
  "bg-transparent text-[#185752] border border-[#185752]/25 rounded-xl p-3 text-[0.88rem] font-semibold cursor-pointer transition-all duration-200 ease-in-out w-full hover:bg-[#185752]/8";
const CHOICE_CARD_CLASS =
  "group h-[clamp(248px,57vw,270px)] min-w-0 bg-white hover:bg-[#185752] rounded-[18px] overflow-hidden border-0 p-0 m-0 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] flex flex-col transition-[transform,box-shadow,background-color] duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] outline-none text-left hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] max-w-390:h-[238px]";
const CHOICE_CARD_TITLE_CLASS =
  "max-w-[175px] m-0 font-serif-brand text-[clamp(0.95rem,3vw,1.12rem)] font-medium text-[#14221e] group-hover:text-white transition-colors duration-250 leading-[1.18] text-balance max-w-390:text-[0.92rem]";

export function RoomScreen({ onBack }) {
  // Subview alur: "selection" | "dining" | "dining-review" | "housekeeping" | "housekeeping-review"
  const [subView, setSubView] = useState("selection");
  const [diningItems, setDiningItems] = useState(INITIAL_DINING_ITEMS);
  const [diningCategory, setDiningCategory] = useState("Morning Energize");
  const [hkCategory, setHkCategory] = useState("Room Cleaning");
  const [confirmedMessage, setConfirmedMessage] = useState(null);

  // Stepper kuantitas makanan
  const updateQuantity = (id, delta) => {
    setDiningItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  // Kalkulasi total In-Room Dining
  const totalItemCount = diningItems.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = diningItems.reduce(
    (acc, it) => acc + it.price * it.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.1);
  const serviceFee = Math.round(subtotal * 0.05);
  const totalGrand = subtotal + tax + serviceFee;

  const formatRupiah = (num) => `Rp${num.toLocaleString("id-ID")}`;

  const handleConfirmOrder = (orderType) => {
    setConfirmedMessage(
      orderType === "dining"
        ? "Pesanan In-Room Dining telah berhasil dikonfirmasi ke kamar 208!"
        : "Permintaan Housekeeping telah dikonfirmasi dan staf segera menuju kamar 208!",
    );
    setTimeout(() => {
      setConfirmedMessage(null);
      setSubView("selection");
    }, 2800);
  };

  return (
    <main
      className="relative w-screen h-dvh m-0 p-0 overflow-hidden bg-[#e8f1ec] box-border"
      aria-label="Room Service & Amenities Screen"
    >
      {/* Top curved dark teal header with GESTURA branding */}
      <div
        className="absolute top-0 left-0 right-0 w-full h-21.25 z-5 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient
              id="roomHeaderTeal"
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
            fill="url(#roomHeaderTeal)"
          />
        </svg>
      </div>

      {/* Main Responsive Container */}
      <div className="relative z-2 w-full max-w-120 h-full mx-auto box-border pt-22 px-5 pb-18 overflow-y-auto [-webkit-overflow-scrolling:touch] no-scrollbar max-w-390:px-4">
        {/* ====================================================================
            VIEW 1: Service Selection (In-Room Dining vs Housekeeping)
            ==================================================================== */}
        {subView === "selection" && (
          <section className="flex flex-col w-full animate-pane-fade-in">
            <header className="flex items-center gap-[0.85rem] mb-5 w-full">
              <button
                type="button"
                className={ROOM_BACK_BTN}
                onClick={onBack}
                aria-label="Kembali ke menu utama"
              >
                ←
              </button>
              <div className="flex flex-col">
                <h1 className={ROOM_MAIN_TITLE}>Room Service</h1>
                <p className="mt-1 mx-0 mb-0 font-sans-system text-[0.88rem] text-[#5e726b]">
                  Select service
                </p>
              </div>
            </header>

            <div className="grid grid-cols-2 gap-[clamp(0.85rem,3vw,1rem)] w-full mt-2 max-w-390:gap-3">
              {/* Card 1: In-Room Dining */}
              <button
                type="button"
                className={CHOICE_CARD_CLASS}
                onClick={() => setSubView("dining")}
              >
                <div className="w-full h-[calc(100%-72px)] flex-auto overflow-hidden bg-[#f1f5f9]">
                  <img
                    src={roomDiningCard}
                    alt="In-Room Dining"
                    className="w-full h-full object-cover object-center block transition-transform duration-400 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="h-[8 min-h-18 px py-3 px-[0.55rem] text-center flex items-center justify-center box-border max-w-390:h-17 max-w-390:min-h-17">
                  <h2 className={CHOICE_CARD_TITLE_CLASS}>In-Room Dining</h2>
                </div>
              </button>

              {/* Card 2: Housekeeping & Amenities */}
              <button
                type="button"
                className={CHOICE_CARD_CLASS}
                onClick={() => setSubView("housekeeping")}
              >
                <div className="w-full h-[calc(100%-72px)] flex-auto overflow-hidden bg-[#f1f5f9]">
                  <img
                    src={roomHkCard}
                    alt="Housekeeping & Amenities"
                    className="w-full h-full object-cover object-[58%_center] block transition-transform duration-400 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="h-18 min-h-18 py-3 px-[0.55rem] text-center flex items-center justify-center box-border max-w-390:h-17 max-w-390:min-h-17">
                  <h2 className={CHOICE_CARD_TITLE_CLASS}>
                    Housekeeping & Amenities
                  </h2>
                </div>
              </button>
            </div>
          </section>
        )}

        {/* ====================================================================
            VIEW 2: In-Room Dining Catalog
            ==================================================================== */}
        {subView === "dining" && (
          <section className="flex flex-col w-full animate-pane-fade-in">
            <header className="flex items-center gap-[0.85rem] mb-5 w-full">
              <button
                type="button"
                className={ROOM_BACK_BTN}
                onClick={() => setSubView("selection")}
                aria-label="Kembali ke pilihan service"
              >
                ←
              </button>
              <h1 className={ROOM_MAIN_TITLE}>In-Room Dining</h1>
            </header>

            {/* Hero Banner Image */}
            <div className="w-full h-36.25 rounded-[18px] overflow-hidden mb-[1.15rem] shadow-[0_4px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] bg-[#cbd5e1]">
              <img
                src={diningBanner}
                alt="In-Room Dining Feast"
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Category Tabs */}
            <div
              className="flex gap-2 overflow-x-auto mb-5 pb-0.5 no-scrollbar"
              role="tablist"
            >
              {["Morning Energize", "Local Signatures", "Western Classics"].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    className={`rounded-[20px] py-[0.45rem] px-4 text-[0.8rem] font-medium whitespace-nowrap cursor-pointer transition-all duration-200 ease-in-out border ${
                      diningCategory === cat
                        ? "bg-[#185752] text-white border-[#185752] shadow-[0_2px_8px_rgba(24,87,82,0.25)]"
                        : "bg-white text-[#334155] border-black/6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                    }`}
                    onClick={() => setDiningCategory(cat)}
                    aria-selected={diningCategory === cat}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>

            {/* Menu Items List */}
            <div className="flex flex-col gap-[0.85rem] mb-6">
              {diningItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[18px] p-[0.85rem] shadow-[0_4px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] flex items-center gap-[0.85rem] transition-transform duration-200 ease-in-out hover:-translate-y-px"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-21 h-21 min-w-21 rounded-[14px] object-cover"
                  />
                  <div className="flex-1 flex flex-col gap-[0.2rem] overflow-hidden">
                    <h3 className="m-0 font-sans-system text-[0.98rem] font-semibold text-[#14221e] leading-tight">
                      {item.title}
                    </h3>
                    <p className="m-0 font-sans-system text-[0.78rem] text-[#5e726b] leading-[1.35]">
                      {item.description}
                    </p>
                    <span className="font-sans-system text-[0.92rem] font-semibold text-[#185752] mt-1">
                      {formatRupiah(item.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-[0.4rem] bg-[#eaf1ed] rounded-[10px] py-0.75 px-1.5">
                    <button
                      type="button"
                      className={STEPPER_BTN}
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Kurangi ${item.title}`}
                    >
                      –
                    </button>
                    <span className="font-sans-system text-[0.92rem] font-semibold text-[#14221e] min-w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className={STEPPER_BTN}
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Tambah ${item.title}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Checkout Action Bar */}
            <div className="flex flex-col gap-[0.65rem] mt-2 pb-4">
              <div className="flex justify-between items-center pt-0 px-1 pb-2">
                <span className="text-[0.88rem] text-[#14221e]">
                  {totalItemCount} item · antar ke kamar 208
                </span>
                <span className="text-[1.05rem] font-bold text-[#185752]">
                  {formatRupiah(subtotal)}
                </span>
              </div>
              <button
                type="button"
                className={BTN_PRIMARY_ACTION}
                onClick={() => setSubView("dining-review")}
                disabled={totalItemCount === 0}
              >
                → Tinjau pesanan · {totalItemCount} item
              </button>
              <button
                type="button"
                className="bg-transparent text-[#185752] border border-[#185752]/25 rounded-[14px] p-[0.85rem] text-[0.92rem] font-semibold cursor-pointer transition-all duration-200 ease-in-out w-full hover:bg-[#185752]/6"
                onClick={() => setSubView("selection")}
              >
                Kembali ke menu utama
              </button>
            </div>
          </section>
        )}

        {/* ====================================================================
            VIEW 3: In-Room Dining Review & Confirmation
            ==================================================================== */}
        {subView === "dining-review" && (
          <section className="flex flex-col w-full animate-pane-fade-in">
            <header className="flex items-center gap-[0.85rem] mb-5 w-full">
              <button
                type="button"
                className={ROOM_BACK_BTN}
                onClick={() => setSubView("dining")}
                aria-label="Kembali ke menu makanan"
              >
                ←
              </button>
              <h1 className={ROOM_MAIN_TITLE}>In-Room Dining</h1>
            </header>

            {/* White Bill Receipt Card */}
            <div className="bg-white rounded-[20px] p-[1.35rem] shadow-[0_4px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] mb-[1.15rem]">
              <div className="flex items-center gap-[0.4rem] text-[0.9rem] font-semibold text-[#14221e] mb-[1.15rem]">
                <span>📖 Antar ke kamar 208</span>
                <span className="text-[#5e726b] font-normal text-[0.82rem]">
                  · 30–40 menit*
                </span>
              </div>

              <div className="flex flex-col gap-3 mb-4">
                {diningItems
                  .filter((it) => it.quantity > 0)
                  .map((it) => (
                    <div
                      key={it.id}
                      className="flex justify-between text-[0.92rem] text-[#14221e]"
                    >
                      <span>
                        {it.quantity} × {it.title}
                      </span>
                      <span>{formatRupiah(it.price * it.quantity)}</span>
                    </div>
                  ))}
              </div>

              <hr className="border-0 border-t border-[#e2e8f0] mt-3 mx-0 mb-4" />

              <div className="flex flex-col gap-[0.6rem]">
                <div className="flex justify-between text-[0.9rem] text-[#14221e]">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[0.9rem] text-[#14221e]">
                  <span>Pajak (10%)</span>
                  <span>{formatRupiah(tax)}</span>
                </div>
                <div className="flex justify-between text-[0.9rem] text-[#14221e]">
                  <span>Layanan (5%)</span>
                  <span>{formatRupiah(serviceFee)}</span>
                </div>
                <div className="flex justify-between border-t border-[#e2e8f0] pt-[0.85rem] mt-1 text-[1.15rem] text-[#14221e]">
                  <strong className="font-bold">Total ilustratif</strong>
                  <strong className="text-[#185752] font-bold">
                    {formatRupiah(totalGrand)}
                  </strong>
                </div>
              </div>
            </div>

            {/* Notes & Allergy Box */}
            <div className="bg-transparent py-0 px-1 mb-5">
              <div className="flex justify-between items-center mb-[0.35rem]">
                <span className="text-[0.92rem] font-semibold text-[#14221e]">
                  Catatan & alergi
                </span>
                <button
                  type="button"
                  className="bg-transparent border-0 text-[#185752] font-semibold text-[0.88rem] cursor-pointer p-0"
                >
                  Tambah
                </button>
              </div>
              <p className="m-0 text-[0.8rem] text-[#5e726b] leading-[1.4]">
                Belum ada catatan · beri tahu staf jika memiliki alergi.
              </p>
            </div>

            {/* Confirmation Instruction Alert */}
            <div className="bg-[#dfede6] rounded-[14px] py-[0.85rem] px-4 flex gap-3 items-start mb-[1.35rem]">
              <div className="w-5 h-5 rounded-full border-[1.5px] border-[#185752] flex items-center justify-center text-[0.75rem] text-[#185752] shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h4 className="mt-0 mx-0 mb-1 text-[0.88rem] font-semibold text-[#123f3c]">
                  Konfirmasi diperlukan
                </h4>
                <p className="m-0 text-[0.75rem] text-[#385e57] leading-[1.45]">
                  Ucapkan "Konfirmasi pesanan", atau tahan target konfirmasi
                  selama 2 detik pada mode gestur. *Biaya dan waktu hanya
                  contoh; tidak ada tagihan nyata.
                </p>
              </div>
            </div>

            {/* Confirmation Action Buttons */}
            <div className="flex flex-col gap-3 pb-16">
              <button
                type="button"
                className="bg-[#185752] text-white border-0 rounded-[14px] p-[0.95rem] text-[0.98rem] font-semibold cursor-pointer shadow-[0_4px_14px_rgba(24,87,82,0.25)] transition-[transform,background-color] duration-200 ease-in-out w-full hover:bg-[#123f3c] hover:-translate-y-0.5"
                onClick={() => handleConfirmOrder("dining")}
              >
                ✓ Konfirmasi pesanan · {formatRupiah(totalGrand)}
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={BTN_ACTION_OUTLINE}
                  onClick={() => setSubView("dining")}
                >
                  Ubah pesanan
                </button>
                <button
                  type="button"
                  className={BTN_ACTION_OUTLINE}
                  onClick={() => setSubView("selection")}
                >
                  Batalkan pesanan
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ====================================================================
            VIEW 4: Housekeeping & Amenities Catalog
            ==================================================================== */}
        {subView === "housekeeping" && (
          <section className="flex flex-col w-full animate-pane-fade-in">
            <header className="flex items-center gap-[0.85rem] mb-5 w-full">
              <button
                type="button"
                className={ROOM_BACK_BTN}
                onClick={() => setSubView("selection")}
                aria-label="Kembali ke pilihan service"
              >
                ←
              </button>
              <h1 className={ROOM_MAIN_TITLE}>Housekeeping & Amenities</h1>
            </header>

            {/* Hero Banner */}
            <div className="w-full h-36.25 rounded-[18px] overflow-hidden mb-[1.15rem] shadow-[0_4px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] bg-[#cbd5e1]">
              <img
                src={hkBanner}
                alt="Housekeeping Staff Service"
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Category Tabs */}
            <div
              className="flex gap-2 overflow-x-auto mb-5 pb-0.5 no-scrollbar"
              role="tablist"
            >
              {["Room Cleaning", "Amenities", "Laundry & Pick-up"].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    className={`rounded-[20px] py-[0.45rem] px-4 text-[0.8rem] font-medium whitespace-nowrap cursor-pointer transition-all duration-200 ease-in-out border ${
                      hkCategory === cat
                        ? "bg-[#185752] text-white border-[#185752] shadow-[0_2px_8px_rgba(24,87,82,0.25)]"
                        : "bg-white text-[#334155] border-black/6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                    }`}
                    onClick={() => setHkCategory(cat)}
                    aria-selected={hkCategory === cat}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>

            {/* Services List */}
            <div className="flex flex-col gap-[0.85rem] mb-6">
              {INITIAL_HK_SERVICES.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-[18px] p-[0.85rem] shadow-[0_4px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] flex items-center gap-4 cursor-pointer transition-[transform,box-shadow] duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)]"
                  onClick={() => setSubView("housekeeping-review")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setSubView("housekeeping-review")
                  }
                >
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-27.5 h-20 min-w-27.5 rounded-[14px] object-cover"
                  />
                  <div className="flex flex-col gap-[0.3rem]">
                    <h3 className="m-0 font-sans-system text-[1.05rem] font-semibold text-[#14221e]">
                      {srv.title}
                    </h3>
                    <p className="m-0 font-sans-system text-[0.78rem] text-[#5e726b] leading-[1.4]">
                      {srv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[0.65rem] mt-2 pb-4">
              <button
                type="button"
                className={BTN_PRIMARY_ACTION}
                onClick={() => setSubView("housekeeping-review")}
              >
                → Tinjau permintaan · 2 items
              </button>
            </div>
          </section>
        )}

        {/* ====================================================================
            VIEW 5: Housekeeping Review & Confirmation
            ==================================================================== */}
        {subView === "housekeeping-review" && (
          <section className="flex flex-col w-full animate-pane-fade-in">
            <header className="flex items-center gap-[0.85rem] mb-5 w-full">
              <button
                type="button"
                className={ROOM_BACK_BTN}
                onClick={() => setSubView("housekeeping")}
                aria-label="Kembali ke daftar housekeeping"
              >
                ←
              </button>
              <h1 className={ROOM_MAIN_TITLE}>Housekeeping & Amenities</h1>
            </header>

            {/* White Receipt Card */}
            <div className="bg-white rounded-[20px] p-[1.35rem] shadow-[0_4px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] mb-[1.15rem]">
              <div className="flex items-center gap-[0.4rem] text-[0.9rem] font-semibold text-[#14221e] mb-[1.15rem]">
                <span>📖 Antar ke kamar 208</span>
                <span className="text-[#5e726b] font-normal text-[0.82rem]">
                  · 30–40 menit*
                </span>
              </div>

              <div className="flex flex-col gap-3 mb-4">
                <div className="flex justify-between text-[0.92rem] text-[#14221e]">
                  <span>1 × Dental Kit</span>
                </div>
                <div className="flex justify-between text-[0.92rem] text-[#14221e]">
                  <span>1 × Extra Pillows</span>
                </div>
              </div>

              <hr className="border-0 border-t border-[#e2e8f0] mt-3 mx-0 mb-4" />

              <div className="flex justify-between border-t border-[#e2e8f0] pt-[0.85rem] mt-1 text-[1.15rem] text-[#14221e]">
                <strong className="font-bold">2 items</strong>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-transparent py-0 px-1 mb-5">
              <div className="flex justify-between items-center mb-[0.35rem]">
                <span className="text-[0.92rem] font-semibold text-[#14221e]">
                  Catatan & alergi
                </span>
                <button
                  type="button"
                  className="bg-transparent border-0 text-[#185752] font-semibold text-[0.88rem] cursor-pointer p-0"
                >
                  Tambah
                </button>
              </div>
              <p className="m-0 text-[0.8rem] text-[#5e726b] leading-[1.4]">
                Belum ada catatan · beri tahu staf jika memiliki alergi.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pb-16">
              <button
                type="button"
                className="bg-[#185752] text-white border-0 rounded-[14px] p-[0.95rem] text-[0.98rem] font-semibold cursor-pointer shadow-[0_4px_14px_rgba(24,87,82,0.25)] transition-[transform,background-color] duration-200 ease-in-out w-full hover:bg-[#123f3c] hover:-translate-y-0.5"
                onClick={() => handleConfirmOrder("housekeeping")}
              >
                ✓ Konfirmasi pesanan
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={BTN_ACTION_OUTLINE}
                  onClick={() => setSubView("housekeeping")}
                >
                  Ubah pesanan
                </button>
                <button
                  type="button"
                  className={BTN_ACTION_OUTLINE}
                  onClick={() => setSubView("selection")}
                >
                  Batalkan pesanan
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Feedback Toast Notification upon confirmation */}
        {confirmedMessage && (
          <div
            className="fixed bottom-[clamp(100px,14vh,125px)] left-1/2 -translate-x-1/2 z-999 bg-[#123f3c]/96 backdrop-blur-[10px] border border-white/20 text-white py-[0.95rem] px-[1.45rem] rounded-[30px] flex items-center gap-3 shadow-[0_12px_36px_rgba(0,0,0,0.35)] max-w-[min(90vw,420px)] w-auto pointer-events-none animate-toast-slide-up"
            role="alert"
          >
            <span className="bg-[#22c55e] text-white w-6 h-6 rounded-full flex items-center justify-center text-[0.85rem] font-bold shrink-0">
              ✓
            </span>
            <p className="m-0 text-[0.92rem] font-medium leading-[1.35]">
              {confirmedMessage}
            </p>
          </div>
        )}
      </div>

      {/* Bottom curved dark teal footer bar */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full h-21.25 z-5 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient
              id="roomFooterTeal"
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
            fill="url(#roomFooterTeal)"
          />
        </svg>
      </div>
    </main>
  );
}

export default RoomScreen;
