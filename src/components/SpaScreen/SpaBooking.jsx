import React, { useState } from "react";
import spaImage from "../../assets/gambar spa.png";

const TIMES = ["07.00", "08.00", "09.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00"];

const SPA_PRIMARY_CLASS =
  "w-full min-h-[58px] rounded-[12px] text-[1rem] font-bold cursor-pointer border-0 bg-[#1f746f] text-white shadow-[0_5px_13px_rgba(31,116,111,0.2)] hover:bg-[#175f5b]";
const SPA_SECONDARY_CLASS =
  "w-full min-h-[58px] rounded-[12px] text-[1rem] font-bold cursor-pointer border-0 bg-transparent text-[#1f746f]";
const SPA_CARD_CLASS =
  "bg-white border border-[rgba(24,87,82,0.08)] rounded-[20px] shadow-[0_5px_18px_rgba(18,63,60,0.07)]";
const SPA_BACK_CLASS =
  "border-0 bg-transparent text-[#15221e] text-[2.2rem] leading-none py-0 px-[0.25rem] cursor-pointer";

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
    <main className="relative w-screen h-dvh overflow-hidden bg-[#f8f9f6]" aria-label="SPA Booking">
      <div className="absolute top-0 left-0 w-full h-[85px] z-[5] pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full block">
          <defs>
            <linearGradient id="spaHeaderTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#174f4c" />
              <stop offset="60%" stopColor="#1a615d" />
              <stop offset="100%" stopColor="#1f746f" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 1000 0 L 1000 88 Q 500 58 0 88 Z" fill="url(#spaHeaderTeal)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="mt-[-16px] text-white font-georgia text-[clamp(1.25rem,4vw,1.7rem)] tracking-[0.05em]">
            GESTURA
          </span>
        </div>
      </div>

      <div className="relative z-[2] max-w-[480px] h-full mx-auto pt-[5.4rem] px-[1.25rem] pb-[5.2rem] box-border overflow-y-auto no-scrollbar max-h-short:pt-[4.8rem]">
        {step === "booking" && (
          <section className="flex flex-col min-h-full animate-spa-fade motion-reduce:animate-none">
            <header className="flex items-center gap-[0.7rem] mb-[1.15rem]">
              <button type="button" className={SPA_BACK_CLASS} onClick={onBack} aria-label="Kembali ke menu utama">
                ←
              </button>
              <h1 className="m-0 font-georgia text-[clamp(1.55rem,5vw,1.9rem)] font-medium text-[#15221e]">
                SPA booking
              </h1>
            </header>

            <article
              className={`${SPA_CARD_CLASS} relative min-h-[430px] mb-[1rem] flex flex-col items-center justify-start text-center pt-[3.25rem] px-[1rem] pb-[1.5rem] box-border max-h-short:min-h-[390px] max-h-short:pt-[2.2rem]`}
            >
              <div className="w-[220px] h-[210px] flex items-center justify-center mb-[1.1rem]">
                <img
                  src={spaImage}
                  alt="Perawatan Pijat Bali"
                  className="w-full h-full object-cover object-center rounded-[6px]"
                />
              </div>
              <h2 className="mt-0 mx-0 mb-[0.55rem] text-[#1b4845] text-[1.35rem] font-bold">
                Pijat Bali
              </h2>
              <p className="mt-0 mx-0 mb-[0.65rem] text-[#71827c]">60 menit · 1 tamu</p>
              <strong className="text-[#1b7771] text-[1.18rem] font-bold">{formatRupiah(price)}</strong>
            </article>

            <button
              type="button"
              className="w-full min-h-[94px] border border-[rgba(24,87,82,0.12)] rounded-[18px] bg-white py-[0.9rem] px-[1.15rem] flex items-center justify-between text-[#15221e] cursor-pointer box-border"
              onClick={() => setStep("time")}
              aria-label="Pilih tanggal dan waktu reservasi"
            >
              <span className="flex items-center gap-[0.65rem]">
                <span className="text-[#1d8b83]" aria-hidden="true">▣</span>
                <span className="flex flex-col gap-[0.35rem]">
                  <strong className="font-bold">{formatDate(selectedDate)}</strong>
                  <small className="text-[#71827c] text-left">Pilih waktu mulai</small>
                </span>
              </span>
              <span className="text-[#25877f] font-bold">Edit</span>
            </button>

            <div className="mt-[1.15rem] flex flex-col gap-[0.7rem]">
              <button type="button" className={SPA_PRIMARY_CLASS} onClick={() => setStep("summary")}>
                → Tinjau reservasi
              </button>
              <button type="button" className={SPA_SECONDARY_CLASS} onClick={onBack}>
                Batal · kembali ke menu
              </button>
            </div>
          </section>
        )}

        {step === "time" && (
          <section className="flex flex-col min-h-full animate-spa-fade motion-reduce:animate-none">
            <header className="flex items-center gap-[0.7rem] mb-[0.2rem]">
              <button type="button" className={SPA_BACK_CLASS} onClick={() => setStep("booking")} aria-label="Kembali ke detail SPA">
                ←
              </button>
            </header>

            <h1 className="mt-[1.25rem] mx-0 mb-[1.1rem] text-[#15221e] font-georgia text-[clamp(1.55rem,5vw,2rem)] text-center font-medium">
              Luangkan waktu untuk pulih
            </h1>

            <div className={`${SPA_CARD_CLASS} pt-[1.1rem] px-[1.15rem] pb-[1.25rem]`}>
              <div className="flex justify-between items-center">
                <label htmlFor="spa-time-date" className="flex items-center gap-[0.55rem] min-w-0">
                  <span className="text-[#1d8b83] font-bold">▣</span>
                  <input
                    id="spa-time-date"
                    type="date"
                    className="spa-date-input max-w-[170px] border-0 outline-none bg-transparent text-[#1b4845] font-[inherit] font-bold cursor-pointer"
                    value={selectedDate}
                    min="2026-10-21"
                    onChange={(event) => setSelectedDate(event.target.value)}
                    aria-label="Tanggal reservasi SPA"
                  />
                </label>
                <button
                  type="button"
                  className="shrink-0 cursor-pointer"
                  onClick={() => setStep("booking")}
                >
                  Ubah layanan
                </button>
              </div>
              <p className="text-[#71827c] mt-[0.75rem] mx-0 mb-[1rem]">Pilih waktu mulai</p>

              <div className="grid grid-cols-3 gap-[0.7rem]">
                {TIMES.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`min-h-[58px] border-0 rounded-[12px] text-[1rem] font-bold cursor-pointer ${
                      selectedTime === time
                        ? "bg-[#1f746f] text-white shadow-[0_4px_10px_rgba(31,116,111,0.18)]"
                        : "bg-[#f1f5f2] text-[#1b4845]"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`${SPA_PRIMARY_CLASS} mt-[1.25rem]`}
              onClick={() => setStep("summary")}
            >
              Simpan
            </button>
          </section>
        )}

        {step === "summary" && (
          <section className="flex flex-col min-h-full animate-spa-fade motion-reduce:animate-none">
            <header className="flex items-center gap-[0.7rem] mb-[1.15rem]">
              <button type="button" className={SPA_BACK_CLASS} onClick={() => setStep("booking")} aria-label="Kembali ke detail SPA">
                ←
              </button>
            </header>

            <h1 className="mt-[0.5rem] mx-0 mb-[1.1rem] text-[#15221e] font-georgia text-[clamp(1.55rem,5vw,2rem)] text-left font-medium">
              Konfirmasi
            </h1>
            <div className={`${SPA_CARD_CLASS} p-[1.25rem] mb-[1.25rem]`}>
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Perawatan</span>
                <b className="text-[#15221e] text-right font-bold">Pijat Bali · 60 menit</b>
              </div>
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Tanggal</span>
                <b className="text-[#15221e] text-right font-bold">{formatDate(selectedDate)}</b>
              </div>
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Waktu</span>
                <b className="text-[#15221e] text-right font-bold">{selectedTime}–{getEndTime(selectedTime)}</b>
              </div>
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Tamu & lokasi</span>
                <b className="text-[#15221e] text-right font-bold">1 tamu · Spa lantai 1</b>
              </div>
              <hr className="border-0 border-t border-[#dfe7e3] my-[1rem]" />
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Harga perawatan</span>
                <b className="text-[#15221e] text-right font-bold">{formatRupiah(price)}</b>
              </div>
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Pajak (10%)</span>
                <b className="text-[#15221e] text-right font-bold">{formatRupiah(tax)}</b>
              </div>
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Layanan (5%)</span>
                <b className="text-[#15221e] text-right font-bold">{formatRupiah(serviceFee)}</b>
              </div>
              <div className="flex justify-between gap-[1rem] my-[0.65rem] border-t border-[#dfe7e3] pt-[0.9rem]">
                <span className="text-[#71827c]">Total ilustratif</span>
                <b className="text-[#1f746f] text-[1.15rem] text-right font-bold">{formatRupiah(total)}</b>
              </div>
            </div>

            <button type="button" className={`${SPA_PRIMARY_CLASS} mb-[0.5rem]`} onClick={() => setStep("confirmed")}>
              ✓ Konfirmasi reservasi
            </button>
            <button type="button" className={SPA_SECONDARY_CLASS} onClick={() => setStep("time")}>
              Ubah waktu
            </button>
          </section>
        )}

        {step === "confirmed" && (
          <section className="flex flex-col min-h-full items-center justify-center text-center pt-[0.25rem] pb-[1.5rem] animate-spa-fade motion-reduce:animate-none">
            <div className="w-[78px] h-[78px] rounded-full bg-[#1f746f] text-white flex items-center justify-center text-[2.2rem] mb-[1.35rem]">
              ✓
            </div>
            <small className="text-[#1f746f] font-bold">SIMULASI · SP-208-006</small>
            <h1 className="mt-[1.5rem] mx-0 mb-[0.8rem] text-[#163f3b] font-georgia text-[2rem] font-bold">
              Reservasi terkonfirmasi*
            </h1>

            <div className="w-full max-w-[430px] mt-0 mx-0 mb-[1.5rem] py-[1.1rem] px-[1.25rem] border border-[rgba(31,116,111,0.1)] rounded-[18px] bg-white shadow-[0_5px_18px_rgba(18,63,60,0.07)] text-left">
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Perawatan</span>
                <strong className="text-[#15221e] text-right font-bold">Pijat Bali · 60 menit</strong>
              </div>
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Tanggal</span>
                <strong className="text-[#15221e] text-right font-bold">{formatDate(selectedDate)}</strong>
              </div>
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Waktu</span>
                <strong className="text-[#15221e] text-right font-bold">{selectedTime}–{getEndTime(selectedTime)}</strong>
              </div>
              <div className="flex justify-between gap-[1rem] my-[0.65rem]">
                <span className="text-[#71827c]">Tamu & lokasi</span>
                <strong className="text-[#15221e] text-right font-bold">1 tamu · Spa lantai 1</strong>
              </div>
              <div className="flex justify-between gap-[1rem] mb-[0.65rem] border-t border-[#dfe7e3] mt-[0.9rem] pt-[0.9rem]">
                <span className="text-[#71827c]">Total ilustratif</span>
                <strong className="text-[#15221e] text-right font-bold">{formatRupiah(total)}</strong>
              </div>
            </div>

            <button type="button" className={`${SPA_PRIMARY_CLASS} max-w-[360px]`} onClick={onBack}>
              ⌂ Kembali ke menu utama
            </button>
          </section>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[85px] z-[5] pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full block">
          <path d="M 0 12 Q 500 42 1000 12 L 1000 100 L 0 100 Z" fill="#17544f" />
        </svg>
      </div>
    </main>
  );
}

export default SpaBooking;
