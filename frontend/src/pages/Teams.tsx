import { useEffect, useState } from "react";
import { TeamLeaderboard } from "../components/TeamLeaderboard";
import { TeamLeaderboardProp } from "../helper/models";

export function Teams() {
  const [teams, setTeams] = useState<TeamLeaderboardProp[]>();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/teams/get_leaderboard/"
        );
        response.json().then((data) => setTeams(data.leaderboard));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="container-wrap">
      <section>
        {teams ? (
          <table id="rankings" className="leaderboard-results leaderboard main">
            <thead style={{ display: "none" }}>
              <tr>
                <th>Equipo</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {teams?.map((item) => {
                return <TeamLeaderboard key={item.id} {...item} />;
              })}
            </tbody>
          </table>
        ) : (
          <nav className="ladder-nav">
            <div className="ladder-title">
              <h1>Equipos no encontrados</h1>
            </div>
          </nav>
        )}
      </section>
    </div>
  );
}
