// Common properties
export type DetailProps = {
  imagePath: string;
  title: string;
  data?: string | number;
  unit: string;
};

export type FastLapProps = {
  fastLap?: boolean;
  theFasto?: boolean;
  grandChelem?: boolean;
};

export type TeamProp = {
  id: number;
  name: string;
  color?: string;
  logo?: string; // Campo condicional para el logo
};

export type DriverBaseProp = {
  id: number;
  name: string;
  number: number;
};

export type DriverPointProp = DriverBaseProp & {
  points: number;
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
  lapTime?: string; // conditional field
  qualifyLapTime?: string; // conditional field
  trainLapTime?: string; // conditional field
  avgTime?: string; // conditional field
  qualifyAvgTime?: string; // conditional field
  trainAvgTime?: string; // conditional field
  videoURL?: string; // conditional field
};

export type TeamLeaderboardProp = {
  id: number;
  name: string;
  drivers: DriverPointProp[];
  color: string;
  points: number;
  logo?: string; // conditinal logo url
};

export type ParticipationsDriverProp = ParticipationBaseProp &
  FastLapProps & {
    race: RaceProp;
  };

export type ParticipationsRaceProp = ParticipationBaseProp &
  FastLapProps & {
    driver: DriverProp;
  };
