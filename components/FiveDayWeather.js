import React from 'react';
import Image from 'next/image';
import moment from 'moment';

function FiveDayWeather({weather}) {
    return (
        <div className='mb-16 flex flex-wrap justify-around'>
            {weather.map((w, i) => (
                <div key={i} className='m-3 flex flex-col w-36 items-center bg-gray-700'>
                    <h1 className='py-4 text-gray-200'>{moment(w.applicable_date).format("ddd, D MMM")}</h1>
                    <Image className='my-10' src={`/icons/${w.weather_state_abbr}.svg`} width={70} height={60}/>
                    <div className='flex justify-between w-24 py-4'>
                        <p className='text-lg font-bold'>{w.max_temp.toFixed(0)}°C</p>
                        <p className='text-lg text-gray-500 font-bold'>{w.min_temp.toFixed(0)}°C</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FiveDayWeather
