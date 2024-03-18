import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RaceParticipation } from "../components/RaceParticipation";
import { RaceProp, ParticipationsRaceProp } from "../helper/models";

type raceDetailData = {
  participations: ParticipationsRaceProp[];
  race: RaceProp;
};

export function Race() {
  const [raceDetailData, setRaceDetailData] = useState<raceDetailData>();
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      let raceId: number = +id;
      const fetchParticipations = async () => {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/race/" + raceId + "/get_participations/"
        );
        response.json().then((data) => setRaceDetailData(data));
      };
      fetchParticipations();
    }
  }, [id]);

  return (
    <div className="container-wrap">
      <section>
        <nav className="ladder-nav">
          <div className="ladder-title">
            <h1>Carrera de {raceDetailData?.race.circuit}</h1>
          </div>
        </nav>
        <article className="driver-info">
          <div className="driver-data">
            <img className="helmet" src="/icons/calendar.svg" alt="calendar" />
            <p>{raceDetailData?.race.date}</p>
          </div>
        </article>
        <table id="rankings" className="leaderboard-results driver-results">
          <thead style={{ display: "none" }}>
            <tr>
              <th>Circuito</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {raceDetailData?.participations.length ? (
              raceDetailData.participations.map((item) => {
                return <RaceParticipation key={item.id} {...item} />;
              })
            ) : (
              <tr>
                <td colSpan={2} className="no-participations">
                  Carrera sin participaciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
