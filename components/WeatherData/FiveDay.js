import React, {useState} from 'react';
import moment from 'moment';
import Image from 'next/image';

function FiveDay({forecast}) {
    const [farenheit, setFarenheit] = useState(false);

    const Farenheit = () => setFarenheit(true);
    const Celsius = () => setFarenheit(false);
    
    const weather = forecast && forecast.consolidated_weather;

    return (
        <>
            <div className='flex pb-5'>
                <span className={`${farenheit ? 'bg-gray-800' : 'bg-gray-500'} cursor-pointer  w-8 py-1 rounded-full text-center m-1`} onClick={Celsius}>°C</span>
                <span className={`${farenheit ? 'bg-gray-500' : 'bg-gray-800'} cursor-pointer  w-8 py-1 rounded-full text-center m-1`} onClick={Farenheit}>F</span>
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
        </>
    )
}

export default FiveDay
