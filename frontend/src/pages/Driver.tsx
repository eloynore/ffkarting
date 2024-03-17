import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DriverParticipation } from "../components/DriverParticipation";
import { DriverProp, ParticipationsDriverProp } from "../helper/models";

type driverDetailData = {
  participations: ParticipationsDriverProp[];
  driver: DriverProp;
};

export function Driver() {
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
  }, [id]);

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
        <div className="btn-bar">
          <button className="btn-backTo" onClick={() => navigate("/")}>
            Clasificación
          </button>
        </div>
      </section>
    </div>
  );
}
