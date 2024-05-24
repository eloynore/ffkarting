import { TeamLeaderboardProp } from "../helper/models";
import { useEffect, useState } from "react";
import { getImage } from "../helper/api";

export function TeamLeaderboard({
  id,
  name,
  drivers,
  points,
  color,
}: Readonly<TeamLeaderboardProp>) {
  const [teamImage, setTeamImage] = useState<string>("");
  let TeamLogo = "/logos/" + name + ".png";

  useEffect(() => {
    const response = getImage(TeamLogo);
    response.then((data) => (data ? setTeamImage(TeamLogo) : setTeamImage("")));
  }, [TeamLogo]);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
      <td scope="row" className="px-6 py-4 ">
        <div className="flex items-center">
          {teamImage ? (
            <div className="w-11 h-11 rounded-full flex justify-center items-center">
              <img
                className="w-8 h-auto"
                src={teamImage}
                alt={name + " logo image"}
              />
            </div>
          ) : (
            <></>
          )}
          <p className=" text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
            {name}
          </p>
        </div>
      </td>
      <td>
        <p className="text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
          {points}
        </p>
      </td>
    </tr>
  );
}
