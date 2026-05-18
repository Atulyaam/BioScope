import React, { useState } from 'react'
import { languages } from '../../utils/constant'

const genres = [
  'Action', 'Drama', 'Comedy', 'Thriller', 'Horror',
  'Romance', 'Sci-Fi', 'Animation', 'Adventure', 'Fantasy'
]

const formats = ['2D', '3D', 'IMAX', '4DX', 'Dolby']

function MovieFilters({ onFilterChange }) {
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedFormats, setSelectedFormats] = useState([])

  const toggle = (value, list, setList) => {
    const updated = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value]
    setList(updated)
    if (onFilterChange) onFilterChange({ languages: selectedLanguages, genres: selectedGenres, formats: selectedFormats })
  }

  const clearAll = () => {
    setSelectedLanguages([])
    setSelectedGenres([])
    setSelectedFormats([])
    if (onFilterChange) onFilterChange({ languages: [], genres: [], formats: [] })
  }

  const FilterSection = ({ title, items, selected, onToggle, onClear }) => (
    <div className='bg-white p-4 rounded-md mb-3 shadow-sm'>
      <div className='flex justify-between items-center mb-3'>
        <span className='font-semibold '>{title}</span>
        {selected.length > 0 && (
          <button onClick={onClear} className='text-[#f74362] text-xs font-medium hover:underline'>
            Clear
          </button>
        )}
      </div>
      <div className='flex flex-wrap gap-2'>
        {items.map((item) => (
          <span
            key={item}
            onClick={() => onToggle(item)}
            className={`px-3 py-1 text-sm rounded-full border cursor-pointer transition-all duration-200 ${
              selected.includes(item)
                ? 'bg-[#f74362] text-white border-[#f74362]'
                : 'border-gray-300 text-[#f74362] hover:border-[#f74362] hover:text-gray-700'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )

  const hasAnyFilter = selectedLanguages.length > 0 || selectedGenres.length > 0 || selectedFormats.length > 0

  return (
    <div className='w-full md:w-1/4 p-4 space-y-1'>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-xl font-bold text-gray-900'>Filters</h2>
        {hasAnyFilter && (
          <button onClick={clearAll} className='text-[#f74362] text-sm font-medium hover:underline'>
            Clear All
          </button>
        )}
      </div>

      <FilterSection
        title='Languages'
        items={languages}
        selected={selectedLanguages}
        onToggle={(v) => toggle(v, selectedLanguages, setSelectedLanguages)}
        onClear={() => setSelectedLanguages([])}
      />

      <FilterSection
        title='Genres'
        items={genres}
        selected={selectedGenres}
        onToggle={(v) => toggle(v, selectedGenres, setSelectedGenres)}
        onClear={() => setSelectedGenres([])}
      />

      <FilterSection
        title='Formats'
        items={formats}
        selected={selectedFormats}
        onToggle={(v) => toggle(v, selectedFormats, setSelectedFormats)}
        onClear={() => setSelectedFormats([])}
      />



      <div>
        
      </div>
    </div>
  )
}

export default MovieFilters