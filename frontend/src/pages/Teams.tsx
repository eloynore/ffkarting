import { useEffect, useState } from "react";
import { TeamLeaderboard } from "../components/TeamLeaderboard";
import { TeamLeaderboardProp } from "../helper/models";
import { useTranslation } from "react-i18next";

export function Teams() {
  const [teams, setTeams] = useState<TeamLeaderboardProp[]>();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.31:8000/api/v1/teams/get_leaderboard/"
        );
        response.json().then((data) => setTeams(data.leaderboard));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="flex justify-center w-full">
      {teams ? (
        <table
          id="rankings"
          className="w-full max-w-[1280px] text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("teams")}
              </th>
              <th scope="col" className="py-3">
                {t("points")}
              </th>
            </tr>
          </thead>
          <tbody>
            {teams?.map((item) => {
              return <TeamLeaderboard key={item.id} {...item} />;
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <h1 className="text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium">
            Clasificación no encontrada
          </h1>
        </div>
      )}
    </div>
  );
}
