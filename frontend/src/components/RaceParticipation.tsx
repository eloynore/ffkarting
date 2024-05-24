import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ParticipationsRaceProp } from "../helper/models";
import { getImage } from "../helper/api";

export function RaceParticipation(
  participation: Readonly<ParticipationsRaceProp>
) {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathToDriver = "/driver/" + participation.driver.id;
  const navigate = useNavigate();

  const [teamImage, setTeamImage] = useState<string>("");
  let TeamLogo = "/logos/" + participation.driver.team.name + ".png";

  useEffect(() => {
    const response = getImage(TeamLogo);
    response.then((data) => (data ? setTeamImage(TeamLogo) : setTeamImage("")));
  }, [TeamLogo]);

  if (toggle) {
    return (
      <>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td className="px-3">
            <p className="text-black dark:text-gray-100 block rounded-lg text-left font-medium">
              {participation.position}º
            </p>
          </td>
          <td className="px-3">
            <div className="flex justify-left items-center my-5 ">
              {participation.fastLap ? (
                <img
                  className="w-8 aspect-auto"
                  src="/icons/fastlap.png"
                  alt="Fast lap"
                />
              ) : (
                <></>
              )}
              {participation.theFasto ? (
                <img
                  className="w-8 aspect-auto"
                  src="/icons/thefasto.png"
                  alt="The fasto"
                />
              ) : (
                <></>
              )}
              {participation.grandChelem ? (
                <img
                  className="w-8 aspect-auto"
                  src="/icons/grandchelem.png"
                  alt="Grand chelem"
                />
              ) : (
                <></>
              )}
              <div className="flex items-center">
                {teamImage ? (
                  <div className="w-11 h-11 rounded-full flex justify-center items-center">
                    <img
                      className="w-8 h-auto"
                      src={teamImage}
                      alt={participation.driver.name + " logo image"}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="text-left">
                  <p className="">#{participation.driver.number}</p>
                  <p className=" text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
                    {participation.driver.name}
                  </p>
                  <p className="">{participation.driver.team.name}</p>
                </div>
                <button
                  style={{ float: "right" }}
                  onClick={() => navigate(pathToDriver)}
                >
                  <img
                    className="w-8 aspect-square"
                    src="/icons/right-arrow.svg"
                    alt="Driver helmet"
                  />
                </button>
              </div>
            </div>
          </td>
          <td className="px-3">
            <div className="flex justify-left items-center my-5 ">
              <p className="text-black dark:text-gray-100 block rounded-lg text-left font-medium">
                {participation.points}
              </p>
              <button className="pl-2 " onClick={() => setToggle(false)}>
                <img
                  className="w-8 
                 aspect-auto"
                  src="/icons/compress.svg"
                  alt="expand row"
                />
              </button>
            </div>
          </td>
        </tr>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td colSpan={3} className="px-3">
            <p className="">Mejor vuelta:</p>
            <p className="text-black dark:text-gray-100 block rounded-lg text-left font-medium">
              {participation.lapTime}
            </p>
            <p className="">Tiempo de clasificación:</p>
            <p className="text-black dark:text-gray-100 block rounded-lg text-left font-medium">
              {participation.qualifyLapTime}
            </p>
            <p className="">Tiempo de entrenamiento:</p>
            <p className="text-black dark:text-gray-100 block rounded-lg text-left font-medium">
              {participation.trainLapTime}
            </p>

            <div className="flex justify-center items-center">
              {participation.videoURL ? (
                <a
                  href={participation.videoURL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <p>Video</p>
                  <img
                    className="w-6 aspect-auto"
                    src="/icons/play.svg"
                    alt="play video"
                  />
                </a>
              ) : (
                <></>
              )}
            </div>
          </td>
        </tr>
      </>
    );
  } else {
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-3">
          <p className="text-black dark:text-gray-100 block rounded-lg text-left font-medium">
            {participation.position}º
          </p>
        </td>
        <td className="px-3">
          <div className="flex justify-left items-center my-5 ">
            {participation.fastLap ? (
              <img
                className="w-8 aspect-auto"
                src="/icons/fastlap.png"
                alt="Fast lap"
              />
            ) : (
              <></>
            )}
            {participation.theFasto ? (
              <img
                className="w-8 aspect-auto"
                src="/icons/thefasto.png"
                alt="The fasto"
              />
            ) : (
              <></>
            )}
            {participation.grandChelem ? (
              <img
                className="w-8 aspect-auto"
                src="/icons/grandchelem.png"
                alt="Grand chelem"
              />
            ) : (
              <></>
            )}
            <div className="flex items-center">
              {teamImage ? (
                <div className="w-11 h-11 rounded-full flex justify-center items-center">
                  <img
                    className="w-8 h-auto"
                    src={teamImage}
                    alt={participation.driver.name + " logo image"}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="text-left">
                <p className="">#{participation.driver.number}</p>
                <p className=" text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
                  {participation.driver.name}
                </p>
                <p className="">{participation.driver.team.name}</p>
              </div>
              <button
                style={{ float: "right" }}
                onClick={() => navigate(pathToDriver)}
              >
                <img
                  className="w-8 aspect-square"
                  src="/icons/right-arrow.svg"
                  alt="Driver helmet"
                />
              </button>
            </div>
          </div>
        </td>
        <td className="px-3">
          <div className="flex justify-left items-center my-5 ">
            <p className="text-black dark:text-gray-100 block rounded-lg text-left font-medium">
              {participation.points}
            </p>
            <button className="pl-2 " onClick={() => setToggle(true)}>
              <img
                className="w-8 
                 aspect-auto"
                src="/icons/expand.svg"
                alt="expand row"
              />
            </button>
          </div>
        </td>
      </tr>
    );
  }
}
