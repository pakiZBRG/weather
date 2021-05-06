import React from 'react';
import Image from 'next/image';

function CurrentWeather({data}) {
    const {title, time} = data;
    const weather = data && data.consolidated_weather;

    return (
        <>
            {data && weather &&
                <div className='w-4/12 p-8 bg-indigo-700'>
                    <Image src={`/icons/${weather[0].weather_state_abbr}.svg`} width={100} height={100} alt={weather[0].weather_state_name}/>
                    <p>{weather[0].weather_state_abbr}</p>
                    <p>{weather[0].the_temp.toFixed(0)} °C</p>
                    <p>{weather[0].weather_state_name}</p>
                    <p>Today • {time}</p>
                    <p>{title}</p>
                </div>
            }   
        </>
    )
}

export default CurrentWeather
