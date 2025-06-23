import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createEvent } from "../services/eventsService"; // asegúrate de tenerlo bien importado

export default function EventForm() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    date: "",
    type: "",
    guestLimit: "",
    templateId: templateId || "",
    location: {
      ceremony: {
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        postalCode: ""
      },
      reception: {
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        postalCode: ""
      }
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const [section, field] = name.split(".").slice(1);
      setForm((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [section]: {
            ...prev.location[section],
            [field]: value
          }
        }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(form);
      alert("🎉 Evento creado correctamente");
      navigate("/dashboard");
    } catch (err) {
      alert("Hubo un error al crear el evento");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-primary mb-6">Información del Evento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Título del evento"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="type"
          placeholder="Tipo de evento (boda, cumpleaños...)"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="guestLimit"
          placeholder="Cantidad de invitados"
          value={form.guestLimit}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <h2 className="font-semibold mt-6">Ubicación ceremonia</h2>
        {["street", "number", "neighborhood", "city", "state", "postalCode"].map((field) => (
          <input
            key={field}
            type="text"
            name={`location.ceremony.${field}`}
            placeholder={`Ceremonia - ${field}`}
            value={form.location.ceremony[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ))}

        <h2 className="font-semibold mt-6">Ubicación recepción</h2>
        {["street", "number", "neighborhood", "city", "state", "postalCode"].map((field) => (
          <input
            key={field}
            type="text"
            name={`location.reception.${field}`}
            placeholder={`Recepción - ${field}`}
            value={form.location.reception[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ))}

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Guardar evento
        </button>
      </form>
    </div>
  );
}
