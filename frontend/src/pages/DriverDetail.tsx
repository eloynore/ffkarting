import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type race = {
  id: number;
  circuit: string;
  date: string;
};

type participation = {
  id: number;
  race: race;
  points: number;
  position: number;
  laptime: string;
  qualifyLapTime: string;
  trainLapTime: string;
};

export function DriverDetail() {
  const [participations, setParticipations] = useState<participation[]>();
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      let driverId: number = +id;
      const fetchParticipations = async () => {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/drivers/" +
            driverId +
            "/get_participations/"
        );
        response.json().then((data) => setParticipations(data.participations));
      };
      fetchParticipations();
    }
  }, []);

  return (
    <div>
      {participations?.map((participation) => {
        return JSON.stringify(participation);
      })}
    </div>
  );
}
