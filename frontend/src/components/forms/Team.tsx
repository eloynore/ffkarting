import React, { useState, useEffect } from "react";
import { createTeam, updateTeam, getTeam } from "../../helper/api";
import { FormInfo } from "../../helper/models";
import { AxiosResponse } from "axios";

interface Team {
  name: string;
  color?: string;
  logo: File | null;
}

export default function AddTeamForm(context: Readonly<FormInfo>) {
  const statusCodeSuccess = context.isEdit ? 200 : 201;
  const buttonText = context.isEdit ? "Edit team" : "Add team";
  const errorMessage = context.isEdit
    ? "Error editing race"
    : "Error adding race";
  const successMessage = context.isEdit ? "Team edited!" : "Team added!";
  const [errMsg, setErrMsg] = useState("");
  const [scsMessage, setScsMessage] = useState("");
  const [team, setTeam] = useState<Team>({
    name: "",
    color: "",
    logo: null,
  });

  useEffect(() => {
    if (context.isEdit) {
      const fetchData = async () => {
        if (context.id) {
          const currTeam = await getTeam(context.id);
          currTeam.data.logo = null;
          setTeam(currTeam.data);
        }
      };
      fetchData();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeam((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setScsMessage("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setTeam((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : null,
    }));
    setScsMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response: AxiosResponse;
      if (!team.color) {
        delete team.color;
      }
      if (context.isEdit && context.id) {
        response = await updateTeam(context.id, team);
      } else {
        response = await createTeam(team);
        setTeam({
          name: "",
          color: "",
          logo: null,
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
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Team</h2>
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="mb-4">
        <label htmlFor="name" className="block dark:text-white font-bold mb-2">
          Name
        </label>
        <input
          name="name"
          type="text"
          id="name"
          value={team.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="color" className="block dark:text-white font-bold mb-2">
          Color
        </label>
        <input
          name="color"
          type="text"
          id="color"
          value={team.color}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="logo" className="block dark:text-white font-bold mb-2">
          Team Logo
        </label>
        <input
          name="logo"
          type="file"
          id="logo"
          onChange={handleFileChange}
          className="w-full p-2 border  border-gray-300 rounded"
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
