import React, { useState, useEffect } from "react";
import {
  getDriver,
  updateDriver,
  createDriver,
  getTeams,
} from "../../helper/api";
// translation context
import { useTranslation } from "react-i18next";
import { FormInfo } from "../../helper/models";
import { AxiosResponse } from "axios";
interface Driver {
  name: string;
  number: number;
  team: number;
}
interface Team {
  id: number;
  name: string;
}

export default function DriverForm(context: Readonly<FormInfo>) {
  const { t } = useTranslation();
  const [driver, setDriver] = useState<Driver>({
    name: "",
    number: 0,
    team: 0,
  });
  const [teams, setTeams] = useState<Team[]>([]);

  // TODO: fix this part to be used everywhere
  const statusCodeSuccess = context.isEdit ? 200 : 201;
  const buttonText = context.isEdit ? t("editDriver") : t("addDriver");
  const errorMessage = context.isEdit ? t("errEditDriver") : t("errAddDriver");
  const successMessage = context.isEdit ? t("editedRace") : t("addedDriver");
  const [errMsg, setErrMsg] = useState("");
  const [scsMessage, setScsMessage] = useState("");

  useEffect(() => {
    if (context.isEdit) {
      const fetchData = async () => {
        if (context.id) {
          const driver = await getDriver(context.id);
          setDriver(driver.data);
        }
      };
      fetchData();
    }
  }, []);

  // Get all the teams to choose from
  useEffect(() => {
    const fetchTeams = async () => {
      const response = await getTeams();
      setTeams(response.data);
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [driver]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setDriver((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (driver.team === 0) {
      setErrMsg("Select a team first!");
      return;
    }
    try {
      let response: AxiosResponse;
      if (context.isEdit && context.id) {
        response = await updateDriver(context.id, driver);
      } else {
        response = await createDriver(driver);
        setDriver({
          name: "",
          number: 0,
          team: 0,
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
            Add New Driver
          </h2>
          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
        </>
      ) : (
        <></>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block dark:text-white font-bold mb-2">
          {t("name")}
        </label>
        <input
          name="name"
          type="text"
          id="name"
          value={driver.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="number"
          className="block dark:text-white font-bold mb-2"
        >
          {t("number")}
        </label>
        <input
          name="number"
          type="number"
          id="number"
          value={driver.number}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="team" className="block dark:text-white font-bold mb-2">
          {t("team")}
        </label>
        <select
          name="team"
          id="team"
          value={driver.team}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        >
          <option value={0}>{t("selectTeam")}</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
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
