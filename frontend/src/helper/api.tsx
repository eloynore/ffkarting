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
  logo: File | null;
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
  lapTime?: string; // conditional field
  qualifyLapTime?: string; // conditional field
  trainLapTime?: string; // conditional field
  avgTime?: string; // conditional field
  qualifyAvgTime?: string; // conditional field
  trainAvgTime?: string; // conditional field
  fastLap: boolean;
  theFasto: boolean;
  grandChelem: boolean;
  videoURL?: string; // conditional field
}

interface Incident {
  race: number;
  drivers: number[];
  description: string;
  videoURL?: string;
  resolution: string;
}

// Define all the routes for our token calls

// Team  race
export const createRace = (data: Race) => apiService.post("/races/", data);
export const updateRace = (id: number, data: Race) =>
  apiService.put(`/races/${id}/`, data);
export const deleteRace = (id: number) => apiService.delete(`/races/${id}/`);
export const getRace = (id: number) => apiService.get(`/races/${id}/`);
export const getRaces = () => apiService.get("/races/");

// Team routes
export const createTeam = (data: Team) => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.color) formData.append("color", data.color);
  if (data.logo) formData.append("logo", data.logo);

  return apiService.post("/teams/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateTeam = (id: number, data: Team) => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.color) formData.append("color", data.color);
  if (data.logo) formData.append("logo", data.logo);

  return apiService.put(`/teams/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteTeam = (id: number) => apiService.delete(`/teams/${id}/`);
export const getTeam = (id: number) => apiService.get(`/teams/${id}/`);
export const getTeams = () => apiService.get("/teams/");

// Driver routes
export const createDriver = (data: Driver) =>
  apiService.post("/drivers/", data);
export const updateDriver = (id: number, data: Driver) =>
  apiService.put(`/drivers/${id}/`, data);
export const deleteDriver = (id: number) =>
  apiService.delete(`/drivers/${id}/`);
export const getDriver = (id: number) => apiService.get(`/drivers/${id}/`);
export const getDrivers = () => apiService.get("/drivers/");

// Participation routes
export const createParticipant = (data: RaceParticipant) =>
  apiService.post("/participant/", data);
export const updateRaceParticipant = (id: number, data: RaceParticipant) =>
  apiService.put(`/participant/${id}/`, data);
export const deleteParticipant = (id: number) =>
  apiService.delete(`/participant/${id}/`);
export const getParticipant = (id: number) =>
  apiService.get(`/participant/${id}/`);

// Incident routes
export const createIncident = (data: Incident) =>
  apiService.post("/incident/", data);
export const updateIncident = (id: number, data: Incident) =>
  apiService.put(`/raceincident/${id}/`, data);
export const deleteIncident = (id: number) =>
  apiService.delete(`/incident/${id}/`);
export const getIncident = (id: number) => apiService.get(`/incident/${id}/`);

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
