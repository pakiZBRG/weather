import React from 'react';
import Image from 'next/image';
import moment from 'moment';

function CurrentWeather({data}) {
    const {title, time} = data;
    const weather = data && data.consolidated_weather;

    return (
        <>
            {weather &&
                <div className='flex flex-col items-center w-4/12 p-8 bg-gray-800'>
                    <input type='text' placeholder='Search for places' className='text-black p-2 mb-20 rounded bg-gray-600 text-white'/><br/>
                    <Image src={`/icons/${weather[0].weather_state_abbr}.svg`} width={150} height={150} alt={weather[0].weather_state_name}/>
                    <p className='my-16'>
                        <span className='font-bold text-7xl'>{weather[0].the_temp.toFixed(0)}</span> 
                        <span className='text-2xl text-gray-400'>°C</span>
                    </p>
                    <p className='text-2xl font-black text-gray-400'>{weather[0].weather_state_name}</p>
                    <p className='pt-16 pb-4 text-gray-400'>Today <span className='px-3'>•</span> {moment(time).format("ddd, D MMM")}</p>
                    <p className='text-gray-400'><i className="fa fa-map-marker pr-2"></i> {title}</p>
                </div>
            }   
        </>
    )
}

export default CurrentWeather
