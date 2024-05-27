import React, { useState, useEffect } from "react";
import { createRace } from "../../helper/api";

interface Race {
  circuit: string;
  date: string;
  photo?: string;
}

export default function AddRaceForm() {
  const [circuit, setCircuit] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");

  const [errMsg, setErrMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [circuit, date, photo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let newRace: Race = { circuit, date, photo };
      if (!photo) {
        delete newRace.photo;
      }

      const response = await createRace(newRace);
      setCircuit("");
      setDate("");
      setPhoto("");
      if (response.status === 201) {
        setSuccessMessage("Race added!");
      }
    } catch (error) {
      setErrMsg("Error adding race");
      setSuccessMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md text-gray-700 dark:bg-gray-800 dark:text-white"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Race</h2>
      <div className="mb-4">
        <label htmlFor="circuit" className="block ">
          Circuit
        </label>
        <input
          type="text"
          id="circuit"
          value={circuit}
          onChange={(e) => {
            setSuccessMessage("");
            setCircuit(e.target.value);
          }}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block ">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => {
            setSuccessMessage("");
            setDate(e.target.value);
          }}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="photo" className="block ">
          Photo URL
        </label>
        <input
          type="url"
          id="photo"
          value={photo}
          onChange={(e) => {
            setSuccessMessage("");
            setPhoto(e.target.value);
          }}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg"
      >
        Add Race
      </button>
      <p className={errMsg ? "text-red-500 mb-4" : "hidden"}>{errMsg}</p>
      <p className={successMessage ? "text-green-500 mb-4" : "hidden"}>
        {successMessage}
      </p>
    </form>
  );
}
