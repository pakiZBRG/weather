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
                    <h1 className='text-2xl font-bold pb-10'>Today's Highlights</h1>
                    <div className='flex flex-wrap md:justify-center'>
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
                            <div className='bg-gray-100 relative mt-10 h-2 rounded-3xl'>
                                <small className='absolute left-0 -top-5 text-xs'>0</small>
                                <small className='absolute left-50 -top-5 text-xs'>50</small>
                                <small className='absolute right-0 -top-5 text-xs'>100</small>
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
                                <span className='font-black text-6xl'>{ weather[0].air_pressure }</span>mbar
                            </p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FiveDayWeather
