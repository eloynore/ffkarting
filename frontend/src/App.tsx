import { Route, Routes } from "react-router-dom";
import { Leaderboard } from "./pages/Leaderboard";
import { Driver } from "./pages/Driver";
import { Race } from "./pages/Race";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/driver/:id" element={<Driver />} />
        <Route path="/race/:id" element={<Race />} />
      </Routes>
    </div>
  );
}

export default App;
