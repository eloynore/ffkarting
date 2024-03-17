// import { useNavigate } from "react-router-dom";
import { TeamLeaderboardProp } from "../helper/models";

export function TeamLeaderboard({
  id,
  name,
  drivers,
  points,
  color,
}: Readonly<TeamLeaderboardProp>) {
  // const pathToDetail = "/driver/" + id;
  // const navigate = useNavigate();

  return (
    <tr
      style={{
        background: "linear-gradient(65deg, #ffffff, 2%,#" + color + ")",
      }}
    >
      <td>
        <p className="row-value left">{name}</p>
      </td>
      <td>
        <p className="row-title">Puntos</p>
        <p className="row-value">{points}</p>
      </td>
      <td>
        {/* <button onClick={() => navigate(pathToDetail)}>
          <img
            className="helmet"
            src="/icons/right-arrow.svg"
            alt="Driver helmet"
          />
        </button> */}
      </td>
    </tr>
  );
}
