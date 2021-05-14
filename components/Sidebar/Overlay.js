import React from 'react'

function Overlay({toggleSidebar, handleChange, toggleCity}) {
    return (
        <div className='absolute flex flex-col items-center lg:w-4/12 w-full pt-16 bg-gray-800 h-full'>
            <div className='w-9/12 flex justify-between'>
                <input 
                    onChange={handleChange('city')} 
                    type='text' 
                    placeholder='Search for places' 
                    className='outline-none text-black p-2 mb-20 rounded bg-gray-600 text-white'
                />
                <span className='cursor-pointer text-4xl' onClick={toggleSidebar}>&times;</span>
            </div>
            <div className='flex flex-col w-9/12'>
                <span className='cursor-pointer text-xl p-2 m-2 border-2 border-gray-500' onClick={() => toggleCity('Madrid')}>
                    Madrid
                </span>
                <span className='cursor-pointer text-xl p-2 m-2 border-2 border-gray-500' onClick={() => toggleCity('Berlin')}>
                    Berlin
                </span>
                <span className='cursor-pointer text-xl p-2 m-2 border-2 border-gray-500' onClick={() => toggleCity('Mumbai')}>
                    Mumbai
                </span>
            </div>
        </div>
    )
}

export default Overlay
