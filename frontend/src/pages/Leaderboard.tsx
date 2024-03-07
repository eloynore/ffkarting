import { useEffect, useState } from "react";
import { DriverLeaderboard } from "../components/DriverLeaderboard";
import { DriverProp } from "../helper/models";

export function Leaderboard() {
  const [drivers, setDrivers] = useState<DriverProp[]>();

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/drivers/get_leaderboard/"
      );
      response.json().then((data) => setDrivers(data.leaderboard));
    };
    fetchDrivers();
  }, []);

  return (
    <div className="container-wrap">
      <section>
        <nav className="ladder-nav">
          <div className="ladder-title">
            <h1>Clasificación</h1>
          </div>
        </nav>
        <table id="rankings" className="leaderboard-results main">
          <thead style={{ display: "none" }}>
            <tr>
              <th>Conductor</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {drivers?.map((item) => {
              return <DriverLeaderboard key={item.id} {...item} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
