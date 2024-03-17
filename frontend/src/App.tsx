import { Route, Routes } from "react-router-dom";
import { Leaderboard } from "./pages/Leaderboard";
import { Teams } from "./pages/Teams";
import { Driver } from "./pages/Driver";
import { Race } from "./pages/Race";
import "./App.css";
import Navbar from "./navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/driver/:id" element={<Driver />} />
        <Route path="/race/:id" element={<Race />} />
      </Routes>
    </div>
  );
}

export default App;
