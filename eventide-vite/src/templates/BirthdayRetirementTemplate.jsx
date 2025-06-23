// src/templates/BirthdayRetirementTemplate.jsx
import React from "react";

export default function BirthdayRetirementTemplate({ eventData, guests = [] }) {
  const { title, date, location, templateId } = eventData;
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

  return (
    <div className="w-full bg-[#1a1a2e] text-white font-sans p-6 rounded-md shadow-lg max-w-2xl mx-auto">
      {/* Cabecera */}
      <div className="text-center space-y-2">
        <h1 className="text-teal-400 text-4xl font-extrabold uppercase">Enrique</h1>
        <h2 className="text-3xl font-bold">Cumple 60 y se jubila !!!</h2>
        <div className="h-[2px] w-20 bg-white mx-auto my-2"></div>
      </div>

      {/* Info del evento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm sm:text-base">
        <div className="text-center">
          <p className="uppercase text-gray-400">Viernes</p>
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
      <div className="mt-6 text-center italic text-green-400">
        <p>Si jalas confirma... y si zafas también</p>
        <p className="text-xs text-green-200">Envia tu respuesta por este medio (necesario para la logística)</p>
      </div>

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
      <div className="mt-6">
        <iframe
          className="w-full h-64 rounded"
          loading="lazy"
          src="https://www.google.com/maps?q=Salón+Patio+de+la+Virreina,+Naucalpan&output=embed"
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
          <p>📞 55 4010 0314 Sandra</p>
          <p>📞 55 3717 8828 Enrique</p>
        </div>
        <div className="text-right text-orange-500 font-bold uppercase text-xs">
          Vestimenta: Casual / Informal<br />
          No pants, no pijama, no jeans rotos
        </div>
      </div>
    </div>
  );
}
