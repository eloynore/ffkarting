import { Link } from "react-router-dom";

type team = {
  id: number;
  name: string;
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
    <tr>
      <td>
        <Link to={pathToDetail}>
          #{number} {name} / {team.name}
        </Link>
      </td>
      <td>{points}</td>
    </tr>
  );
}
