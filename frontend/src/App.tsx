import { Route, Routes } from "react-router-dom";
import { Leaderboard } from "./pages/Leaderboard";
import { DriverDetail } from "./pages/DriverDetail";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/driver/:id" element={<DriverDetail />} />
      </Routes>
    </div>
  );
}

export default App;
