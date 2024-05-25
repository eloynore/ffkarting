import { useEffect, useState } from "react";
import { TeamLeaderboard } from "../components/TeamLeaderboard";
import { TeamLeaderboardProp } from "../helper/models";
import { useTranslation } from "react-i18next";
import { getData } from "../helper/api";

export function Teams() {
  const [teams, setTeams] = useState<TeamLeaderboardProp[]>();
  const { t } = useTranslation();

  // Fetch data when the component mounts
  async function fetchData() {
    const result = await getData("teams/get_leaderboard/");
    setTeams(result.leaderboard);
  }

  useEffect(() => {
    fetchData();
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
              <th scope="col" className="px-6 py-3">
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
        <div className="w-full text-sm text-left  dark:text-gray-400 p-4">
          <h1 className="font-bold whitespace-nowrap  text-2xl text-black dark:text-white">
            Currently there are no teams
          </h1>
        </div>
      )}
    </div>
  );
}
