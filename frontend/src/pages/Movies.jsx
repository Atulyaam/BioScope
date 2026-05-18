import React from 'react'
import BannerSlider from '../components/shared/BannerSlider'
import MovieFilters from '../components/Movies/MovieFilters'
import MovieList from '../components/Movies/MovieList'
const Movies = () => {
  return (
    <div>
      <BannerSlider></BannerSlider>
      <div className='w-full bg-[#f5f5f5] min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row gap-4'>
          <MovieFilters />
          <MovieList></MovieList>
        </div>
      </div>
    </div>
  )
}

export default Movies