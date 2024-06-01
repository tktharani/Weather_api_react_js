// import logo from './logo.svg';
  import './App.css';
  import PropTypes from "prop-types";

/*images*/
import searchIcon from "./assets/search.jpg"
import cloudIcon from './assets/cloud-icon.jpg'
import sunIcon from "./assets/sun.jpg"
import clearIcon from "./assets/clear-sky.png"
import dizzleIcon from "./assets/diazzlerain.avif"
import dizzlerainIcon from "./assets/dizzle.webp"
import humditiyIcon from "./assets/humdity.webp"
import snowIcon from "./assets/snow.png"
import windIcon from "./assets/wind.avif"
import { useEffect, useState } from 'react';
import humditiy from './assets/humidity-icon.png'
import windimage from './assets/wind-icon.png'
import rainIcon from './assets/rain-icon.jpg'


 const Weatherdetails=({icon,temp,city,country,lat,long,humidity,wind})=>{
  return(
    <>
  <div className="image">
        <img src={icon} ></img>
    </div>
    <div className='temp'>{temp}C</div>
    <div className='city'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
      <div>
        <span className='lat'>latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='long'>longtitude</span>
        <span>{long}</span>
      </div>
    </div>
    <div className='data-container'>
      <div class="element">
        <img src={humditiy} style={{width:"100px", height:"100px"}} className='iocn'/>
        <div className="data">
          <div className='humditiy-percent'>{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div class="element">
        <img src={windimage} style={{width:"100px", height:"100px"}} className='iocn'/>
        <div className="data">
          <div className='wind-percent'>{wind} km/hr</div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>
    </div>

  </>
  )
 }
 
function App() {
  let api_key="c9d960bdde26034ac86b42c5cd126608"
  const[text,setText]=useState("madurai")
  const[icon,setIcon]=useState(snowIcon);
  const[temp,setTemp]=useState(0);
  const[city,setCity]=useState("");
  const[country,setCountry]=useState("");
  const[lat,setLat]=useState(0);
  const[long,setLong]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
  const[cityNotFound,setCityNotFound]=useState(false);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);
  const weatherIconMap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":dizzleIcon,
    "03n":dizzleIcon,
    "04d":dizzleIcon,
    "04n":dizzleIcon,
    "09d":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,

  }
  
  const search=async()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}
    &appid=${api_key}&units=Metric`
    try{
      let res=await fetch(url);
      let data=await res.json();
      // console.log(data);
      if(data.cod==='404'){
        console.log("city not found")
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      const weatherIconcode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconcode] || clearIcon);
      setCityNotFound(false);
  


    }
    catch(error){
      console.error("An Occured :",error.message)

    }
    finally{
      setLoading(false);

    }
   }
   const handlecity=(e)=>{
    setText(e.target.value);

   }
   const handlekeydown=(e)=>{
    if(e.key==='Enter'){
      search();
    }
   }

   useEffect(function (){
    search()
   },[])
   Weatherdetails.propTypes={
    icon:PropTypes.string.isRequired,
    temp:PropTypes.number.isRequired,
    city:PropTypes.string.isRequired,
    country:PropTypes.string.isRequired,
    humidity:PropTypes.number.isRequired,
    wind:PropTypes.number.isRequired,
    lat:PropTypes.number.isRequired,
    long:PropTypes.number.isRequired,
   }
  

  return (
    <>
    <div class="container">
        <div className="input-container">
            <input type="text" className="cityInput"  
            placeholder="search-city" onChange={handlecity} value={text}
            onKeyDown={handlekeydown}/>
            <div className="search-icon">
                <img src={searchIcon} 
                style={{width:"50px",height:"50px"}} onClick={()=>search()}/>
            </div>
            
            
        </div>
        

       {loading  && <div className='loading-message'>Loading..</div>}
        {error &&<div className='error-message'>{error}</div>}
        {cityNotFound &&<div className='city-not-found'>city not found</div>}

       { !loading && !cityNotFound &&<Weatherdetails icon={icon} temp={temp} 
        city={city} country={country} lat={lat} long={long}
        humidity={humidity} wind={wind} />}

        <p className='copyright'>
          Designed by<span>  Tharani</span>
        </p>
    </div>
    </>
  );
}

export default App;
