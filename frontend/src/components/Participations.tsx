import { useState } from "react";
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
  if (toggle) {
    return (
      <>
        <tr onClick={() => setToggle(!toggle)}>
          <td>{participation.race.circuit}</td>
          <td>{participation.points}</td>
        </tr>
        <tr onClick={() => setToggle(!toggle)}>
          <td colSpan={2}>
            <div className="race-data">
              <p>Mejor vuelta:</p>
              <p>{participation.lapTime}</p>
            </div>
            <div className="race-data">
              <p>Tiempo de clasificación:</p>
              <p>{participation.qualifyLapTime}</p>
            </div>
            <div className="race-data">
              <p>Tiempo de entrenamiento:</p>
              <p>{participation.trainLapTime}</p>
            </div>
          </td>
        </tr>
      </>
    );
  } else {
    return (
      <tr onClick={() => setToggle(!toggle)}>
        <td>{participation.race.circuit}</td>
        <td>{participation.points}</td>
      </tr>
    );
  }
}
