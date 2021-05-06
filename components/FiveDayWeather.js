import React from 'react'
import Image from 'next/image';
import moment from 'moment';

function FiveDayWeather({data}) {
    const weather = data && data.consolidated_weather;

    return (
        <>
            {weather &&
                <div className='flex flex-col w-8/12 p-8 bg-indigo-900'>
                    <div className='mb-10 flex flex-wrap justify-around'>
                        {weather.map((w, i) => (
                            <div key={i}>
                                <h1>{moment(w.applicable_date).format("ddd, D MMM")}</h1>
                                <Image src={`/icons/${w.weather_state_abbr}.svg`} width={70} height={70}/>
                                <p>{w.min_temp.toFixed(0)} °C</p>
                                <p>{w.max_temp.toFixed(0)} °C</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h1>Today's Highlights</h1>
                        <p>Wind Status { weather[0].wind_speed.toFixed(0 )} <small>{ weather[0].wind_direction.toFixed(0) }</small> mph { weather[0].wind_direction_compass }</p>
                        <p>Humidity { weather[0].humidity }%</p>
                        <p>Visibility { weather[0].visibility.toFixed(1) } miles</p>
                        <p>Air pressure { weather[0].air_pressure } mbar</p>
                    </div>
                </div>
            }
        </>
    )
}

export default FiveDayWeather
