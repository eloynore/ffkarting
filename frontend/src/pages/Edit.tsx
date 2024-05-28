import React from "react";
import { useAuthProvider } from "../context/AuthProvider";
import RaceForm from "../components/forms/Race";
import TeamForm from "../components/forms/Team";
import DriverForm from "../components/forms/Driver";
import ParticipantForm from "../components/forms/Participant";
import IncidentForm from "../components/forms/Incident";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormInfo } from "../helper/models";

export function Edit() {
  const { getAuth } = useAuthProvider();
  const navigate = useNavigate();
  const currentAuth = getAuth();
  const { t } = useTranslation();
  // we are using search params to determine what element we are going to edit
  let [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const formInfo: FormInfo = {
    isEdit: true,
  };
  if (id) {
    formInfo.id = Number(id);
  }

  if (!currentAuth.token) {
    navigate("/login");
  }
  return (
    <div className="min-h-screen text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-40 p-8 flex  w-full flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
        Edit {type}
      </h1>
      <div className="w-full max-w-[1280px]">
        {type === "race" ? <RaceForm {...formInfo} /> : <></>}
        {type === "team" ? <TeamForm /> : <></>}
        {type === "driver" ? <DriverForm /> : <></>}
        {type === "participation" ? <ParticipantForm /> : <></>}
        {type === "incident" ? <IncidentForm /> : <></>}
      </div>
    </div>
  );
}
