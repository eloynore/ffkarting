import axios from "axios";

const API_BASE_URL = "http://192.168.0.31:8000/api/v1/"; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const apiVisitor = axios.create({
  baseURL: API_BASE_URL,
});

// We will use one axios instance to intercept all requests and add our auth token
apiService.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      config.headers.Authorization = `Token ${JSON.parse(auth).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Api interfaces
interface Race {
  circuit: string;
  date: string;
  photo?: string;
}

interface Team {
  name: string;
  color?: string;
}

interface Driver {
  name: string;
  number: number;
  team: number;
}

interface RaceParticipant {
  driver: number;
  race: number;
  points: number;
  position: number;
  lapTime?: string;
  qualifyLapTime?: string;
  trainLapTime?: string;
  fastLap: boolean;
  theFasto: boolean;
  grandChelem: boolean;
  videoURL?: string;
}

interface RaceIncident {
  race: number;
  drivers: number[];
  description: string;
  videoURL?: string;
  resolution: string;
}

// Define all the routes for our token calls
export const createRace = (data: Race) => apiService.post("/races/", data);
export const createTeam = (data: Team) => apiService.post("/teams/", data);
export const createDriver = (data: Driver) =>
  apiService.post("/drivers/", data);
export const createRaceParticipant = (data: RaceParticipant) =>
  apiService.post("/raceparticipant/", data);
export const createRaceIncident = (data: RaceIncident) =>
  apiService.post("/raceincident/", data);

export const getTeams = () => apiService.get("/teams/");
export const getDrivers = () => apiService.get("/drivers/");
export const getRaces = () => apiService.get("/race/");

// Here we have all the non logged calls
export const getData = async (
  endpoint: string,
  params?: { [key: string]: any },
  headers?: { [key: string]: any }
) => {
  try {
    const options = { params, headers };
    const response = await apiVisitor.get(endpoint, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getImage = async (
  endpoint: string,
  params?: { [key: string]: any },
  headers?: { [key: string]: any }
) => {
  try {
    const options = { params, headers };
    const result = await axios.get(endpoint, options);
    return result;
  } catch (error) {
    return false;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const body = { username: username, password: password };
    const response = await apiVisitor.post("login", body);
    return response;
  } catch (error) {
    console.error(error);
  }
  return false;
};
