// src/templates/BirthdayRetirementTemplate.jsx
import { Description } from "@headlessui/react";
import React, { useState } from "react";

export default function BirthdayRetirementTemplate({ eventData, guests = [], isPreview = false, onConfirm }) {
  const { title, date, location, hosts = [],description } = eventData;
  const { ceremony } = location || {};

  const formattedDate = new Date(date).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const time = new Date(date).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const weekday = new Date(date).toLocaleDateString("es-MX", { 
    weekday: "long" }).replace(/^\w/, c => c.toUpperCase());

  const [confirmMode, setConfirmMode] = useState(false);

  return (
    <div className="relative w-full bg-[#313248] text-white p-6 rounded-md shadow-lg max-w-2xl mx-auto bg-cover bg-center" >
      {/* Fondo con opacidad */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-[-1]"
        style={{ backgroundImage: "url('/images/confeti1.png')" }}
      ></div>
      {/* Elementos decorativos */}
      <img src="/images/copas.png" className="absolute top-4 left-4 w-10 opacity-70" alt="Copas" />
      <img src="/images/copas.png" className="absolute top-4 right-4 w-10 opacity-70" alt="Confeti" />

      {/* Cabecera */}
      <div className="text-center space-y-2">
        <h1 className="text-teal-400 text-5xl uppercase font-bold font-marker">{title}</h1>
        <h2 className="text-4xl text-white font-marker ">{description}</h2>
        <div className="h-[2px] w-50 bg-white mx-auto my-2"></div>
      </div>

      {/* Info del evento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm sm:text-base">
        <div className="text-center">
          <p className="uppercase text-gray-400">{weekday}</p>
          <p>{formattedDate}</p>
          <p>{time}</p>
        </div>
        <div className="text-center">
          <p className="uppercase text-gray-400">Salón</p>
          <p className="font-bold">{ceremony?.street} {ceremony?.number}</p>
          <p>{ceremony?.neighborhood}, {ceremony?.city}, {ceremony?.state}</p>
        </div>
      </div>

      {/* Confirmación */}
      <div className="mt-5 text-center text-green-400 from-neutral-200">
        <p className="text-2xl italic font-marker">Si jalas confirma... y si zafas también</p>
        <p className="text-sm font-sans text-green-300">Envia tu respuesta por este medio (Importante para la logística)</p>
      </div>

      {!confirmMode ? (
        <>
          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-sm px-4 py-1 rounded text-white transition"
                onClick={() => alert("🥂Asombroso 🎉.Confirmación enviada✨")}
              >
                Confirmar
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-sm px-4 py-1 rounded text-white"
                onClick={() => alert("💔Tú te lo pierdes👎. Rechazó enviado❌")}
              >
                Rechazar
              </button>
            </div>
            <div className="mt-2 text-center">
              <button
                onClick={() => setConfirmMode(true)}
                className="text-sm text-blue-300 underline hover:text-blue-200"
              >
                Confirmar invitados por separado
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 text-center">
            <p className="text-white font-semibold mb-2">Selecciona asistentes confirmados:</p>
            {guests.map((g, i) => (
              <div key={i} className="flex items-center justify-center gap-2 mb-1">
                <input type="checkbox" id={`g${i}`} className="accent-green-500" />
                <label htmlFor={`g${i}`} className="text-white">{g}</label>
              </div>
            ))}
            <button
              onClick={() => alert("Confirmación personalizada enviada")}
              className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white"
            >
              Confirmar seleccionados
            </button>

            <div className="mt-2">
              <button
                onClick={() => setConfirmMode(false)}
                className="text-sm text-blue-300 underline hover:text-blue-200"
              >
                Volver
              </button>
            </div>
          </div>
        </>
      )}

      {/* Regalos y boleto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
        <div>
          <p className="text-pink-400 font-bold">Mesa de regalos:</p>
          <ul className="list-disc list-inside">
            <li>PH / Liverpool / La Europea</li>
            <li>San Pablo / Chedraui</li>
            <li>Amazon / Home Depot</li>
            <li>Efectivo / Abrazos</li>
          </ul>
        </div>
        <div>
          <p className="text-white font-bold">Boleto exclusivo para:</p>
          <ul className="list-disc list-inside text-purple-300">
            {guests.map((guest, index) => (
              <li key={index}>@{guest}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mapa */}
      <div className="relative z-10 mt-6">
        <iframe
          className="w-full h-64 rounded"
          loading="lazy"
          src={`https://www.google.com/maps?q=${encodeURIComponent(`${ceremony?.street} ${ceremony?.number}, ${ceremony?.neighborhood}, ${ceremony?.city}`)}&output=embed`}
        ></iframe>
      </div>

      {/* Extras */}
      <div className="mt-6 text-center text-white">
        <p className="text-lg font-bold">¡NO FALTES!</p>
        <p className="text-cyan-400 italic">Tú eres parte especial en este festejo</p>
      </div>

      {/* Contacto y código de vestimenta */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 text-sm bg-yellow-100 text-black p-4 rounded">
        <div>
          <p>Informes y Quejas:</p>
          {hosts.map((host, i) => (
            <p key={i}>📞 {host.contactInfo?.phone} {host.name}</p>
          ))}
        </div>
        <div className="relative z-10 text-right text-orange-500 font-bold uppercase text-xs">
          Vestimenta: Casual / Informal<br />
          No pants, no pijama, no jeans rotos
        </div>
      </div>
    </div>
  );
}
