import React from 'react'
import { events } from '../../utils/constant'

const LiveEvents = () => {
  return (
    <div className='w-full bg-white py-8'>
      <div className='max-w-7xl mx-auto px-4 md:px-8'>
      <h2 
      className='text-2xl font-semibold mb-6'>The Best Of Live Events</h2>
      <div
      className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'
      >
        {
          events.map((event,i)=>(
            <div
            className='rounded-xl overflow-hidden cursor-pointer relative group shadow-sm'
            key={i}
            >
              <img 
              src={event.img} 
              alt={event.title}
              className='w-full h-56 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105' />
            </div>
          ))
        }

      </div>
      </div>
    </div>
  )
}

export default LiveEvents