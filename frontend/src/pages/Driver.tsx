import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DriverParticipation } from "../components/DriverParticipation";
import { DriverProp, ParticipationsDriverProp } from "../helper/models";
import { useTranslation } from "react-i18next";
import { getData } from "../helper/api";

type driverDetailData = {
  participations: ParticipationsDriverProp[];
  driver: DriverProp;
};

export function Driver() {
  const [driverDetailData, setDriverDetailData] = useState<driverDetailData>();
  const { t } = useTranslation();

  let { id } = useParams();

  // Fetch data when the component mounts
  async function fetchData() {
    const result = await getData(`drivers/${id}/getParticipations/`);
    setDriverDetailData(result);
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      {driverDetailData ? (
        <>
          <div className="w-full  bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
            <div className="flex items-center justify-center">
              <h1 className="px-6 font-bold text-left text-3xl dark:text-white">
                {driverDetailData?.driver.name}
              </h1>
              <div className="flex justify-center items-center my-5 px-6">
                {driverDetailData.driver.team.logo ? (
                  <img
                    className="w-8 aspect-square"
                    src={driverDetailData.driver.team.logo}
                    alt={driverDetailData?.driver.team.name + " logo image"}
                  />
                ) : (
                  <></>
                )}
                <p>#{driverDetailData?.driver.number}</p>
              </div>
              <div className="my-5 px-6">
                <p className="text-black dark:text-gray-200 block text-center font-medium py-3">
                  <span className="font-bold">
                    {driverDetailData?.driver.points}
                  </span>{" "}
                  {t("points")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <table
              id="rankings"
              className="w-full max-w-[1280px] text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 py-3 w-1">
                    Posición
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Circuito
                  </th>
                  <th scope="col" className="px-7 py-3 w-1">
                    {t("points")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {driverDetailData?.participations.length ? (
                  driverDetailData.participations.map((item) => {
                    return <DriverParticipation key={item.id} {...item} />;
                  })
                ) : (
                  <tr>
                    <td colSpan={3} className="no-participations">
                      Sin carreras
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="w-full text-sm text-left  dark:text-gray-400 p-4">
          <h1 className="font-bold whitespace-nowrap  text-2xl text-black dark:text-white">
            Driver not found
          </h1>
        </div>
      )}
    </div>
  );
}
