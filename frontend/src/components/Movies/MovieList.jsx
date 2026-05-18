import React from 'react'
import { allMovies } from '../../utils/constant'
import MovieCard from './MovieCard'

const MovieList = () => {
  return (
    <div className='w-full md:w-3/4 p-4'>
      <div className='flex justify-between items-center bg-white px-6 py-6 rounded mb-6'>
        <h3 className='font-semibold text-xl'>Comming Soon</h3>
        <a href="#" className='text-[#f74362]'>
            Explore Upcoming Movies 
            <span className='ml-0'>→</span>
            
        </a>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {
          allMovies.map((movie,i)=>(
            <MovieCard key={i} movie = {movie}></MovieCard>
          ))
        }

      </div>

    </div>
  )
}

export default MovieList