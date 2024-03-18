// import { useNavigate } from "react-router-dom";
import { TeamLeaderboardProp } from "../helper/models";
import { useEffect, useState } from "react";
import { getImage } from "../helper/api";

export function TeamLeaderboard({
  id,
  name,
  drivers,
  points,
  color,
}: Readonly<TeamLeaderboardProp>) {
  const [teamImage, setTeamImage] = useState<string>("");
  let TeamLogo = "/logos/" + name + ".png";

  useEffect(() => {
    const response = getImage(TeamLogo);
    response.then((data) => (data ? setTeamImage(TeamLogo) : setTeamImage("")));
  }, [TeamLogo]);

  return (
    <tr>
      <td
        style={{
          background: "linear-gradient(65deg, #ffffff, 2%,#" + color + ")",
        }}
      >
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
          <p className="row-value left">{name}</p>
        </div>
      </td>
      <td>
        <p className="row-title">Puntos</p>
        <p className="row-value">{points}</p>
      </td>
    </tr>
  );
}
