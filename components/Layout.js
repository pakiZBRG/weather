import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Info from './Sidebar/Info';
import FiveDay from './WeatherData/FiveDay';
import TodaysHighlights from './WeatherData/TodaysHighlights';
import Overlay from './Sidebar/Overlay';

function Layout() {
    const [city, setCity] = useState('London');
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState([]);
    const [woeid, setWOEID] = useState('');
    const [open, setOpen] = useState(false);

    const URL = 'https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/';
    
    useEffect(() => {
        fetch(URL + `search/?query=${city}`)
            .then(res => res.json())
            .then(data => setWOEID(data[0].woeid))
            .catch(err => setError(err))
    
        fetch(URL + `${woeid}`)
            .then(res => res.json())
            .then(data => setForecast(data))
            .catch(err => setError(err))
    }, [city, woeid]);
    
    const handleChange = () => e => setCity(e.target.value);

    const toggleSidebar = () => setOpen(!open);

    const toggleCity = city => {
        setCity(city);
        setOpen(false);
    }

    const weather = forecast && forecast.consolidated_weather;

    return (
        <>
            <Head>
                <title>Weather App</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"/>
                <link href="https://unpkg.com/tailwindcss@%5E2/dist/tailwind.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
                <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet"/> 
            </Head>

            { weather &&
                <div className='lg:flex block text-white'>
                    <Info forecast={forecast} toggleSidebar={toggleSidebar}/>

                    { open && 
                        <Overlay 
                            toggleSidebar={toggleSidebar} 
                            handleChange={handleChange} 
                            toggleCity={toggleCity}
                        />
                    }

                    <div className='flex flex-col lg:w-8/12 w-full p-16 px-0 md:px-32 bg-gray-900'>
                        <FiveDay forecast={forecast}/>
                        <TodaysHighlights forecast={forecast}/>
                    </div>
                </div>
            }
        </>
    )
}

export default Layout
