import React, { useState, useEffect } from "react";
import { createTeam } from "../../helper/api";

interface Team {
  name: string;
  color?: string;
  logo: File | null;
}

export default function AddTeamForm() {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);

  const [errMsg, setErrMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [name, color]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const teamData: Team = { name, color, logo };

      if (!color) {
        delete teamData.color;
      }
      const response = await createTeam(teamData);
      setName("");
      setColor("");
      setLogo(null);
      if (response.status === 201) {
        setSuccessMessage("Team added!");
      }
    } catch (error) {
      setErrMsg("Error adding driver");
      setSuccessMessage("");
    }
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
          onChange={(e) => {
            setSuccessMessage("");
            setName(e.target.value);
          }}
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
          onChange={(e) => {
            setSuccessMessage("");
            setColor(e.target.value);
          }}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="logo" className="block text-gray-700 font-bold mb-2">
          Team Logo:
        </label>
        <input
          type="file"
          id="logo"
          onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg"
      >
        Add Team
      </button>
      <p className={errMsg ? "text-red-500 mb-4" : "hidden"}>{errMsg}</p>
      <p className={successMessage ? "text-green-500 mb-4" : "hidden"}>
        {successMessage}
      </p>
    </form>
  );
}
