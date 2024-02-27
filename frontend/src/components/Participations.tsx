import { useState } from "react";
import { useNavigate } from "react-router-dom";

type race = {
  id: number;
  circuit: string;
  date: string;
};

type participationProps = {
  id: number;
  race: race;
  points: number;
  position: number;
  lapTime: string;
  qualifyLapTime: string;
  trainLapTime: string;
};

export function Participation(participation: Readonly<participationProps>) {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathToRace = "/race/" + participation.race.id;
  const navigate = useNavigate();

  if (toggle) {
    return (
      <>
        <tr onClick={() => setToggle(!toggle)}>
          <td>
            <p className="row-title left">Circuito</p>
            <p className="row-value left">{participation.race.circuit}</p>
          </td>
          <td>
            <p className="row-title">Posición</p>
            <p className="row-value">{participation.position}º</p>
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
            <div className="race-data btn-bar">
              <button
                className="btn-seeRace"
                onClick={() => navigate(pathToRace)}
              >
                Ver carrera
              </button>
            </div>
          </td>
        </tr>
      </>
    );
  } else {
    return (
      <tr onClick={() => setToggle(!toggle)}>
        <td>
          <p className="row-title left">Circuito</p>
          <p className="row-value left">{participation.race.circuit}</p>
        </td>
        <td>
          <p className="row-title">Posición</p>
          <p className="row-value">{participation.position}</p>
        </td>
        <td>
          <p className="row-title">Puntos</p>
          <p className="row-value">{participation.points}</p>
        </td>
      </tr>
    );
  }
}
