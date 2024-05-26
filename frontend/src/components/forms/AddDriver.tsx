import React, { useState, useEffect } from "react";
import { createDriver, getTeams } from "../../helper/api";

interface Team {
  id: number;
  name: string;
}

export default function AddDriverForm() {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [team, setTeam] = useState<number | "">("");
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await getTeams();
      setTeams(response.data);
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDriver = { name, number, team: team as number };
    await createDriver(newDriver);
    setName("");
    setNumber(0);
    setTeam("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md text-gray-700 dark:bg-gray-800 dark:text-white"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Driver</h2>
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
        <label htmlFor="number" className="block ">
          Number
        </label>
        <input
          type="number"
          id="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="team" className="block ">
          Team
        </label>
        <select
          id="team"
          value={team}
          onChange={(e) => setTeam(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        >
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg"
      >
        Add Driver
      </button>
    </form>
  );
}
