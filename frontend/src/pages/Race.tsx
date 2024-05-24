import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RaceParticipation } from "../components/RaceParticipation";
import { RaceProp, ParticipationsRaceProp } from "../helper/models";
import { useTranslation } from "react-i18next";

type raceDetailData = {
  participations: ParticipationsRaceProp[];
  race: RaceProp;
};

export function Race() {
  const { t } = useTranslation();
  const [raceDetailData, setRaceDetailData] = useState<raceDetailData>();
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      let raceId: number = +id;
      const fetchParticipations = async () => {
        try {
          const response = await fetch(
            "http://192.168.0.31:8000/api/v1/race/" +
              raceId +
              "/get_participations/"
          );
          response.json().then((data) => setRaceDetailData(data));
        } catch (error) {
          console.log(error);
        }
      };
      fetchParticipations();
    }
  }, [id]);

  return (
    <div className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <section>
        {raceDetailData?.race ? (
          <>
            <div className="w-full  bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
              <div className="flex items-center justify-center">
                <h1 className="px-6 font-bold text-left text-3xl dark:text-white">
                  {raceDetailData?.race.circuit}
                </h1>
                <div className="flex justify-center items-center my-5 px-6">
                  <img
                    className="w-8 aspect-square"
                    src="/icons/calendar.svg"
                    alt="calendar"
                  />
                  <p>{raceDetailData?.race.date}</p>
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
                    <th scope="col" className="px-6 py-3">
                      {t("position")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("drivers")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("points")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {raceDetailData?.participations.length ? (
                    raceDetailData.participations.map((item) => {
                      return <RaceParticipation key={item.id} {...item} />;
                    })
                  ) : (
                    <tr>
                      <td colSpan={3} className="no-participations">
                        Carrera sin participaciones
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <nav className="ladder-nav">
            <div className="ladder-title">
              <h1>Carrera no encontrada</h1>
            </div>
          </nav>
        )}
      </section>
    </div>
  );
}
