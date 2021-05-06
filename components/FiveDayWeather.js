import React from 'react'
import Image from 'next/image';
import moment from 'moment';

function FiveDayWeather({data}) {
    const weather = data && data.consolidated_weather;

    return (
        <>
            {weather &&
                <div className='flex flex-col w-8/12 p-16 px-32 bg-gray-900'>
                    <div className='mb-10 flex flex-wrap justify-around'>
                        {weather.map((w, i) => (
                            <div key={i} className='m-3 flex flex-col w-36 items-center bg-gray-700'>
                                <h1 className='py-4'>{moment(w.applicable_date).format("ddd, D MMM")}</h1>
                                <Image className='my-10' src={`/icons/${w.weather_state_abbr}.svg`} width={70} height={60}/>
                                <div className='flex justify-between w-20 py-4'>
                                    <p className='text-lg'>{w.max_temp.toFixed(0)}°C</p>
                                    <p className='text-lg text-gray-500'>{w.min_temp.toFixed(0)}°C</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h1>Today's Highlights</h1>
                    <div className='flex flex-wrap justify-between'>
                        <div className='flex flex-col bg-gray-700 p-10 text-2xl w-96 m-3'>
                            <p>Wind Status</p>
                            <p>{ weather[0].wind_speed.toFixed(0 )} mph</p>
                            <p><small>{ weather[0].wind_direction.toFixed(0) }</small>{ weather[0].wind_direction_compass }</p>
                        </div>
                        <div className='flex flex-col bg-gray-700 p-10 text-2xl w-96 m-3'>
                            <p>Humidity</p>
                            <p>{ weather[0].humidity }%</p>
                            </div>
                        <div className='flex flex-col bg-gray-700 p-10 text-2xl w-96 m-3'>
                            <p>Visibility</p>
                            <p>{ weather[0].visibility.toFixed(1) } miles</p>
                        </div>
                        <div className='flex flex-col bg-gray-700 p-10 text-2xl w-96 m-3'>
                            <p>Air pressure</p>
                            <p>{ weather[0].air_pressure } mbar</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FiveDayWeather
