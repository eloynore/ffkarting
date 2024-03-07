import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParticipationsRaceProp } from "../helper/models";

export function RaceParticipation(
  participation: Readonly<ParticipationsRaceProp>
) {
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
          onClick={() => setToggle(false)}
        >
          <td>
            <p className="row-value left">{participation.position}º</p>
          </td>
          <td>
            <p className="row-title left">#{participation.driver.number}</p>
            <p className="row-value left">{participation.driver.name}</p>
            <p className="row-title left">{participation.driver.team.name}</p>
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
              {participation.videoURL ? (
                <a
                  href={participation.videoURL}
                  target="_blank"
                  className="btn-seeRace"
                >
                  Video
                </a>
              ) : (
                <></>
              )}
              <button
                className="btn-seeRace"
                onClick={() => navigate(pathToDriver)}
              >
                Ver piloto
              </button>
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
        onClick={() => setToggle(true)}
      >
        <td>
          <p className="row-value left">{participation.position}º</p>
        </td>
        <td>
          <p className="row-title left">#{participation.driver.number}</p>
          <p className="row-value left">{participation.driver.name}</p>
          <p className="row-title left">{participation.driver.team.name}</p>
        </td>
        <td>
          <p className="row-title">Puntos</p>
          <p className="row-value">{participation.points}</p>
        </td>
      </tr>
    );
  }
}
