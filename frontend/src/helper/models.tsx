// Common properties
export type FastLapProps = {
  fastLap: boolean;
  theFasto: boolean;
  grandChelem: boolean;
};

export type TeamProp = {
  id: number;
  name: string;
  color: string;
};

export type DriverBaseProp = {
  id: number;
  name: string;
  number: number;
};

export type DriverProp = DriverBaseProp & {
  team: TeamProp;
  points: number;
};

export type RaceProp = {
  id: number;
  circuit: string;
  date: string;
};

export type ParticipationBaseProp = {
  id: number;
  points: number;
  position: number;
  lapTime: string;
  qualifyLapTime: string;
  trainLapTime: string;
  videoURL: string;
};

export type TeamLeaderboardProp = {
  id: number;
  name: string;
  drivers: DriverBaseProp[];
  color: string;
  points: number;
};

export type ParticipationsDriverProp = ParticipationBaseProp &
  FastLapProps & {
    race: RaceProp;
  };

export type ParticipationsRaceProp = ParticipationBaseProp &
  FastLapProps & {
    driver: DriverProp;
  };
