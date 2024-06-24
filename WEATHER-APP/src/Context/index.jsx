import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Trincomalee')
    const [thisLocation, setLocation] = useState('')

    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://weather-api99.p.rapidapi.com/weather',
            params: {
                aggregateHours: '24',
                city: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': 'c4bd239705mshf56569965352bddp1c42e5jsn305d5cf1a62b',
                'X-RapidAPI-Host': 'weather-api99.p.rapidapi.com'
            }
        }

        try {
            const response = await axios.request(options);
            console.log(response.data)

            setLocation(response.data.name)
            setValues(response.data.values)
            setWeather(response.data.values[0])
        } catch (e) {
            console.error(e);
            
            alert('An Error Occurred ');
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [place])

    useEffect(() => {
        console.log(values)
    }, [values])

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)