import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Participation } from "../components/Participations";

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

export function DriverDetail() {
  const [participations, setParticipations] = useState<participation[]>();
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      let driverId: number = +id;
      const fetchParticipations = async () => {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/drivers/" +
            driverId +
            "/get_participations/"
        );
        response.json().then((data) => setParticipations(data.participations));
      };
      fetchParticipations();
    }
  }, []);

  return (
    <div className="container-wrap">
      <section>
        <nav className="ladder-nav">
          <div className="ladder-title">
            <h1>Clasificación</h1>
          </div>
        </nav>
        <table id="rankings" className="leaderboard-results">
          <thead>
            <tr>
              <th>Circuito</th>
              <th>Mejor vuelta</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {participations?.map((item) => {
              return <Participation key={item.id} {...item} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
