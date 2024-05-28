import React, { useState, useEffect } from "react";
import { createRace, updateRace } from "../../helper/api";
import { FormInfo } from "../../helper/models";
import { getRace } from "../../helper/api";
import { AxiosResponse } from "axios";

interface Race {
  circuit: string;
  date: string;
  photo?: string;
}

export default function RaceForm(context: Readonly<FormInfo>) {
  const [race, setRace] = useState<Race>({
    circuit: "",
    date: "",
    photo: "",
  });
  const statusCodeSuccess = context.isEdit ? 200 : 201;
  const buttonText = context.isEdit ? "Edit race" : "Add race";
  const errorMessage = context.isEdit
    ? "Error editing race"
    : "Error adding race";
  const successMessage = context.isEdit ? "Race edited!" : "Race added!";
  const [errMsg, setErrMsg] = useState("");
  const [scsMessage, setScsMessage] = useState("");

  useEffect(() => {
    if (context.isEdit) {
      const fetchData = async () => {
        if (context.id) {
          const race = await getRace(context.id);
          setRace(race.data);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [race]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setRace((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setScsMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!race.photo) {
        delete race.photo;
      }
      let response: AxiosResponse;
      if (context.isEdit && context.id) {
        response = await updateRace(context.id, race);
      } else {
        response = await createRace(race);
        setRace({
          circuit: "",
          date: "",
          photo: "",
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
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Race</h2>
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="mb-4">
        <label
          htmlFor="circuit"
          className="block dark:text-white font-bold mb-2"
        >
          Circuit
        </label>
        <input
          name="circuit"
          type="text"
          id="circuit"
          value={race.circuit}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block dark:text-white font-bold mb-2">
          Date
        </label>
        <input
          name="date"
          type="date"
          id="date"
          value={race.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="photo" className="block dark:text-white font-bold mb-2">
          Photo URL
        </label>
        <input
          name="photo"
          type="url"
          id="photo"
          value={race.photo}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
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
