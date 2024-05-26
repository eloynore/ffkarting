import { useNavigate } from "react-router-dom";
import { DriverProp } from "../../helper/models";
import { useState, useEffect } from "react";
import { getImage } from "../../helper/api";

export function DriverLeaderboard({
  id,
  name,
  number,
  team,
  points,
}: Readonly<DriverProp>) {
  const [teamImage, setTeamImage] = useState<string>("");
  let TeamLogo = `/logos/${team.name}.png`;

  useEffect(() => {
    const response = getImage(TeamLogo);
    response.then((data) => (data ? setTeamImage(TeamLogo) : setTeamImage("")));
  }, [TeamLogo]);
  const pathToDetail = "/driver/" + id;
  const navigate = useNavigate();

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
      <td className="px-6 py-4 ">
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
          <div className="text-left">
            <p className="">#{number}</p>
            <button
              onClick={() => navigate(pathToDetail)}
              className=" text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium "
            >
              {name}
            </button>
            <p>{team.name}</p>
          </div>
          <button
            style={{ float: "right" }}
            onClick={() => navigate(pathToDetail)}
          >
            <img
              className="w-8 aspect-square"
              src="/icons/right-arrow.svg"
              alt="Driver helmet"
            />
          </button>
        </div>
      </td>
      <td className="px-6 py-4 ">
        <div>
          <p className="text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
            {points}
          </p>
        </div>
      </td>
    </tr>
  );
}
