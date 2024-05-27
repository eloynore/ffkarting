import { useNavigate } from "react-router-dom";
import { DriverProp } from "../../helper/models";

export function DriverLeaderboard({
  id,
  name,
  number,
  team,
  points,
}: Readonly<DriverProp>) {
  const pathToDetail = "/driver/" + id;
  const navigate = useNavigate();

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
      <td className="px-6 py-4 ">
        <div className="flex items-center">
          {team.logo ? (
            <div className="w-11 h-11 rounded-full flex justify-center items-center">
              <img
                className="w-8 h-auto"
                src={team.logo}
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
