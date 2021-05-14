import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import moment from 'moment';
import Head from 'next/head';

function Layout() {
    const [city, setCity] = useState('London');
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState([]);
    const [woeid, setWOEID] = useState('');
    const [open, setOpen] = useState(false);
    const [farenheit, setFarenheit] = useState(false);

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

    const toggleSidebar = () => {
        setOpen(!open);
    }

    const Farenheit = () => setFarenheit(true)
    const Celsius = () => setFarenheit(false)

    const {title, time} = forecast;
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
                <div className='relative flex flex-col items-center lg:w-4/12 w-full pt-16 bg-gray-800'>
                    <input 
                        onClick={toggleSidebar}
                        onChange={handleChange('city')} 
                        type='text' 
                        placeholder='Search for places' 
                        className='text-black p-2 mb-20 rounded bg-gray-600 text-white'
                    />
                    <Image src={`/icons/${weather[0].weather_state_abbr}.svg`} width={150} height={150} alt={weather[0].weather_state_name}/>
                    <p className='lg:my-20 my-6'>
                        <span className='font-bold text-7xl'>{weather[0].the_temp.toFixed(0)}</span> 
                        <span className='text-2xl text-gray-400'> °C</span>
                    </p>
                    <p className='text-3xl font-black text-gray-400'>{weather[0].weather_state_name}</p>
                    <p className='pt-20 pb-4 text-gray-400'>Today <span className='px-3'>•</span> {moment(time).format("ddd, D MMM")}</p>
                    <p className='text-gray-100 text-lg pb-10'><i className="fa fa-map-marker pr-2"></i> {title}</p>
                </div>

                {open && <div className='absolute flex flex-col items-center lg:w-4/12 w-full pt-16 bg-gray-800 h-full'>
                    <div className='w-9/12 flex justify-between'>
                        <input 
                            onChange={handleChange('city')} 
                            type='text' 
                            placeholder='Search for places' 
                            className='text-black p-2 mb-20 rounded bg-gray-600 text-white'
                        />
                        <span className='cursor-pointer text-4xl' onClick={toggleSidebar}>&times;</span>
                    </div>
                </div>}

                <div className='flex flex-col lg:w-8/12 w-full p-16 px-0 md:px-32 bg-gray-900'>

                <div className='flex'>
                    <span className={`${farenheit ? 'bg-gray-800' : 'bg-gray-500' } cursor-pointer  w-8 py-1 rounded-full text-center m-1`} onClick={Celsius}>°C</span>
                    <span className={`${farenheit ? 'bg-gray-500' : 'bg-gray-800' } cursor-pointer  w-8 py-1 rounded-full text-center m-1`} onClick={Farenheit}>F</span>
                </div>   
                    <div className='mb-16 flex flex-wrap justify-around'>
                        {weather.map((w, i) => (
                            <div key={i} className='m-3 flex flex-col w-36 items-center bg-gray-700'>
                                <h1 className='py-4 text-gray-200'>{moment(w.applicable_date).format("ddd, D MMM")}</h1>
                                <Image className='my-10' src={`/icons/${w.weather_state_abbr}.svg`} width={70} height={60}/>
                                <div className='flex justify-between w-24 py-4'>
                                    <p className='text-lg font-bold'>{farenheit ? (w.max_temp * 1.8 + 32).toFixed(0) : (w.max_temp -32 * 0.5556).toFixed(0)}{farenheit ? 'F' : '°C'}</p>
                                    <p className='text-lg text-gray-500 font-bold'>{farenheit ? (w.min_temp * 1.8 + 32).toFixed(0) : (w.min_temp -32 * 0.5556).toFixed(0)}{farenheit ? 'F' : '°C'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='px-8'>
                        <h1 className='text-2xl font-bold pb-16'>Today's Highlights</h1>
                        <div className='flex flex-wrap justify-center'>
                            <div className='flex flex-col text-center bg-gray-700 px-10 text-2xl w-96 m-3 h-48'>
                                <p className='py-4 text-base'>Wind Status</p>
                                <p>
                                    <span className='font-black text-6xl'>{ weather[0].wind_speed.toFixed(0 )}</span> mph
                                </p>
                                <p className='pt-5'>
                                    <span className='bg-gray-500 px-3 pb-1 rounded-full m-3'>
                                        <i style={{transform: `rotate(${weather[0].wind_direction.toFixed(0)}deg)`}} className="fa fa-location-arrow text-sm"></i>
                                    </span>
                                    <span className='text-sm'>{ weather[0].wind_direction_compass }</span>
                                </p>
                            </div>
                            <div className='flex flex-col text-center bg-gray-700 px-10 text-2xl w-96 m-3 h-48'>
                                <p className='py-4 text-base'>Humidity</p>
                                <p>
                                    <span className='font-black text-6xl'>{ weather[0].humidity }</span>%
                                </p>
                                <div className='bg-gray-100 relative mt-9 h-2 rounded-3xl'>
                                    <small className='absolute left-0 -top-5 text-xs'>0</small>
                                    <small className='absolute left-50 -top-5 text-xs'>50</small>
                                    <small className='absolute right-0 -top-5 text-xs'>100</small>
                                    <small className='absolute right-0 top-3 text-xs'>%</small>
                                    <div style={{width: `${weather[0].humidity}%`}} className='absolute bg-yellow-300 h-2 rounded-l-3xl'></div>
                                </div>
                            </div>
                            <div className='flex flex-col text-center bg-gray-700 px-10 text-2xl w-96 m-3 h-36'>
                                <p className='py-4 text-base'>Visibility</p>
                                <p className='pb-5'>
                                    <span className='font-black text-6xl'>{ weather[0].visibility.toFixed(1) }</span>miles
                                </p>
                            </div>
                            <div className='flex flex-col text-center bg-gray-700 px-10 text-2xl w-96 m-3 h-36'>
                                <p className='py-4 text-base'>Air pressure</p>
                                <p className='pb-5'>
                                    <span className='font-black text-6xl'>{ weather[0].air_pressure.toFixed(0) }</span>mbar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Layout
