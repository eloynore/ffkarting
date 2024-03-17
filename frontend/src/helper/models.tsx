export type TeamProp = {
  id: number;
  name: string;
  color: string;
};

export type DriverTeamProp = {
  id: number;
  name: string;
  number: number;
};

export type TeamLeaderboardProp = {
  id: number;
  name: string;
  drivers: DriverTeamProp[];
  color: string;
  points: number;
};

export type DriverProp = {
  id: number;
  name: string;
  number: number;
  team: TeamProp;
  points: number;
};

export type RaceProp = {
  id: number;
  circuit: string;
  date: string;
};

export type ParticipationsDriverProp = {
  id: number;
  race: RaceProp;
  points: number;
  position: number;
  lapTime: string;
  qualifyLapTime: string;
  trainLapTime: string;
  videoURL: string;
};

export type ParticipationsRaceProp = {
  id: number;
  driver: DriverProp;
  points: number;
  position: number;
  lapTime: string;
  qualifyLapTime: string;
  trainLapTime: string;
  videoURL: string;
};
