import { TeamLeaderboardProp } from "../../helper/models";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function TeamLeaderboard({
  id,
  name,
  drivers,
  points,
  color,
  logo,
}: Readonly<TeamLeaderboardProp>) {
  const [toggle, setToggle] = useState<boolean>(false);
  const navigate = useNavigate();
  if (toggle) {
    return (
      <>
        <tr
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setToggle(false)}
        >
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
          <td className="pl-6 py-4 ">
            <div className="flex justify-left items-center my-5 ">
              <p className="text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
                {points}
              </p>
              <img
                className="w-8 ml-2
                 aspect-auto"
                src="/icons/compress.svg"
                alt="expand row"
              />
            </div>
          </td>
        </tr>
        {drivers.map((driver) => {
          return (
            <tr
              key={driver.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              onClick={() => setToggle(false)}
            >
              <td className="px-6 py-4 ">
                <div className="flex items-center">
                  <p className=" text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
                    <button
                      onClick={() => navigate(`/driver/${driver.id}`)}
                      className=" text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium "
                    >
                      {driver.name}
                    </button>
                  </p>
                  <button
                    style={{ float: "right" }}
                    onClick={() => navigate(`/driver/${driver.id}`)}
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
                <p className="text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
                  {driver.points}
                </p>
              </td>
            </tr>
          );
        })}
      </>
    );
  } else {
    return (
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        onClick={() => setToggle(true)}
      >
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
        <td className="pl-6 py-4 ">
          <div className="flex justify-left items-center my-5 ">
            <p className="text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
              {points}
            </p>
            <img
              className="w-8 ml-2
                 aspect-auto"
              src="/icons/expand.svg"
              alt="expand row"
            />
          </div>
        </td>
      </tr>
    );
  }
}
