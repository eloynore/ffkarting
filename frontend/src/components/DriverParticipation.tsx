import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParticipationsDriverProp } from "../helper/models";

export function DriverParticipation(
  participation: Readonly<ParticipationsDriverProp>
) {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathToRace = "/race/" + participation.race.id;
  const navigate = useNavigate();

  if (toggle) {
    return (
      <>
        <tr onClick={() => setToggle(false)}>
          <td>
            <div className="flex-row">
              {participation.fastLap ? (
                <img
                  className="helmet"
                  src="/icons/fastlap.png"
                  alt="Fast lap"
                />
              ) : (
                <></>
              )}
              {participation.theFasto ? (
                <img
                  className="helmet"
                  src="/icons/thefasto.png"
                  alt="The fasto"
                />
              ) : (
                <></>
              )}
              {participation.grandChelem ? (
                <img
                  className="helmet"
                  src="/icons/grandchelem.png"
                  alt="Grand chelem"
                />
              ) : (
                <></>
              )}
              <div>
                <p className="row-title left">Circuito</p>
                <p className="row-value left">{participation.race.circuit}</p>
              </div>
            </div>
          </td>
          <td>
            <p className="row-title">Posición</p>
            <p className="row-value">{participation.position}º</p>
          </td>
          <td>
            <p className="row-title">Puntos</p>
            <p className="row-value">{participation.points}</p>
          </td>
          <td>
            <button onClick={() => setToggle(false)} className="helmet">
              <img src="/icons/compress.svg" alt="compress row" />
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
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
                  rel="noreferrer"
                  className="btn-seeRace flex"
                >
                  <p>Video</p>
                  <img
                    className="helmet"
                    src="/icons/play.svg"
                    alt="play video"
                  />
                </a>
              ) : (
                <></>
              )}
              <button
                className="btn-seeRace flex"
                onClick={() => navigate(pathToRace)}
              >
                <p>Carrera</p>
                <img
                  className="helmet"
                  src="/icons/checkered-flag.svg"
                  alt="checkered flag"
                />
              </button>
            </div>
          </td>
        </tr>
      </>
    );
  } else {
    return (
      <tr>
        <td>
          <div className="flex-row">
            {participation.fastLap ? (
              <img className="helmet" src="/icons/fastlap.png" alt="Fast lap" />
            ) : (
              <></>
            )}
            {participation.theFasto ? (
              <img
                className="fastlap"
                src="/icons/thefasto.png"
                alt="The fasto"
              />
            ) : (
              <></>
            )}
            {participation.grandChelem ? (
              <img
                className="fastlap"
                src="/icons/grandchelem.png"
                alt="Grand chelem"
              />
            ) : (
              <></>
            )}
            <div>
              <p className="row-title left">Circuito</p>
              <p className="row-value left">{participation.race.circuit}</p>
            </div>
          </div>
        </td>
        <td>
          <p className="row-title">Posición</p>
          <p className="row-value">{participation.position}º</p>
        </td>
        <td>
          <p className="row-title">Puntos</p>
          <p className="row-value">{participation.points}</p>
        </td>
        <td>
          <button onClick={() => setToggle(true)} className="helmet">
            <img src="/icons/expand.svg" alt="expand row" />
          </button>
        </td>
      </tr>
    );
  }
}
