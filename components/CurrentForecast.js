import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import moment from 'moment';
import FiveDayForecast from './FiveDayForecast';

function CurrentWeather({data}) {
    const [city, setCity] = useState('44418');
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState([]);

    const handleChange = () => e => setCity(e.target.value);

    // New York - 2459115
    // Los Angeles - 2442047
    // Toronto - 4118
    // London - 44418
    // Paris - 615702
    // San Francisco - 2487956
    // Berlin - 638242
    const URL = `https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${city}/`;
    
    useEffect(() => {
        fetch(URL)
            .then(res => res.json())
            .then(data => setForecast(data))
            .catch(err => setError(err))
    }, [URL]);

    const {title, time} = forecast;
    const weather = forecast && forecast.consolidated_weather;

    return (
        <>
            {weather &&
                <div className='flex flex-col items-center lg:w-4/12 w-full pt-16 bg-gray-800'>
                    <input 
                        onChange={handleChange('city')} 
                        type='text' 
                        placeholder='Search for places' 
                        className='text-black p-2 mb-20 rounded bg-gray-600 text-white'
                    />
                    <Image src={`/icons/${weather[0].weather_state_abbr}.svg`} width={150} height={150} alt={weather[0].weather_state_name}/>
                    <p className='my-20'>
                        <span className='font-bold text-7xl'>{weather[0].the_temp.toFixed(0)}</span> 
                        <span className='text-2xl text-gray-400'> °C</span>
                    </p>
                    <p className='text-3xl font-black text-gray-400'>{weather[0].weather_state_name}</p>
                    <p className='pt-20 pb-4 text-gray-400'>Today <span className='px-3'>•</span> {moment(time).format("ddd, D MMM")}</p>
                    <p className='text-gray-100 text-lg pb-10'><i className="fa fa-map-marker pr-2"></i> {title}</p>
                </div>
            }   
            <FiveDayForecast data={forecast}/>
        </>
    )
}

export default CurrentWeather
