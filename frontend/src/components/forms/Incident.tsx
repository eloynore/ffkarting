// src/components/AddRaceIncidentForm.tsx
import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import {
  createIncident,
  getDrivers,
  getRaces,
  getIncident,
  updateIncident,
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

interface Incident {
  race: number;
  drivers: number[];
  description: string;
  videoURL?: string;
  resolution: string;
}

export default function IncidentForm(context: Readonly<FormInfo>) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState<Incident>({
    race: 0,
    drivers: [] as number[],
    description: "",
    resolution: "",
  });

  useEffect(() => {
    setErrMsg("");
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
    if (name === "drivers") {
      const selectedDrivers = Array.from(
        (e.target as HTMLSelectElement).selectedOptions,
        (option) => parseInt(option.value)
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedDrivers,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.videoURL) {
        delete formData.videoURL;
      }
      const response = await createIncident(formData);
      setFormData({
        race: 0,
        drivers: [],
        description: "",
        resolution: "",
        videoURL: "",
      });
      if (response.status === 201) {
        setSuccessMessage("Incident added");
      }
    } catch (error) {
      setErrMsg("Invalid data fix the form");
      setSuccessMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md text-gray-700 dark:bg-gray-800 dark:text-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add Race Incident</h2>
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="mb-4">
        <label htmlFor="race" className="block dark:text-white font-bold mb-2">
          Race
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
          htmlFor="drivers"
          className="block dark:text-white font-bold mb-2"
        >
          Drivers
        </label>
        <select
          name="drivers"
          multiple
          value={formData.drivers.map(String)}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        >
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block dark:text-white font-bold mb-2"
        >
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
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
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="resolution"
          className="block dark:text-white font-bold mb-2"
        >
          Resolution
        </label>
        <textarea
          name="resolution"
          value={formData.resolution}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800
          "
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 font-bold dark:text-white py-2 rounded-lg"
      >
        Add Incident
      </button>
      <p className={errMsg ? "text-red-500 mb-4" : "hidden"}>{errMsg}</p>
      <p className={successMessage ? "text-green-500 mb-4" : "hidden"}>
        {successMessage}
      </p>
    </form>
  );
}
