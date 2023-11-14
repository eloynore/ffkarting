import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

type driver = {
  id: number;
  name: string;
  number: number;
  team: number;
};

function App() {
  const [drivers, setDrivers] = useState<driver[]>();

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/v1/drivers/");
      response.json().then((data) => setDrivers(data));
    };
    fetchDrivers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {drivers?.map((item) => JSON.stringify(item))}
      </header>
    </div>
  );
}

export default App;
