import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

type participationProps = {
  id: number;
  driver: driver;
  points: number;
  position: number;
  lapTime: string;
  qualifyLapTime: string;
  trainLapTime: string;
};

export function ParticipationRace(participation: Readonly<participationProps>) {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathToDriver = "/driver/" + participation.driver.id;
  const navigate = useNavigate();

  if (toggle) {
    return (
      <>
        <tr
          style={{
            background:
              "linear-gradient(65deg, #ffffff, 2%,#" +
              participation.driver.team.color +
              ")",
          }}
          onClick={() => setToggle(!toggle)}
        >
          <td>
            <p className="row-value left">{participation.position}</p>
          </td>
          <td>
            <p className="row-title left">Driver</p>
            <p className="row-value left">{participation.driver.name}</p>
          </td>
          <td>
            <p className="row-title">Puntos</p>
            <p className="row-value">{participation.points}</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <div className="race-data">
              <p className="row-title left">Mejor vuelta:</p>
              <p className="row-value left">{participation.lapTime}</p>
            </div>
            <div className="race-data">
              <p className="row-title left">Tiempo de clasificación:</p>
              <p className="row-value left">{participation.qualifyLapTime}</p>
            </div>
            <div className="race-data">
              <p className="row-title left">Tiempo de entrenamiento:</p>
              <p className="row-value left">{participation.trainLapTime}</p>
            </div>
            <div className="race-data">
              <button onClick={() => navigate(pathToDriver)}>Driver</button>
            </div>
          </td>
        </tr>
      </>
    );
  } else {
    return (
      <tr
        style={{
          background:
            "linear-gradient(65deg, #ffffff, 2%,#" +
            participation.driver.team.color +
            ")",
        }}
        onClick={() => setToggle(!toggle)}
      >
        <td>
          <p className="row-value left">{participation.position}</p>
        </td>
        <td>
          <p className="row-title left">Driver</p>
          <p className="row-value left">{participation.driver.name}</p>
        </td>
        <td>
          <p className="row-title">Puntos</p>
          <p className="row-value">{participation.points}</p>
        </td>
      </tr>
    );
  }
}
