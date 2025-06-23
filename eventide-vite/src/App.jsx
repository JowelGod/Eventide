import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import CreateEvent from "./pages/CreateEvent";
import EventForm from "./pages/EventForm";
import EventDetails from "./pages/EventDetails";
import GuestsManager from "./pages/GuestsManager";
import TemplatePreview from "./pages/TemplatePreview";
import GuestList from "./pages/GuestList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <div className="pt-20"> {/* margen superior para que no tape el header */}
        <Routes>
          <Route path="/preview" element={<TemplatePreview />} />          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute>
                <Dashboard /></ProtectedRoute>} />
          <Route path="/create-event" element={<ProtectedRoute>
                <CreateEvent /></ProtectedRoute>} />
          <Route path="/create-event/:templateId" element={<ProtectedRoute>
                <EventForm /></ProtectedRoute>} />
          <Route path="/evento/:id" element={<ProtectedRoute>
                <EventDetails /></ProtectedRoute>} />
          <Route path="/evento/:id/invitados" element={<ProtectedRoute>
                <GuestsManager /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
