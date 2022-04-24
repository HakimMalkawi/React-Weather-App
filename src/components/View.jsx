import countries from "../data/countries.json"
import "../styles/view.css"

const View = props => {
    const {country, city, temp, feel, icon, description} = props.weather
    return <>   <main className="view-container">
                <section className="view-content">
                    <h1 className="view-location">{countries.filter(targetCountry => targetCountry["alpha-2"] === country)[0]["name"]}, {city}</h1>
                    <img className="view-image" src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt={description} />
                    <p className="view-decription">{description}</p>
                    <h2 className={`view-temp ${temp < 20 ? "cold" : "hot"}`}>{temp}°C</h2>
                    <h3 className="view-feel">Feels like <span className={feel < 20 ? "cold" : "hot"}>{feel}°C</span></h3>
                </section>
                </main> </> }
export default View