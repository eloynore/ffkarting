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

export function Driver({ id, name, number, team, points }: driverProps) {
  return (
    <tr>
      <td>
        #{number} {name} / {team.name}
      </td>
      <td>{points}</td>
    </tr>
  );
}
