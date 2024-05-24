import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParticipationsDriverProp } from "../helper/models";

export function DriverParticipation(
  participation: Readonly<ParticipationsDriverProp>
) {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathToRace = "/race/" + participation.race.id;
  const navigate = useNavigate();

  if (toggle) {
    return (
      <>
        <tr
          onClick={() => setToggle(false)}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
        >
          <td>
            <div className="flex justify-left items-center my-5 px-6">
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
              <div>
                <p className=" text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
                  {participation.race.circuit}
                </p>
              </div>
            </div>
          </td>
          <td>
            <p className="text-gray-100 block rounded-lg text-left font-medium">
              {participation.position}º
            </p>
          </td>
          <td>
            <p className="text-gray-100 block rounded-lg text-left font-medium">
              {participation.points}
            </p>
          </td>
          <td>
            <button
              onClick={() => setToggle(false)}
              className="w-8 aspect-auto"
            >
              <img src="/icons/compress.svg" alt="expand row" />
            </button>
          </td>
        </tr>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
          <td colSpan={4}>
            <div className="px-6">
              <p className="">Mejor vuelta:</p>
              <p className="text-gray-100 block rounded-lg text-left font-medium">
                {participation.lapTime}
              </p>
            </div>
            <div className="px-6">
              <p className="">Tiempo de clasificación:</p>
              <p className="text-gray-100 block rounded-lg text-left font-medium">
                {participation.qualifyLapTime}
              </p>
            </div>
            <div className="px-6">
              <p className="">Tiempo de entrenamiento:</p>
              <p className="text-gray-100 block rounded-lg text-left font-medium">
                {participation.trainLapTime}
              </p>
            </div>

            <div className="flex justify-center items-center">
              {participation.videoURL ? (
                <a
                  href={participation.videoURL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <p>Video</p>
                  <img
                    className="w-8 aspect-auto"
                    src="/icons/play.svg"
                    alt="play video"
                  />
                </a>
              ) : (
                <></>
              )}
              <button
                className="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={() => navigate(pathToRace)}
              >
                <p>Carrera</p>
                <img
                  className="w-8 aspect-auto"
                  src="/icons/checkered-flag.svg"
                  alt="checkered flag"
                />
              </button>
            </div>
          </td>
        </tr>
      </>
    );
  } else {
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
        <td>
          <div className="flex justify-left items-center my-5 px-6">
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
            <div>
              <p className=" text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium ">
                {participation.race.circuit}
              </p>
            </div>
          </div>
        </td>
        <td>
          <p className="text-gray-100 block rounded-lg text-left font-medium">
            {participation.position}º
          </p>
        </td>
        <td>
          <p className="text-gray-100 block rounded-lg text-left font-medium">
            {participation.points}
          </p>
        </td>
        <td>
          <button onClick={() => setToggle(true)} className="w-8 aspect-auto">
            <img src="/icons/expand.svg" alt="expand row" />
          </button>
        </td>
      </tr>
    );
  }
}
