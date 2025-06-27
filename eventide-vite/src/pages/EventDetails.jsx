// src/pages/EventDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, deleteEvent } from "../services/eventsService";


export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const evt = await getEventById(id);
        setEvent(evt);
      } catch (err) {
        setError("No se pudo cargar el evento");
      } finally {
        setLoading(false);
      }

    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      try {
        await deleteEvent(id);
        navigate("/dashboard");
      } catch (err) {
        alert("Error al eliminar el evento");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando evento...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-4">
        <button
          onClick={() => navigate(`/dashboard`)}
          className="text-blue-600 hover:underline flex items-center"
        >
          ← Volver al dashboard
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-4">Tipo: {event.type} | Fecha: {event.date}</p>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Ubicación - Ceremonia</h2>
        <p className="text-sm text-gray-700">
          {event.location?.ceremony?.street}, {event.location?.ceremony?.number}, {event.location?.ceremony?.neighborhood},
          {event.location?.ceremony?.city}, {event.location?.ceremony?.state}, CP {event.location?.ceremony?.postalCode}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Ubicación - Recepción</h2>
        <p className="text-sm text-gray-700">
          {event.location?.reception?.street}, {event.location?.reception?.number}, {event.location?.reception?.neighborhood},
          {event.location?.reception?.city}, {event.location?.reception?.state}, CP {event.location?.reception?.postalCode}
        </p>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={() => navigate(`/evento/${event.id}/edit`)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Editar evento
        </button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Eliminar evento
        </button>
        <button onClick={() => navigate(`/evento/${id}/invitados`)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Gestionar invitados
        </button>
      </div>
    </div>
  );
}
