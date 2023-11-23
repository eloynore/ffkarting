type race = {
  id: number;
  circuit: string;
  date: string;
};

type participationProps = {
  id: number;
  race: race;
  points: number;
  position: number;
  lapTime: string;
  qualifyLapTime: string;
  trainLapTime: string;
};

export function Participation({
  id,
  race,
  points,
  position,
  lapTime,
  qualifyLapTime,
  trainLapTime,
}: Readonly<participationProps>) {
  return (
    <tr>
      <td>{race.circuit}</td>
      <td>{lapTime}</td>
      <td>{points}</td>
    </tr>
  );
}
