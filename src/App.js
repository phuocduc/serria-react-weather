import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { css } from '@emotion/core';
// First way to import

import { get } from 'https';
import './App.css';
import MoonLoader from 'react-spinners/MoonLoader';
import Moment from 'react-moment';


// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    animation: infinite 200s linear;
    display: block;
    margin:  auto;
    border-color: red;
`;


function App() {


  const [weather,setWeather] = useState(null)
  // const [icon, setIcon] = useState(null)
  // console.log(weather)
  
  const getData = async(lat,long)=>{
    const key = "888edd8f542536951089df2e4d9b742c"
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${key}&units=metric`
    const obj = await fetch(url)
    const data = await obj.json()
    setWeather({
      locationName : data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      isLoading:true,
      icon: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
      time: data.coord.dt

    })
    console.log(data)
    // setIcon("http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
  }


  const getLocation = () =>{
    navigator.geolocation.getCurrentPosition((pos)=>{
    getData(pos.coords.latitude, pos.coords.longitude)
  })
}
useEffect(()=>{
  getLocation()
},[])
 

// US/
//def function (city) to fetch data for a CITY URL =....city=${city}
// after fetch => setWeather(respn)
// async function usLocation(city)
// {
//     const key = "888edd8f542536951089df2e4d9b742c"
//     const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`
//     const obj = await fetch(url)
//     const data = await obj.json()
//     console.log('london',data)
// }







  if(!weather) return <div className='sweet-loading'>
  <MoonLoader
    css={override}
    sizeUnit={"px"}
    size={150}
    color={'#123abc'}
    loading={true}
  />
</div> 
  return (
    <div className="container-fluid text-white my-auto">
    <div className="container mx-auto my-4 py-4">
      <div className="row justify-content-center text-center">
        <h1 className="col-12 display-4 my-2 py-3 text-success">
          Awesome Weather App
        </h1>
        <h2 className="col-12 text-danger">{weather && weather.locationName}</h2>
        <img src={weather && weather.icon}/>
        <h3 className="col-12 text-danger">Temperature {weather && weather.temperature}°C</h3>
        <h3 className="col-12 text-danger">Weather Description {weather && weather.description}</h3>
        <h2 className="col-12 text-danger"><Moment interval={1000}>{weather.time}</Moment></h2>
      </div>
      <div className="btn-location">
     <button onClick={()=> getData(51.509865, -0.11809)}>London</button>
     <button onClick={()=> getData(11.628060, 107.836460)}>Bao Loc</button>
     <button onClick={()=> getData(4.210484, 101.975769)}>Malaysia</button>
     <button onClick={()=> getData(10.869956, 106.647369)}>My House</button>
     </div>
    </div>
  </div>
  );
}

export default App;
