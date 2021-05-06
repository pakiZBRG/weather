import React from 'react';
import Image from 'next/image';
import moment from 'moment';

function CurrentWeather({data}) {
    const {title, time} = data;
    const weather = data && data.consolidated_weather;

    return (
        <>
            {weather &&
                <div className='w-4/12 p-8 bg-indigo-800'>
                    <input type='text' placeholder='Search for places' className='text-black'/><br/>
                    <Image src={`/icons/${weather[0].weather_state_abbr}.svg`} width={100} height={100} alt={weather[0].weather_state_name}/>
                    <p>{weather[0].the_temp.toFixed(0)} °C</p>
                    <p>{weather[0].weather_state_name}</p>
                    <p>Today • {moment(time).format("ddd, D MMM")}</p>
                    <p>{title}</p>
                </div>
            }   
        </>
    )
}

export default CurrentWeather
