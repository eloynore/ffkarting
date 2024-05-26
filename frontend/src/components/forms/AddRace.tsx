import React, { useState } from "react";
import { createRace } from "../../helper/api";

export default function AddRaceForm() {
  const [circuit, setCircuit] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRace = { circuit, date, photo };
    await createRace(newRace);
    setCircuit("");
    setDate("");
    setPhoto("");
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
          onChange={(e) => setCircuit(e.target.value)}
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
          onChange={(e) => setDate(e.target.value)}
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
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg"
      >
        Add Race
      </button>
    </form>
  );
}
