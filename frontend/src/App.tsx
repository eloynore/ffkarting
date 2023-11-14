import { useEffect, useState } from "react";
import { Driver } from "./components/Driver";
import "./App.css";

type team = {
  id: number;
  name: string;
};

type driver = {
  id: number;
  name: string;
  number: number;
  team: team;
  points: number;
};

function App() {
  const [drivers, setDrivers] = useState<driver[]>();

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
        <table id="rankings" className="leaderboard-results">
          <thead>
            <tr>
              <th>Piloto</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {drivers?.map((item) => {
              return <Driver key={item.id} {...item} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
