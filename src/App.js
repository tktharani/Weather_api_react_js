// import logo from './logo.svg';
  import './App.css';

/*images*/
import searchIcon from "./assets/search.jpg"
import sunIcon from "./assets/sun.jpg"
import clearIcon from "./assets/clear-sky.png"
import dizzleIcon from "./assets/diazzlerain.avif"
import dizzlerainIcon from "./assets/dizzle.webp"
import humditiyIcon from "./assets/humdity.webp"
import snowIcon from "./assets/snow.png"
import windIcon from "./assets/wind.avif"
import { useState } from 'react';
import humditiy from './assets/humidity-icon.png'
import windimage from './assets/wind-icon.png'


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
  const[icon,setIcon]=useState(snowIcon);
  const[temp,setTemp]=useState(0);
  const[city,setCity]=useState("madurai");
  const[country,setCountry]=useState("India");
  const[lat,setLat]=useState(0);
  const[long,setLong]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);

  return (
    <>
    <div class="container">
        <div className="input-container">
            <input type="text" className="cityInput"  placeholder="search-city"/>
            <div className="search-icon">
                <img src={searchIcon} style={{width:"50px",height:"50px"}} />
            </div>
            
            
        </div>
        <Weatherdetails icon={icon} temp={temp} 
        city={city} country={country} lat={lat} long={long}
        humidity={humidity} wind={wind} />
        <p className='copyright'>
          Designed by<span>  Tharani</span>
        </p>
    </div>
    </>
  );
}

export default App;
