import React, { useState } from "react";
import roomDiningCard from "../../assets/gambar orang makan.png";
import roomHkCard from "../../assets/gambar orang spa.png";
import diningBanner from "../../assets/dining-banner.jpg";
import hkBanner from "../../assets/housekeeping-banner.jpg";
import foodNasiGoreng from "../../assets/food-nasi-goreng.jpg";
import foodJusJeruk from "../../assets/food-jus-jeruk.jpg";
import serviceMakeupRoom from "../../assets/service-makeup-room.jpg";
import serviceFreshTowels from "../../assets/service-fresh-towels.jpg";
import "./RoomScreen.css";

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
    <main className="room-screen" aria-label="Room Service & Amenities Screen">
      {/* Top curved dark teal header with GESTURA branding */}
      <div className="room-top-bar" aria-hidden="true">
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="room-bar-svg"
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
      <div className="room-container">
        {/* ====================================================================
            VIEW 1: Service Selection (In-Room Dining vs Housekeeping)
            ==================================================================== */}
        {subView === "selection" && (
          <section className="room-view-pane view-selection animate-fadeIn">
            <header className="room-header-nav">
              <button
                type="button"
                className="room-back-btn"
                onClick={onBack}
                aria-label="Kembali ke menu utama"
              >
                ←
              </button>
              <div className="room-header-text">
                <h1 className="room-main-title">Room Service</h1>
                <p className="room-subtitle">Select service</p>
              </div>
            </header>

            <div className="service-choice-cards">
              {/* Card 1: In-Room Dining */}
              <button
                type="button"
                className="service-choice-card card-dining"
                onClick={() => setSubView("dining")}
              >
                <div className="service-card-photo-wrapper">
                  <img
                    src={roomDiningCard}
                    alt="In-Room Dining"
                    className="service-card-photo card-photo-dining"
                  />
                </div>
                <div className="service-card-label-box">
                  <h2 className="service-card-name">In-Room Dining</h2>
                </div>
              </button>

              {/* Card 2: Housekeeping & Amenities */}
              <button
                type="button"
                className="service-choice-card card-housekeeping"
                onClick={() => setSubView("housekeeping")}
              >
                <div className="service-card-photo-wrapper">
                  <img
                    src={roomHkCard}
                    alt="Housekeeping & Amenities"
                    className="service-card-photo card-photo-housekeeping"
                  />
                </div>
                <div className="service-card-label-box dark">
                  <h2 className="service-card-name light">
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
          <section className="room-view-pane view-dining animate-fadeIn">
            <header className="room-header-nav">
              <button
                type="button"
                className="room-back-btn"
                onClick={() => setSubView("selection")}
                aria-label="Kembali ke pilihan service"
              >
                ←
              </button>
              <h1 className="room-main-title">In-Room Dining</h1>
            </header>

            {/* Hero Banner Image */}
            <div className="room-hero-banner">
              <img
                src={diningBanner}
                alt="In-Room Dining Feast"
                className="room-hero-img"
              />
            </div>

            {/* Category Tabs */}
            <div className="room-category-tabs" role="tablist">
              {["Morning Energize", "Local Signatures", "Western Classics"].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    className={`category-pill ${diningCategory === cat ? "active" : ""}`}
                    onClick={() => setDiningCategory(cat)}
                    aria-selected={diningCategory === cat}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>

            {/* Menu Items List */}
            <div className="room-items-list">
              {diningItems.map((item) => (
                <div key={item.id} className="room-menu-card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="room-menu-thumb"
                  />
                  <div className="room-menu-details">
                    <h3 className="room-menu-name">{item.title}</h3>
                    <p className="room-menu-desc">{item.description}</p>
                    <span className="room-menu-price">
                      {formatRupiah(item.price)}
                    </span>
                  </div>
                  <div className="room-menu-stepper">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Kurangi ${item.title}`}
                    >
                      –
                    </button>
                    <span className="stepper-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="stepper-btn"
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
            <div className="dining-checkout-footer">
              <div className="checkout-summary-row">
                <span className="checkout-info">
                  {totalItemCount} item · antar ke kamar 208
                </span>
                <span className="checkout-total">{formatRupiah(subtotal)}</span>
              </div>
              <button
                type="button"
                className="btn-primary-action"
                onClick={() => setSubView("dining-review")}
                disabled={totalItemCount === 0}
              >
                → Tinjau pesanan · {totalItemCount} item
              </button>
              <button
                type="button"
                className="btn-secondary-action"
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
          <section className="room-view-pane view-review animate-fadeIn">
            <header className="room-header-nav">
              <button
                type="button"
                className="room-back-btn"
                onClick={() => setSubView("dining")}
                aria-label="Kembali ke menu makanan"
              >
                ←
              </button>
              <h1 className="room-main-title">In-Room Dining</h1>
            </header>

            {/* White Bill Receipt Card */}
            <div className="receipt-card">
              <div className="receipt-delivery-header">
                <span className="receipt-room-tag">📖 Antar ke kamar 208</span>
                <span className="receipt-time-tag">· 30–40 menit*</span>
              </div>

              <div className="receipt-lines-list">
                {diningItems
                  .filter((it) => it.quantity > 0)
                  .map((it) => (
                    <div key={it.id} className="receipt-line">
                      <span>
                        {it.quantity} × {it.title}
                      </span>
                      <span>{formatRupiah(it.price * it.quantity)}</span>
                    </div>
                  ))}
              </div>

              <hr className="receipt-divider" />

              <div className="receipt-pricing-breakdown">
                <div className="pricing-row">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="pricing-row">
                  <span>Pajak (10%)</span>
                  <span>{formatRupiah(tax)}</span>
                </div>
                <div className="pricing-row">
                  <span>Layanan (5%)</span>
                  <span>{formatRupiah(serviceFee)}</span>
                </div>
                <div className="pricing-row total-row">
                  <strong>Total ilustratif</strong>
                  <strong className="grand-price">
                    {formatRupiah(totalGrand)}
                  </strong>
                </div>
              </div>
            </div>

            {/* Notes & Allergy Box */}
            <div className="allergy-notes-card">
              <div className="allergy-header-row">
                <span className="allergy-label">Catatan & alergi</span>
                <button type="button" className="allergy-add-btn">
                  Tambah
                </button>
              </div>
              <p className="allergy-desc">
                Belum ada catatan · beri tahu staf jika memiliki alergi.
              </p>
            </div>

            {/* Confirmation Instruction Alert */}
            <div className="confirmation-instruction-alert">
              <div className="instruction-icon-col">✓</div>
              <div className="instruction-text-col">
                <h4 className="instruction-title">Konfirmasi diperlukan</h4>
                <p className="instruction-desc">
                  Ucapkan "Konfirmasi pesanan", atau tahan target konfirmasi
                  selama 2 detik pada mode gestur. *Biaya dan waktu hanya
                  contoh; tidak ada tagihan nyata.
                </p>
              </div>
            </div>

            {/* Confirmation Action Buttons */}
            <div className="review-action-buttons">
              <button
                type="button"
                className="btn-confirm-primary"
                onClick={() => handleConfirmOrder("dining")}
              >
                ✓ Konfirmasi pesanan · {formatRupiah(totalGrand)}
              </button>
              <div className="review-action-duo">
                <button
                  type="button"
                  className="btn-action-outline"
                  onClick={() => setSubView("dining")}
                >
                  Ubah pesanan
                </button>
                <button
                  type="button"
                  className="btn-action-outline"
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
          <section className="room-view-pane view-housekeeping animate-fadeIn">
            <header className="room-header-nav">
              <button
                type="button"
                className="room-back-btn"
                onClick={() => setSubView("selection")}
                aria-label="Kembali ke pilihan service"
              >
                ←
              </button>
              <h1 className="room-main-title">Housekeeping & Amenities</h1>
            </header>

            {/* Hero Banner */}
            <div className="room-hero-banner">
              <img
                src={hkBanner}
                alt="Housekeeping Staff Service"
                className="room-hero-img"
              />
            </div>

            {/* Category Tabs */}
            <div className="room-category-tabs" role="tablist">
              {["Room Cleaning", "Amenities", "Laundry & Pick-up"].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    className={`category-pill ${hkCategory === cat ? "active" : ""}`}
                    onClick={() => setHkCategory(cat)}
                    aria-selected={hkCategory === cat}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>

            {/* Services List */}
            <div className="room-items-list hk-items-list">
              {INITIAL_HK_SERVICES.map((srv) => (
                <div
                  key={srv.id}
                  className="hk-service-card"
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
                    className="hk-service-thumb"
                  />
                  <div className="hk-service-details">
                    <h3 className="hk-service-title">{srv.title}</h3>
                    <p className="hk-service-desc">{srv.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hk-bottom-action">
              <button
                type="button"
                className="btn-primary-action"
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
          <section className="room-view-pane view-hk-review animate-fadeIn">
            <header className="room-header-nav">
              <button
                type="button"
                className="room-back-btn"
                onClick={() => setSubView("housekeeping")}
                aria-label="Kembali ke daftar housekeeping"
              >
                ←
              </button>
              <h1 className="room-main-title">Housekeeping & Amenities</h1>
            </header>

            {/* White Receipt Card */}
            <div className="receipt-card">
              <div className="receipt-delivery-header">
                <span className="receipt-room-tag">📖 Antar ke kamar 208</span>
                <span className="receipt-time-tag">· 30–40 menit*</span>
              </div>

              <div className="receipt-lines-list">
                <div className="receipt-line">
                  <span>1 × Dental Kit</span>
                </div>
                <div className="receipt-line">
                  <span>1 × Extra Pillows</span>
                </div>
              </div>

              <hr className="receipt-divider" />

              <div className="pricing-row total-row">
                <strong>2 items</strong>
              </div>
            </div>

            {/* Notes Section */}
            <div className="allergy-notes-card">
              <div className="allergy-header-row">
                <span className="allergy-label">Catatan & alergi</span>
                <button type="button" className="allergy-add-btn">
                  Tambah
                </button>
              </div>
              <p className="allergy-desc">
                Belum ada catatan · beri tahu staf jika memiliki alergi.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="review-action-buttons">
              <button
                type="button"
                className="btn-confirm-primary"
                onClick={() => handleConfirmOrder("housekeeping")}
              >
                ✓ Konfirmasi pesanan
              </button>
              <div className="review-action-duo">
                <button
                  type="button"
                  className="btn-action-outline"
                  onClick={() => setSubView("housekeeping")}
                >
                  Ubah pesanan
                </button>
                <button
                  type="button"
                  className="btn-action-outline"
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
          <div className="room-toast-notification animate-slideUp" role="alert">
            <span className="toast-icon">✓</span>
            <p className="toast-text">{confirmedMessage}</p>
          </div>
        )}
      </div>

      {/* Bottom curved dark teal footer bar */}
      <div className="room-bottom-bar" aria-hidden="true">
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="room-bar-svg"
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
