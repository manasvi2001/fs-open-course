import { useState, useEffect } from "react"
import axios from 'axios';

const CountryDetails = ({ country }) => {
  const capitalCity = country.capital[0]
  const capitalCoordinates = country.capitalInfo.latlng
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const api_key = import.meta.env.VITE_WEATHER_API

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalCoordinates[0]}&lon=${capitalCoordinates[1]}&appid=${api_key}&units=metric`)
      .then(response => response.data)
      .then(result => setWeatherData(result))

  }, [])

  return <div>
    <h2>
      {country.name.common}
    </h2>
    <div>
      capital {capitalCity}
    </div>
    <div>
      area {country.area}
    </div>
    <h3>
      languages:
    </h3>
    <ul>
      {Object.values(country.languages).map(lang => {
        return <li key={lang}>{lang}</li>
      })}
    </ul>
    <div>
      <img style={{ width: 100 }} src={country.flags.svg} alt={country.flags.alt} />
    </div>
    {weatherData ?
      <>
        <h3>Weather in {capitalCity}</h3>
        <div>
          temperature {weatherData.main.temp} Celcius
        </div>
        {weatherData.weather.length > 0 ?
          weatherData.weather.map(weather => {
            return <div key={weather.id}>
              <img style={{ width: 75 }} src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
            </div>
          })
          : null
        }
        <div>
          wind {weatherData.wind.speed} m/s
        </div>
      </>
      : null
    }
  </div>
}

const App = () => {
  const [allCountries, setAllCountries] = useState(null)
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleInputChange = (event) => {
    setFilter(event.target.value)
    if (selectedCountry) {
      setSelectedCountry(null)
    }
  }

  const showCountryDetails = (country) => {
    setSelectedCountry(allCountries.find(countryObj => countryObj.name.common === country))
  }

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const data = response.data
        setAllCountries(data)
      })
  }, [])

  if (allCountries === null) {
    return null
  }

  const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return <>
    <div>
      find countries <input value={filter} onChange={handleInputChange} />
    </div>
    <div>
      {filteredCountries.length > 10 ?
        <div>
          Too many matches, specify another filter
        </div>
        : filteredCountries.length === 1 ?
          <CountryDetails country={filteredCountries[0]} />
          : <div>
            {filteredCountries.map(country => {
              return <div key={country.name.common}>
                {country.name.common} <button onClick={() => showCountryDetails(country.name.common)}>show</button>
              </div>
            })}
          </div>
      }
    </div>
    {selectedCountry ?
      <CountryDetails country={selectedCountry} />
      : null
    }
  </>
}

export default App
