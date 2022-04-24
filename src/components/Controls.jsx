import { useState } from "react"
import { fetchCoordinatesFromOtherLocation } from "../helpers/fetchWeather"
import { nanoid } from "nanoid"
import countryData from "../data/countries.json"
import cityData from "../data/cities.json"
import "../styles/controls.css"

const Controls = props => {
    const [otherCountry, setOtherCountry] = useState(
        {name: countryData[0]["name"], code: countryData[0]["alpha-2"], city: cityData[countryData[0]["name"]][0]})

    const setCountry = event => setOtherCountry( {...JSON.parse(event.target.value), city: cityData[JSON.parse(event.target.value).name][0]} )
    const setCity = event => setOtherCountry( prevState => ( {...prevState, city: event.target.value} ) )
    const toggleOpen = event => {document.querySelector(`#${event.target.id}Label`).classList.toggle("open")}

    return  <>  <aside className="controls-container">
                <div className="controls-country-selector">
                    <label id="countryLabel" htmlFor="country" >{otherCountry.name ? otherCountry.name : "Choose Country"}</label>
                    <select id="country" onClick={toggleOpen}
                            value={otherCountry ? JSON.stringify({name: otherCountry.name, code: otherCountry.code}) : ""} onChange={setCountry}>
                        {countryData.map(country => 
                        <option key={nanoid()} value={JSON.stringify({name: country["name"], code: country["alpha-2"]})}>{country["name"]}</option>)}
                    </select>
                </div>
                <div className="controls-city-selector" >
                    <label id="cityLabel" htmlFor="city">{otherCountry.city ? otherCountry.city : "Choose City"}</label>
                    <select onClick={toggleOpen} id="city" value={otherCountry ? otherCountry.city : ""} onChange={setCity}>
                        {cityData[otherCountry ? otherCountry.name : countryData[0].name].map(city => <option key={nanoid()} value={city}>{city}</option>)}
                    </select>
                </div>
                <button className="controls-button" onClick={()=> {
                        props.display(null)
                        fetchCoordinatesFromOtherLocation(props.handleError, props.handleState, otherCountry.code, otherCountry.city)}}>Search</button>  
                </aside>    </> }
export default Controls