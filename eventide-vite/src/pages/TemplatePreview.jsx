// src/pages/TemplatePreview.jsx
import BirthdayRetirementTemplate from "../templates/BirthdayRetirementTemplate";

export default function TemplatePreview() {
  const mockEvent = {
    title: "Cumple y Jubilación",
    date: "2025-07-18T20:00:00",
    templateId: "birthday_retirement_001",
    location: {
      ceremony: {
        street: "BLVD MANUEL ÁVILA CAMACHO",
        number: "1475-B",
        neighborhood: "La Florida",
        city: "Naucalpan",
        state: "Edomex",
        postalCode: "53160"
      }
    }
  };

  const mockGuests = [
    "Joel Valencia",
    "Enrique Valencia",
    "Samantha de Casia",
    "Sandra González",
    "Enrique J Valencia"
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <BirthdayRetirementTemplate eventData={mockEvent} guests={mockGuests} />
    </div>
  );
}
