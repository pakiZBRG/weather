import React from 'react';
import Head from 'next/head';
import CurrentWeather from './CurrentWeather';
import FiveDayWeather from './FiveDayWeather';
import data from '../fetch';

function Layout() {
    return (
        <>
            <Head>
                <title>Weather App</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"/>
                <link href="https://unpkg.com/tailwindcss@%5E2/dist/tailwind.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
            </Head>

            <div className='flex text-white'>
                <CurrentWeather forecast={data}/>
                <FiveDayWeather forecast={data}/>
            </div>
        </>
    )
}

export default Layout
