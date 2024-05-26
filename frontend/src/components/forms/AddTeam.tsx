import React, { useState } from "react";
import { createTeam } from "../../helper/api";

export default function AddTeamForm() {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTeam = { name, color };
    await createTeam(newTeam);
    setName("");
    setColor("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md text-gray-700 dark:bg-gray-800 dark:text-white"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Team</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block ">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="color" className="block ">
          Color
        </label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg"
      >
        Add Team
      </button>
    </form>
  );
}
