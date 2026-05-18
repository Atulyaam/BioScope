import React from 'react'

const MovieCard = ({ movie }) => {
  return (
    <div className='w-full cursor-pointer'>
      <img src={movie.img} alt={movie.title} className='rounded-lg shadow-md' />
      <p className='mt-2 font-medium'>{movie.title}</p>
      <p className='text-xs text-gray-500'>{movie.rating}| {movie.votes}</p>
      <p className='text-sm text-gray-600'>{movie.age}</p>
      <p>{movie.languages}</p>
    </div>
  )
}

export default MovieCard