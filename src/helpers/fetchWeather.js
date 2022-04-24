export const fetchWeatherFromCurrentLocation = (handleError, handleState, otherLocation = null) => {
    navigator.geolocation.getCurrentPosition( currentPositionData => {
        const lat = otherLocation ? otherLocation[0].lat : currentPositionData.coords.latitude
        const lon = otherLocation ? otherLocation[0].lon : currentPositionData.coords.longitude

        const fetcher = async () => {
            try {   const response = 
                    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fc319bd1edba92633b7b866a438a05f0&units=metric`)

                    if(!response.ok) throw Error
                    return await response.json()    }

            catch(error) { handleError("Sorry, you will have to try another location") }   }

        fetcher().then(({ sys:{country}, name:city, main:{temp, feels_like: feel}, weather:[{icon, description}] }) => 
        handleState({country, city, temp: Math.round(temp), feel: Math.round(feel), icon, description}) ) } )  }

export const fetchCoordinatesFromOtherLocation = async (handleError, handleState, country, city) => {
    try {   const response = 
            await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=fc319bd1edba92633b7b866a438a05f0&units=metric`)
            if(!response.ok) throw Error(response)

            const data = await response.json()
            if(!data.length) throw Error
            return handleState(data)   }

    catch(error) { handleError("Sorry, you will have to try another location") }   }