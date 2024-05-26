// src/components/AddRaceParticipantForm.tsx
import React, { useState, useEffect } from "react";
import { createRaceParticipant, getDrivers, getRaces } from "../helper/api";

interface Driver {
  id: number;
  name: string;
}

interface Race {
  id: number;
  circuit: string;
}

interface RaceParticipant {
  driver: number;
  race: number;
  points: number;
  position: number;
  lapTime?: string;
  qualifyLapTime?: string;
  trainLapTime?: string;
  fastLap: boolean;
  theFasto: boolean;
  grandChelem: boolean;
  videoURL?: string;
}

export default function AddRaceParticipantForm() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState<RaceParticipant>({
    driver: 0,
    race: 0,
    points: 0,
    position: 0,
    fastLap: false,
    theFasto: false,
    grandChelem: false,
  });

  useEffect(() => {
    setErrMsg("");
    setSuccessMessage("");
  }, [formData]);

  useEffect(() => {
    const fetchData = async () => {
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
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.videoURL) {
        delete formData.videoURL;
      }
      await createRaceParticipant(formData);
      setFormData({
        driver: 0,
        race: 0,
        points: 0,
        position: 0,
        fastLap: false,
        theFasto: false,
        grandChelem: false,
        videoURL: "",
      });
      setSuccessMessage("Participation added");
    } catch (error) {
      setErrMsg("Invalid data fix the form");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md text-gray-700 dark:bg-gray-800 dark:text-white"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Participant</h2>
      <div className="mb-4">
        <label htmlFor="driver" className="block ">
          Driver:
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
        <label htmlFor="race" className="block ">
          Race:
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
        <label htmlFor="points" className="block ">
          Points:
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
        <label htmlFor="position" className="block ">
          Position:
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
      <div className="mb-4">
        <label htmlFor="lapTime" className="block ">
          Lap Time:
        </label>
        <input
          type="text"
          name="lapTime"
          value={formData.lapTime}
          onChange={handleChange}
          className="border p-2 rounded w-full dark:bg-gray-800"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="qualifyLapTime" className="block ">
          Qualify Lap Time:
        </label>
        <input
          type="text"
          name="qualifyLapTime"
          value={formData.qualifyLapTime}
          onChange={handleChange}
          className="border p-2 rounded w-full dark:bg-gray-800"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="trainLapTime" className="block ">
          Train Lap Time:
        </label>
        <input
          type="text"
          name="trainLapTime"
          value={formData.trainLapTime}
          onChange={handleChange}
          className="border p-2 rounded w-full dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fastLap" className="block ">
          Fast Lap:
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
        <label htmlFor="theFasto" className="block ">
          The Fasto:
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
        <label htmlFor="grandChelem" className="block ">
          Grand Chelem:
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
        <label htmlFor="videoURL" className="block ">
          Video URL:
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
        className="w-full bg-green-500 text-white py-2 rounded-lg"
      >
        Add Participant
      </button>
      <p className={errMsg ? "text-red-500 mb-4" : "hidden"}>{errMsg}</p>
      <p className={successMessage ? "text-green-500 mb-4" : "hidden"}>
        {successMessage}
      </p>
    </form>
  );
}
