import { Link } from "react-router-dom";

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

export function Driver({
  id,
  name,
  number,
  team,
  points,
}: Readonly<driverProps>) {
  const pathToDetail = "/driver/" + id;
  return (
    <tr
      style={{
        background: "linear-gradient(65deg, #ffffff, 2%,#" + team.color + ")",
      }}
    >
      <td>
        <Link to={pathToDetail}>
          #{number} {name} / {team.name}
        </Link>
      </td>
      <td>{points}</td>
    </tr>
  );
}
