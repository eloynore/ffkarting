import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Participation } from "../components/Participations";

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
  points: number;
};

type race = {
  id: number;
  circuit: string;
  date: string;
};

type participation = {
  id: number;
  race: race;
  points: number;
  position: number;
  lapTime: string;
  qualifyLapTime: string;
  trainLapTime: string;
};

type driverDetailData = {
  participations: participation[];
  driver: driver;
};

export function DriverDetail() {
  const [driverDetailData, setDriverDetailData] = useState<driverDetailData>();
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      let driverId: number = +id;
      const fetchParticipations = async () => {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/drivers/" +
            driverId +
            "/get_participations/"
        );
        response.json().then((data) => setDriverDetailData(data));
      };
      fetchParticipations();
    }
  }, []);

  return (
    <div className="container-wrap">
      <section>
        <nav className="ladder-nav">
          <div className="ladder-title">
            <h1>Perfil de {driverDetailData?.driver.name}</h1>
          </div>
        </nav>
        <article className="driver-info">
          <div className="driver-data">
            <p>Equipo: </p>
            <p>{driverDetailData?.driver.team.name}</p>
          </div>
          <div className="driver-data">
            <p>Puntos: </p>
            <p>{driverDetailData?.driver.points}</p>
          </div>
          <div className="driver-data">
            <p>Numero: </p>
            <p>{driverDetailData?.driver.number}</p>
          </div>
        </article>
        <table id="rankings" className="leaderboard-results driver-results">
          <thead style={{ display: "none" }}>
            <tr>
              <th>Circuito</th>
              <th>Posición</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {driverDetailData?.participations.length ? (
              driverDetailData.participations.map((item) => {
                return <Participation key={item.id} {...item} />;
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
        <div className="btn-bar">
          <button className="btn-backTo" onClick={() => navigate("/")}>
            Clasificación
          </button>
        </div>
      </section>
    </div>
  );
}
