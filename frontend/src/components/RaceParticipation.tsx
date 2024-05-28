import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ParticipationsRaceProp } from "../helper/models";
import ShowBadges from "./ShowBadges";
import RenderDetail from "./DetailInfo";

export function RaceParticipation(
  participation: Readonly<ParticipationsRaceProp>
) {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathToDriver = "/driver/" + participation.driver.id;
  const navigate = useNavigate();

  const badges = {
    fastLap: participation.fastLap,
    theFasto: participation.theFasto,
    grandChelem: participation.grandChelem,
  };

  if (toggle) {
    return (
      <>
        <tr
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setToggle(false)}
        >
          <td className="px-3">
            <p className="text-black dark:text-gray-100 block rounded-lg text-left font-medium">
              {participation.position}º
            </p>
          </td>
          <td className="px-3">
            <div className="flex justify-left items-center my-5 ">
              <ShowBadges {...badges} />
              <div className="flex items-center">
                {participation.driver.team.logo ? (
                  <div className="w-11 h-11 rounded-full flex justify-center items-center">
                    <img
                      className="w-8 h-auto"
                      src={participation.driver.team.logo}
                      alt={participation.driver.name + " logo image"}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="text-left">
                  <p className="">#{participation.driver.number}</p>
                  <button
                    onClick={() => navigate(pathToDriver)}
                    className=" text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium "
                  >
                    {participation.driver.name}
                  </button>
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
          <td className="px-7">
            <div className="flex justify-left items-center my-5 ">
              <p className="text-black text-lg dark:text-gray-100 block rounded-lg text-left font-medium">
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
        <tr className=" w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
          <td colSpan={3} className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <RenderDetail
                {...{
                  imagePath: "/icons/chronometer.svg",
                  title: "Best lap time",
                  data: participation.lapTime,
                  unit: "seconds",
                }}
              />
              <RenderDetail
                {...{
                  imagePath: "/icons/chronometer.svg",
                  title: "Best qualy time",
                  data: participation.qualifyLapTime,
                  unit: "seconds",
                }}
              />
              <RenderDetail
                {...{
                  imagePath: "/icons/chronometer.svg",
                  title: "Best training time",
                  data: participation.trainLapTime,
                  unit: "seconds",
                }}
              />
              {/* Average lap times */}
              <RenderDetail
                {...{
                  imagePath: "/icons/chronometer.svg",
                  title: "Average lap time",
                  data: participation.avgTime,
                  unit: "seconds",
                }}
              />
              <RenderDetail
                {...{
                  imagePath: "/icons/chronometer.svg",
                  title: "Average qualy time",
                  data: participation.qualifyAvgTime,
                  unit: "seconds",
                }}
              />
              <RenderDetail
                {...{
                  imagePath: "/icons/chronometer.svg",
                  title: "Average training time",
                  data: participation.trainAvgTime,
                  unit: "seconds",
                }}
              />
            </div>

            <div className="flex justify-center items-center">
              {participation.videoURL ? (
                <a
                  href={participation.videoURL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        onClick={() => setToggle(true)}
      >
        <td className="px-3">
          <p className="text-black dark:text-gray-100 block rounded-lg text-left font-medium">
            {participation.position}º
          </p>
        </td>
        <td className="px-3">
          <div className="flex justify-left items-center my-5 ">
            <ShowBadges {...badges} />
            <div className="flex items-center">
              {participation.driver.team.logo ? (
                <div className="w-11 h-11 rounded-full flex justify-center items-center">
                  <img
                    className="w-8 h-auto"
                    src={participation.driver.team.logo}
                    alt={participation.driver.name + " logo image"}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="text-left">
                <p className="">#{participation.driver.number}</p>
                <button
                  onClick={() => navigate(pathToDriver)}
                  className=" text-gray-900 whitespace-nowrap dark:text-white text-2xl font-medium "
                >
                  {participation.driver.name}
                </button>
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
        <td className="px-7">
          <div className="flex justify-left items-center my-5 ">
            <p className="text-black text-lg dark:text-gray-100 block rounded-lg text-left font-medium">
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
