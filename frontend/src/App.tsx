import { Route, Routes } from "react-router-dom";
import { Leaderboard } from "./pages/Leaderboard";
import { Teams } from "./pages/Teams";
import { Driver } from "./pages/Driver";
import { Race } from "./pages/Race";
import Incidents from "./pages/Incidents";
import Navbar from "./navbar/Navbar";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/Login";
import { Admin } from "./pages/Admin";
import { Edit } from "./pages/Edit";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/driver/:id" element={<Driver />} />
        <Route path="/race/:id" element={<Race />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
