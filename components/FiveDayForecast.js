import React from 'react'
import FiveDayWeather from './FiveDayWeather';
import TodayHighlights from './TodayHighlights';

function FiveDayForecastt({data}) {
    const weather = data && data.consolidated_weather;

    return (
        <>
            {weather &&
                <div className='flex flex-col lg:w-8/12 w-full p-16 px-32 bg-gray-900'>
                    <FiveDayWeather weather={weather}/>
                    <TodayHighlights weather={weather}/>
                </div>
            }
        </>
    )
}

export default FiveDayForecastt
