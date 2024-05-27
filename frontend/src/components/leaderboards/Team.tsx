import { TeamLeaderboardProp } from "../../helper/models";

export function TeamLeaderboard({
  id,
  name,
  drivers,
  points,
  color,
  logo,
}: Readonly<TeamLeaderboardProp>) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
      <td className="px-6 py-4 ">
        <div className="flex items-center">
          {logo ? (
            <div className="w-11 h-11 rounded-full flex justify-center items-center">
              <img
                className="w-8 h-auto"
                src={logo}
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
      <td className="px-6 py-4 ">
        <p className="text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
          {points}
        </p>
      </td>
    </tr>
  );
}
