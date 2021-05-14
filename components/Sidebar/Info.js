import React from 'react';
import Image from 'next/image';
import moment from 'moment';

function Info({forecast, toggleSidebar}) {
    const { title, time } = forecast;
    const weather = forecast && forecast.consolidated_weather;

    return (
        <div div className='relative flex flex-col items-center lg:w-4/12 w-full pt-16 bg-gray-800'>
            <button 
                onClick={toggleSidebar}
                placeholder='Search for places' 
                className='text-black p-2 pr-10 text-gray-400 mb-20 rounded bg-gray-600 text-white'
            >
                Search for places
            </button>
            <Image src={`/icons/${weather[0].weather_state_abbr}.svg`} width={150} height={150} alt={weather[0].weather_state_name}/>
            <p className='lg:my-20 my-6'>
                <span className='font-bold text-7xl'>{weather[0].the_temp.toFixed(0)}</span> 
                <span className='text-2xl text-gray-400'> °C</span>
            </p>
            <p className='text-3xl font-black text-gray-400'>{weather[0].weather_state_name}</p>
            <p className='pt-20 pb-4 text-gray-400'>Today <span className='px-3'>•</span> {moment(time).format("ddd, D MMM")}</p>
            <p className='text-gray-100 text-lg pb-10'><i className="fa fa-map-marker pr-2"></i> {title}</p>
        </div>
    )
}

export default Info
