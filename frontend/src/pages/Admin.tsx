import React from "react";
import { useAuthProvider } from "../context/AuthProvider";
import AddRaceForm from "../components/forms/AddRace";
import AddTeamForm from "../components/forms/AddTeam";
import AddDriverForm from "../components/forms/AddDriver";
import AddRaceParticipantForm from "../components/forms/AddRaceParticipant";
import AddRaceIncidentForm from "../components/forms/AddRaceIncident";
import { useNavigate } from "react-router-dom";

export function Admin() {
  const { getAuth } = useAuthProvider();
  const navigate = useNavigate();
  const currentAuth = getAuth();
  if (!currentAuth.token) {
    navigate("/login");
  }
  return (
    <div className="min-h-screen text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-40 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <AddRaceForm />
        <AddTeamForm />
        <AddDriverForm />
        <AddRaceParticipantForm />
        <AddRaceIncidentForm />
      </div>
    </div>
  );
}
