import { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const API_KEY = "b247ac29d20f36d27c1f66fd643e2a69";

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }

      setLocation("");
    }
  };

  return (
    <div className="w-full h-screen bg-blue-100 flex flex-col items-center justify-start pt-20">
      <input
        type="text"
        className="py-3 px-6 w-[300px] sm:w-[500px] text-lg rounded-3xl border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:outline-none shadow-md"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={searchLocation}
      />

      {data.main && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-xl">{data.main.temp}°C</p>
          <p className="text-gray-600">{data.weather[0].description}</p>
          <img
            className="mx-auto mt-2"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;