import React, { useState, useEffect } from "react";
import { getData } from "../helper/api"; // Import your API functions

function MyComponent() {
  const [data, setData] = useState(null);

  // Fetch data when the component mounts
  async function fetchData() {
    const result = await getData("races");
    setData(result);
  }
  // useEffect block
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          {/* Render the fetched data */}
          <h1>{data}</h1>
          <p>{data}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;
