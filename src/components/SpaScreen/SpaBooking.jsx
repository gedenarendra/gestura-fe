import React, { useState } from "react";
import spaImage from "../../assets/gambar spa.png";
import "./SpaBooking.css";

const TIMES = ["07.00", "08.00", "09.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00"];

function formatRupiah(value) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateValue}T12:00:00`));
}

function getEndTime(time) {
  const hour = Number(time.slice(0, 2)) + 1;
  return `${String(hour).padStart(2, "0")}.00`;
}

export function SpaBooking({ onBack }) {
  const [step, setStep] = useState("booking");
  const [selectedTime, setSelectedTime] = useState("14.00");
  const [selectedDate, setSelectedDate] = useState("2026-10-21");
  const price = 450000;
  const tax = Math.round(price * 0.1);
  const serviceFee = Math.round(price * 0.05);
  const total = price + tax + serviceFee;

  return (
    <main className="spa-screen" aria-label="SPA Booking">
      <div className="spa-top-bar" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="spa-bar-svg">
          <defs>
            <linearGradient id="spaHeaderTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#174f4c" />
              <stop offset="60%" stopColor="#1a615d" />
              <stop offset="100%" stopColor="#1f746f" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 1000 0 L 1000 88 Q 500 58 0 88 Z" fill="url(#spaHeaderTeal)" />
        </svg>
        <div className="spa-top-content">
          <span>GESTURA</span>
        </div>
      </div>

      <div className="spa-container">
        {step === "booking" && (
          <section className="spa-view animate-fade-in">
            <header className="spa-header">
              <button type="button" className="spa-back" onClick={onBack} aria-label="Kembali ke menu utama">←</button>
              <h1>SPA booking</h1>
            </header>

            <article className="spa-treatment-card">
              <div className="spa-treatment-image-wrap">
                <img src={spaImage} alt="Perawatan Pijat Bali" />
              </div>
              <h2>Pijat Bali</h2>
              <p>60 menit · 1 tamu</p>
              <strong>{formatRupiah(price)}</strong>
            </article>

            <button
              type="button"
              className="spa-date-card"
              onClick={() => setStep("time")}
              aria-label="Pilih tanggal dan waktu reservasi"
            >
              <span className="spa-date-main">
                <span className="spa-calendar-icon" aria-hidden="true">▣</span>
                <span>
                  <strong>{formatDate(selectedDate)}</strong>
                  <small>Pilih waktu mulai</small>
                </span>
              </span>
              <span className="spa-edit">Edit</span>
            </button>

            <div className="spa-actions">
              <button type="button" className="spa-primary" onClick={() => setStep("summary")}>→ Tinjau reservasi</button>
              <button type="button" className="spa-secondary" onClick={onBack}>Batal · kembali ke menu</button>
            </div>
          </section>
        )}

        {step === "time" && (
          <section className="spa-view animate-fade-in">
            <header className="spa-header spa-time-header">
              <button type="button" className="spa-back" onClick={() => setStep("booking")} aria-label="Kembali ke detail SPA">←</button>
            </header>

            <h1 className="spa-time-title">Luangkan waktu untuk pulih</h1>

            <div className="spa-time-card">
              <div className="spa-time-date">
                <label htmlFor="spa-time-date">
                  <span className="spa-calendar-icon">▣</span>
                  <input
                    id="spa-time-date"
                    type="date"
                    value={selectedDate}
                    min="2026-10-21"
                    onChange={(event) => setSelectedDate(event.target.value)}
                    aria-label="Tanggal reservasi SPA"
                  />
                </label>
                <button type="button" onClick={() => setStep("booking")}>Ubah layanan</button>
              </div>
              <p>Pilih waktu mulai</p>

              <div className="spa-time-grid">
                {TIMES.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`spa-time-slot ${selectedTime === time ? "selected" : ""}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" className="spa-primary spa-save" onClick={() => setStep("summary")}>Simpan</button>
          </section>
        )}

        {step === "summary" && (
          <section className="spa-view animate-fade-in">
            <header className="spa-header">
              <button type="button" className="spa-back" onClick={() => setStep("booking")} aria-label="Kembali ke detail SPA">←</button>
            </header>

            <h1 className="spa-summary-title">Konfirmasi</h1>
            <div className="spa-summary-card">
              <div><span>Perawatan</span><b>Pijat Bali · 60 menit</b></div>
              <div><span>Tanggal</span><b>{formatDate(selectedDate)}</b></div>
              <div><span>Waktu</span><b>{selectedTime}–{getEndTime(selectedTime)}</b></div>
              <div><span>Tamu & lokasi</span><b>1 tamu · Spa lantai 1</b></div>
              <hr />
              <div><span>Harga perawatan</span><b>{formatRupiah(price)}</b></div>
              <div><span>Pajak (10%)</span><b>{formatRupiah(tax)}</b></div>
              <div><span>Layanan (5%)</span><b>{formatRupiah(serviceFee)}</b></div>
              <div className="spa-summary-total"><span>Total ilustratif</span><b>{formatRupiah(total)}</b></div>
            </div>

            <button type="button" className="spa-primary" onClick={() => setStep("confirmed")}>✓ Konfirmasi reservasi</button>
            <button type="button" className="spa-secondary" onClick={() => setStep("time")}>Ubah waktu</button>
          </section>
        )}

        {step === "confirmed" && (
          <section className="spa-view spa-confirmed animate-fade-in">
            <div className="spa-check">✓</div>
            <small>SIMULASI · SP-208-006</small>
            <h1>Reservasi terkonfirmasi*</h1>

            <div className="spa-confirmation-card">
              <div>
                <span>Perawatan</span>
                <strong>Pijat Bali · 60 menit</strong>
              </div>
              <div>
                <span>Tanggal</span>
                <strong>{formatDate(selectedDate)}</strong>
              </div>
              <div>
                <span>Waktu</span>
                <strong>{selectedTime}–{getEndTime(selectedTime)}</strong>
              </div>
              <div>
                <span>Tamu & lokasi</span>
                <strong>1 tamu · Spa lantai 1</strong>
              </div>
              <div className="spa-confirmation-total">
                <span>Total ilustratif</span>
                <strong>{formatRupiah(total)}</strong>
              </div>
            </div>

            <button type="button" className="spa-primary" onClick={onBack}>⌂ Kembali ke menu utama</button>
          </section>
        )}
      </div>

      <div className="spa-bottom-bar" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="spa-bar-svg">
          <path d="M 0 12 Q 500 42 1000 12 L 1000 100 L 0 100 Z" fill="#17544f" />
        </svg>
      </div>
    </main>
  );
}

export default SpaBooking;
