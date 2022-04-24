import { useState, useEffect } from "react"
import { fetchWeatherFromCurrentLocation } from "../helpers/fetchWeather"
import PreLoader from "./PreLoader"
import View from "./View"
import Controls from "./Controls"
import "../styles/overlay.css"

const Overlay = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [otherLocation, setOtherLocation] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>fetchWeatherFromCurrentLocation(setError, setWeatherData, otherLocation), [otherLocation])

    return  <>  <div className={error ? "main-container error" : "main-container"}>
                <div className="overlay-container">
                    { !weatherData && <PreLoader /> }
                    { weatherData && <View weather={weatherData} /> }
                    <Controls handleError={setError} handleState={setOtherLocation} display={setWeatherData}/>
                    { error && 
                    <div className="error-container">
                        <h1 className="error-title">{error}</h1>
                        <button className="error-button" onClick={()=>setError(null)}>ok</button>
                    </div>  }
                </div>    
                </div>  </> }
export default Overlay