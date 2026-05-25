import React, { useState } from 'react'
import BannerSlider from '../components/shared/BannerSlider'
import MovieFilters from '../components/Movies/MovieFilters'
import MovieList from '../components/Movies/MovieList'
import { allMovies } from '../utils/constant'

const Movies = () => {
  const [filteredMovies, setFilteredMovies] = useState(allMovies)

  const handleFilterChange = ({ languages, genres, formats }) => {
    const hasLanguage = languages.length > 0
    const hasGenre = genres.length > 0
    const hasFormat = formats.length > 0

    if (!hasLanguage && !hasGenre && !hasFormat) {
      setFilteredMovies(allMovies)
      return
    }

    const result = allMovies.filter((movie) => {
      // ── Language ──────────────────────────────────────────────────────────
      // movie.languages is "English, Hindi, Tamil, Telugu"
      const movieLanguages = movie.languages
        ? movie.languages.split(',').map((l) => l.trim().toLowerCase())
        : []
      const languageMatch =
        !hasLanguage ||
        languages.some((lang) => movieLanguages.includes(lang.toLowerCase()))

      // ── Genre ─────────────────────────────────────────────────────────────
      // movie.genre is "Action/Drama/Sports"
      const movieGenres = movie.genre
        ? movie.genre.split('/').map((g) => g.trim().toLowerCase())
        : []
      const genreMatch =
        !hasGenre ||
        genres.some((genre) => movieGenres.includes(genre.toLowerCase()))

      // ── Format ────────────────────────────────────────────────────────────
      // movie.format is an array like ["2D","IMAX"] — not in allMovies yet,
      // so treat a missing field as "matches all formats" to avoid hiding movies.
      const movieFormats = Array.isArray(movie.format)
        ? movie.format.map((f) => f.trim().toLowerCase())
        : []
      const formatMatch =
        !hasFormat ||
        movieFormats.length === 0 ||
        formats.some((fmt) => movieFormats.includes(fmt.toLowerCase()))

      return languageMatch && genreMatch && formatMatch
    })

    setFilteredMovies(result)
  }

  return (
    <div>
      <BannerSlider />
      <div className='w-full bg-[#f5f5f5] min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row gap-4'>
          <MovieFilters onFilterChange={handleFilterChange} />
          <MovieList filteredMovies={filteredMovies} />
        </div>
      </div>
    </div>
  )
}

export default Movies
