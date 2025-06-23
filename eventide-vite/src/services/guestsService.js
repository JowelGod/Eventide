// src/services/guestsService.js
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const addGuestToEvent = async (eventId, guestData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuario no autenticado");

    const timestamp = serverTimestamp();

    const newGuest = {
      eventId,                      // 🔹 Referencia explícita al evento
      groupName: guestData.groupName,
      ticketCount: guestData.ticketCount,
      guests: guestData.guests,    // 🔸 Lista de invitados con nombre/apellido
      confirmedCount: 0,           // Inicialmente nadie ha confirmado
      rejectedCount: 0,
      pendingCount: guestData.ticketCount,

      status: "pending",           // Estado general del grupo
      invitedBy: user.uid,         // UID del planner o cliente que lo creó
      createdAt: timestamp,
      updatedAt: timestamp
    };

    const docRef = await addDoc(collection(db, "guests"), newGuest);
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar invitado:", error);
    throw error;
  }
};
