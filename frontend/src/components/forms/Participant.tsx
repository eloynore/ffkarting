// src/components/AddRaceParticipantForm.tsx
import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import {
  createParticipant,
  getDrivers,
  getRaces,
  getParticipant,
  updateParticipant,
} from "../../helper/api";
// translation context
import { useTranslation } from "react-i18next";
import { FormInfo } from "../../helper/models";

interface Driver {
  id: number;
  name: string;
}

interface Race {
  id: number;
  circuit: string;
}

interface Participant {
  driver: number;
  race: number;
  points: number;
  position: number;
  lapTime?: string; // conditional field
  qualifyLapTime?: string; // conditional field
  trainLapTime?: string; // conditional field
  avgTime?: string; // conditional field
  qualifyAvgTime?: string; // conditional field
  trainAvgTime?: string; // conditional field
  fastLap: boolean;
  theFasto: boolean;
  grandChelem: boolean;
  videoURL?: string;
}

export default function ParticipantForm(context: Readonly<FormInfo>) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const { t } = useTranslation();
  const statusCodeSuccess = context.isEdit ? 200 : 201;
  const buttonText = context.isEdit
    ? t("editParticipant")
    : t("addParticipant");
  const errorMessage = context.isEdit
    ? t("errEditParticipant")
    : t("errAddParticipant");
  const successMessage = context.isEdit
    ? t("editedParticipant")
    : t("addedParticipant");
  const [errMsg, setErrMsg] = useState("");
  const [scsMessage, setScsMessage] = useState("");
  const [formData, setFormData] = useState<Participant>({
    driver: 0,
    race: 0,
    points: 0,
    position: 0,
    fastLap: false,
    theFasto: false,
    grandChelem: false,
  });

  // We need to update the message when the data changes
  useEffect(() => {
    setErrMsg("");
  }, [formData]);

  useEffect(() => {
    const fetchData = async () => {
      if (context.isEdit && context.id) {
        const currTeam = await getParticipant(context.id);
        currTeam.data.logo = null;
        setFormData(currTeam.data);
      }
      const drivers = await getDrivers();
      const races = await getRaces();
      setDrivers(drivers.data);
      setRaces(races.data);
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setScsMessage("");
  };

  // We need this extra function to catch the checkbox value
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
    setScsMessage("");
  };
  // Handle the form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.videoURL) {
        delete formData.videoURL;
      }
      let response: AxiosResponse;
      if (context.isEdit && context.id) {
        response = await updateParticipant(context.id, formData);
      } else {
        response = await createParticipant(formData);
        setFormData({
          driver: 0,
          race: 0,
          points: 0,
          position: 0,
          lapTime: "",
          qualifyLapTime: "",
          trainLapTime: "",
          avgTime: "",
          qualifyAvgTime: "",
          trainAvgTime: "",
          fastLap: false,
          theFasto: false,
          grandChelem: false,
          videoURL: "",
        });
      }
      if (response.status === statusCodeSuccess) {
        setScsMessage(successMessage);
      }
    } catch (error) {
      setErrMsg(errorMessage);
      setScsMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md text-gray-700 dark:bg-gray-800 dark:text-white"
    >
      {!context.isEdit ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {t("addNewParticipant")}
          </h2>
          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
        </>
      ) : (
        <></>
      )}
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="mb-4">
        <label
          htmlFor="driver"
          className="block dark:text-white font-bold mb-2"
        >
          {t("driver")}
        </label>
        <select
          name="driver"
          value={formData.driver}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        >
          <option value="">Select a driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="race" className="block dark:text-white font-bold mb-2">
          {t("race")}
        </label>
        <select
          name="race"
          value={formData.race}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        >
          <option value="">Select a race</option>
          {races.map((race) => (
            <option key={race.id} value={race.id}>
              {race.circuit}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="points"
          className="block dark:text-white font-bold mb-2"
        >
          {t("points")}
        </label>
        <input
          type="number"
          name="points"
          value={formData.points}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="position"
          className="block dark:text-white font-bold mb-2"
        >
          {t("position")}
        </label>
        <input
          type="number"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="border p-2 rounded w-full dark:bg-gray-800"
          required
        />
      </div>
      {/* Laptimes */}
      <details>
        <summary className="mb-4 dark:text-white font-bold">
          {t("lapTimes")}
        </summary>
        <div className="mb-4">
          <label
            htmlFor="lapTime"
            className="block dark:text-white font-bold mb-2"
          >
            Lap Time
          </label>
          <input
            title="Format: 00:00.0000"
            placeholder="00:00.0000"
            type="text"
            name="lapTime"
            pattern="[0-9]{2}:?[0-9]{2}.[0-9]{4}"
            value={formData.lapTime}
            onChange={handleChange}
            className="border p-2 rounded w-full dark:bg-gray-800"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="qualifyLapTime"
            className="block dark:text-white font-bold mb-2"
          >
            Qualify Lap Time
          </label>
          <input
            title="Format: 00:00.0000"
            placeholder="00:00.0000"
            type="text"
            name="qualifyLapTime"
            pattern="[0-9]{2}:?[0-9]{2}.[0-9]{4}"
            value={formData.qualifyLapTime}
            onChange={handleChange}
            className="border p-2 rounded w-full dark:bg-gray-800"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="trainLapTime"
            className="block dark:text-white font-bold mb-2"
          >
            Train Lap Time
          </label>
          <input
            title="Format: 00:00.0000"
            placeholder="00:00.0000"
            type="text"
            name="trainLapTime"
            pattern="[0-9]{2}:?[0-9]{2}.[0-9]{4}"
            value={formData.trainLapTime}
            onChange={handleChange}
            className="border p-2 rounded w-full dark:bg-gray-800"
          />
        </div>
      </details>

      {/* Average lap times */}
      <details>
        <summary className="mb-4 dark:text-white font-bold">
          Average lap times
        </summary>
        <div className="mb-4">
          <label
            htmlFor="avgTime"
            className="block dark:text-white font-bold mb-2"
          >
            Average Lap Time
          </label>
          <input
            title="Format: 00:00.0000"
            placeholder="00:00.0000"
            type="text"
            name="avgTime"
            pattern="[0-9]{2}:?[0-9]{2}.[0-9]{4}"
            value={formData.avgTime}
            onChange={handleChange}
            className="border p-2 rounded w-full dark:bg-gray-800"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="qualifyLapTime"
            className="block dark:text-white font-bold mb-2"
          >
            Average Qualify Lap Time
          </label>
          <input
            title="Format: 00:00.0000"
            placeholder="00:00.0000"
            type="text"
            name="qualifyAvgTime"
            pattern="[0-9]{2}:?[0-9]{2}.[0-9]{4}"
            value={formData.qualifyAvgTime}
            onChange={handleChange}
            className="border p-2 rounded w-full dark:bg-gray-800"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="trainLapTime"
            className="block dark:text-white font-bold mb-2"
          >
            Average Train Lap Time
          </label>
          <input
            title="Format: 00:00.0000"
            placeholder="00:00.0000"
            type="text"
            name="trainLapTime"
            pattern="[0-9]{2}:?[0-9]{2}.[0-9]{4}"
            value={formData.trainAvgTime}
            onChange={handleChange}
            className="border p-2 rounded w-full dark:bg-gray-800"
          />
        </div>
      </details>

      {/* Extra badge */}
      <div className="mb-4">
        <label
          htmlFor="fastLap"
          className="block dark:text-white font-bold mb-2"
        >
          Fast Lap
        </label>
        <input
          type="checkbox"
          name="fastLap"
          checked={formData.fastLap}
          onChange={handleCheckboxChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="theFasto"
          className="block dark:text-white font-bold mb-2"
        >
          The Fasto
        </label>
        <input
          type="checkbox"
          name="theFasto"
          checked={formData.theFasto}
          onChange={handleCheckboxChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="grandChelem"
          className="block dark:text-white font-bold mb-2"
        >
          Grand Chelem
        </label>
        <input
          type="checkbox"
          name="grandChelem"
          checked={formData.grandChelem}
          onChange={handleCheckboxChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="videoURL"
          className="block dark:text-white font-bold mb-2"
        >
          Video URL
        </label>
        <input
          type="url"
          name="videoURL"
          value={formData.videoURL}
          onChange={handleChange}
          className="border p-2 rounded w-full dark:bg-gray-800"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 font-bold dark:text-white py-2 rounded-lg"
      >
        {buttonText}
      </button>
      <p className={errMsg ? "text-red-500 mb-4" : "hidden"}>{errMsg}</p>
      <p className={scsMessage ? "text-green-500 mb-4" : "hidden"}>
        {scsMessage}
      </p>
    </form>
  );
}
