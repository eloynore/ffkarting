import { useNavigate } from "react-router-dom";
import { DriverProp } from "../helper/models";

export function DriverLeaderboard({
  id,
  name,
  number,
  team,
  points,
}: Readonly<DriverProp>) {
  const pathToDetail = "/driver/" + id;
  const navigate = useNavigate();

  return (
    <tr
      style={{
        background: "linear-gradient(65deg, #ffffff, 2%,#" + team.color + ")",
      }}
    >
      <td>
        <p className="row-title left">#{number}</p>
        <p className="row-value left">{name}</p>
        <p className="row-title left">{team.name}</p>
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
