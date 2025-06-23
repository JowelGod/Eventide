import { useNavigate } from "react-router-dom";
import { useState } from "react";

const templates = {
  boda: [
    { id: "boda1", name: "Plantilla Elegante", img: "/templates/boda1.png" },
    { id: "boda2", name: "Romántica Floral", img: "/templates/boda2.png" },
  ],
  cumple: [
    { id: "cumple1", name: "Cumpleaños Colorido", img: "/templates/cumple1.png" },
    { id: "cumple2", name: "Estilo Retro", img: "/templates/cumple2.png" },
  ],
};

export default function CreateEvent() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (template) => {
    setSelected(template);
    setTimeout(() => navigate(`/create-event/${template.id}`), 300); // simula animación
    };

  return (
    <div className="bg-white min-h-screen text-center px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-primary">Selecciona una plantilla</h1>

      {Object.entries(templates).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-semibold text-left mb-4 capitalize">{category}</h2>
          <div className="flex overflow-x-auto gap-4 scrollbar-hide">
            {items.map((tpl) => (
              <div
                key={tpl.id}
                className="min-w-[200px] cursor-pointer hover:scale-105 transition"
                onClick={() => handleSelect(tpl)}
              >
                <img
                  src={tpl.img}
                  alt={tpl.name}
                  className="rounded shadow-md w-full h-40 object-cover mb-2"
                />
                <p className="text-sm font-medium">{tpl.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
