import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ParticipationsRaceProp } from "../helper/models";
import { getImage } from "../helper/api";

export function RaceParticipation(
  participation: Readonly<ParticipationsRaceProp>
) {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathToDriver = "/driver/" + participation.driver.id;
  const navigate = useNavigate();

  const [teamImage, setTeamImage] = useState<string>("");
  let TeamLogo = "/logos/" + participation.driver.team.name + ".png";

  useEffect(() => {
    const response = getImage(TeamLogo);
    response.then((data) => (data ? setTeamImage(TeamLogo) : setTeamImage("")));
  }, [TeamLogo]);

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
        >
          <td>
            <p className="row-value left">{participation.position}º</p>
          </td>
          <td>
            <div className="flex-row">
              {teamImage ? (
                <img
                  className="helmet"
                  src={teamImage}
                  alt={participation.driver.team.name + " logo image"}
                />
              ) : (
                <></>
              )}
              <div>
                <p className="row-title left">#{participation.driver.number}</p>
                <p className="row-value left">{participation.driver.name}</p>
                <p className="row-title left">
                  {participation.driver.team.name}
                </p>
              </div>
            </div>
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
                onClick={() => navigate(pathToDriver)}
              >
                <p>Piloto</p>
                <img
                  className="helmet"
                  src="/icons/helmet-race.svg"
                  alt="Helmet"
                />
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
      >
        <td>
          <p className="row-value left">{participation.position}º</p>
        </td>
        <td>
          <div className="flex-row">
            {teamImage ? (
              <img
                className="helmet"
                src={teamImage}
                alt={participation.driver.team.name + " logo image"}
              />
            ) : (
              <></>
            )}
            <div>
              <p className="row-title left">#{participation.driver.number}</p>
              <p className="row-value left">{participation.driver.name}</p>
              <p className="row-title left">{participation.driver.team.name}</p>
            </div>
          </div>
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
