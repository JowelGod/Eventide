import { useState } from "react";
import { useParams } from "react-router-dom";
import { addGuestToEvent } from "../services/guestsService";

export default function GuestsManager() {
  const { id: eventId } = useParams();
  const [groupName, setGroupName] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [guests, setGuests] = useState([{ firstName: "", lastName: "" }]);
  const [loading, setLoading] = useState(false);

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...guests];
    updatedGuests[index][field] = value;
    setGuests(updatedGuests);
  };

  const addEmptyGuest = () => {
    setGuests([...guests, { firstName: "", lastName: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addGuestToEvent(eventId, {
        groupName,
        ticketCount: Number(ticketCount),
        guests,
      });
      alert("✅ Invitados agregados correctamente");
      setGroupName("");
      setTicketCount(1);
      setGuests([{ firstName: "", lastName: "" }]);
    } catch (error) {
      console.error(error);
      alert("❌ Hubo un error al guardar los invitados");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">➕ Agregar invitados</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del grupo o familia</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Número total de boletos</label>
          <input
            type="number"
            value={ticketCount}
            onChange={(e) => setTicketCount(e.target.value)}
            min={1}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Invitados individuales</label>
          {guests.map((guest, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Nombre(s)"
                value={guest.firstName}
                onChange={(e) => handleGuestChange(index, "firstName", e.target.value)}
                className="flex-1 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Apellido(s)"
                value={guest.lastName}
                onChange={(e) => handleGuestChange(index, "lastName", e.target.value)}
                className="flex-1 p-2 border rounded"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addEmptyGuest}
            className="text-sm text-blue-600 hover:underline"
          >
            ➕ Agregar otro invitado
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar invitados"}
        </button>
      </form>
    </div>
  );
}
