import { useNavigate } from "react-router-dom";
import { DriverProp } from "../helper/models";
import { useState, useEffect } from "react";
import { getImage } from "../helper/api";

export function DriverLeaderboard({
  id,
  name,
  number,
  team,
  points,
}: Readonly<DriverProp>) {
  const [teamImage, setTeamImage] = useState<string>("");
  let TeamLogo = "/logos/" + team.name + ".png";

  useEffect(() => {
    const response = getImage(TeamLogo);
    response.then((data) => (data ? setTeamImage(TeamLogo) : setTeamImage("")));
  }, [TeamLogo]);
  const pathToDetail = "/driver/" + id;
  const navigate = useNavigate();

  return (
    <tr
      style={{
        background: "linear-gradient(65deg, #ffffff, 2%,#" + team.color + ")",
      }}
    >
      <td>
        <div className="flex-row">
          {teamImage ? (
            <img
              className="helmet"
              src={teamImage}
              alt={name + " logo image"}
            />
          ) : (
            <></>
          )}
          <div>
            <p className="row-title left">#{number}</p>
            <p className="row-value left">{name}</p>
            <p className="row-title left">{team.name}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="row-title">Puntos</p>
        <p className="row-value">{points}</p>
      </td>
      <td>
        <button onClick={() => navigate(pathToDetail)}>
          <img
            className="helmet"
            src="/icons/right-arrow.svg"
            alt="Driver helmet"
          />
        </button>
      </td>
    </tr>
  );
}
