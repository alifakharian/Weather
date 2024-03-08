import { useEffect, useState } from "react";
import "./App.css"

const App = () => {
  const apiKey = "3045dd712ffe6e702e3245525ac7fa38";
  const [Val, setVal] = useState("");

  const [Weather, setWeather] = useState([]);
  const celsus = (e) => {
    return (e - 273).toFixed(2);
  };

  const fetchWeather = async () => {
    try {
      setWeather([]);
      let data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${Val}&appid=${apiKey}`
      );

      let res = await data.json();
      setWeather([res]);
    } catch (error) {
      console.log(error.message);
    }

    console.log(Weather);
  };

  useEffect(() => {
    setVal("");
  }, []);

  return (
    <div className="main pb-[482px]">
      <div className="container  rounded-3xl">
        <div className="header text-white text-center py-10 font-extrabold tracking-[0.5rem] text-[50px]">
          FORECAST WEATHER API
        </div>
        <div className="flex flex-wrap justify-center gap-y-[10px] gap-x-[20px]">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter city ..."
            onChange={(e) => {
              setVal(e.target.value);
            }}
            value={Val}
            className="w-[80%] h-[50px] rounded-xl mt-2 outline-none text-center p-3  text-sm bg-[#e2e9e6]  shadow-inner"
          />
          <button
            class="bg-green-500 hover:bg-green-700  font-semibo text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-[15px] mt-3"
            onClick={fetchWeather}
            id="result"
          >
            result
          </button>
        </div>

        {Weather.map((elem, index) => {
          return (
            <>
              <div
                className="flex mt-3 text-center font-bold justify-center  p-5"
                key={index}
              >
                <div className="information  w-[70%] flex flex-col gap-y-[20px] py-[20px]  px-[20px]   text-indigo-200 tracking-[0.125rem] ">
                  <div className=" mx-auto text-center text-[30px]  ">
                    City name : {elem.name}
                  </div>
                  <div className=" mx-auto  text-center  text-[20px]  ">
                    Country : {elem.sys.country}
                  </div>

                  <div className=" mx-auto  text-center text-[30px]  ">
                    temputure : {celsus(elem.main.temp)} °C
                  </div>
                  <div className="text-center p-3 font-extrabold text-[22px]">
                    Humidity : {elem.main.humidity} %
                  </div>
                  <div className=" mx-auto  text-center  text-[28px]">
                    Wind-speed : {elem.wind.speed} km/h
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default App;
