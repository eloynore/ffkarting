import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ParticipationRace } from "../components/ParticipationsRace";

type team = {
  id: number;
  name: string;
  color: string;
};

type driver = {
  id: number;
  name: string;
  number: number;
  team: team;
};

type race = {
  id: number;
  circuit: string;
  date: string;
};

type participation = {
  id: number;
  driver: driver;
  points: number;
  position: number;
  lapTime: string;
  qualifyLapTime: string;
  trainLapTime: string;
};

type raceDetailData = {
  participations: participation[];
  race: race;
};

export function RaceDetail() {
  const [raceDetailData, setRaceDetailData] = useState<raceDetailData>();
  let { id } = useParams();
  const navigate = useNavigate();
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
  }, []);

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
            <p>Fecha: </p>
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
                return <ParticipationRace key={item.id} {...item} />;
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
        <div className="btn-bar">
          <button className="btn-backTo" onClick={() => navigate("/")}>
            Clasificación
          </button>
        </div>
      </section>
    </div>
  );
}
