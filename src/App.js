import React, { useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useState } from 'react';


export default function App() {

  const apiKey = "07898110f558707a4dac4438fb0bb02b";
  const [data, setData] = useState({});
  const [cityName, setCity] = useState("");
  const [desc, setDesc] = useState("");

  const handleInput = (e) => {
    setCity(e.target.value);
  }
  const handleSearch = () => {
    //alert("clicked")
    getWeatherDetails(cityName);
  }
  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiUrl).then((res) => {
      setData(res.data);
      const weatherArray = res.data.weather
      const temp = weatherArray[0].description
      console.log(temp);
      setDesc(temp)

    }).catch((err) => {
      console.log("err", err)
    })
  }

  useEffect(() => {
    getWeatherDetails("delhi")
  }, [])

  return (

    <div className='col-md-12'>

      <div className='weatherBg'>
        <div>
          <h2 className='heading'>Weather App</h2>

          <div className='d-grid gap-3 col-4 mt-4'>
            <input type='text' className='form-control'
              value={cityName} onChange={handleInput} />
            <button className='btn btn-primary'
              onClick={handleSearch}>Search</button>
          </div>

        </div>
      </div>

      <div className='col-md-12 text-center mt-5'>

        <div className=' shadow rounded infor'>
          <img src='https://purepng.com/public/uploads/large/purepng.com-weather-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596142qx4ep.png' className='img1' alt="Sorry" />
          <h5 className='weatherCity'>{data?.name}</h5>
          <h6 className='descri'>{desc}</h6>
          <div className="container" style={{ marginTop: 40 }}>
            <div className="row align-items-start">
              <div className="col">
                <h6>Temperature</h6>
                <h5 className='weatherTemp'>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h5>
              </div>
              <div className="col">
                <h6>Humidity</h6>
                <h5 className='humidity'>{data?.main?.humidity}</h5>
              </div>
            </div>

          </div>

        </div>


      </div >
    </div >
  )
}

