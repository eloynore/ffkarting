import { useNavigate } from "react-router-dom";

type team = {
  id: number;
  name: string;
  color: string;
};

type driverProps = {
  id: number;
  name: string;
  number: number;
  team: team;
  points: number;
};

export function DriverLeaderboard({
  id,
  name,
  number,
  team,
  points,
}: Readonly<driverProps>) {
  const pathToDetail = "/driver/" + id;
  const navigate = useNavigate();

  return (
    <tr
      style={{
        background: "linear-gradient(65deg, #ffffff, 2%,#" + team.color + ")",
      }}
      onClick={() => navigate(pathToDetail)}
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
    </tr>
  );
}
