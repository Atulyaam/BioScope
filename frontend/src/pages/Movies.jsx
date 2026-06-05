import { useState, useMemo } from 'react'
import BannerSlider from '../components/shared/BannerSlider'
import MovieFilters from '../components/Movies/MovieFilters'
import MovieList from '../components/Movies/MovieList'
import { allMovies } from '../utils/constant'
import { getAllMovies } from '../apis'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

const Movies = () => {
  const [activeFilters, setActiveFilters] = useState({ languages: [], genres: [], formats: [] })

  // ✅ Fetch real movies from the API; fall back to static data if API fails
  const { data: apiResponse, isError } = useQuery({
    queryKey: ['allMovies'],
    queryFn: async () => await getAllMovies(),
    placeholderData: keepPreviousData,
  })

  if (isError) {
    console.warn('[Movies] API failed — using static fallback data')
  }

  // API returns { movies: [...] }, each with _id, title, posterUrl, genre[], language[], etc.
  const baseMovies = useMemo(() => {
    const apiMovies = apiResponse?.data?.movies
    if (Array.isArray(apiMovies) && apiMovies.length > 0) {
      return apiMovies
    }
    return allMovies // static fallback
  }, [apiResponse])

  const handleFilterChange = ({ languages, genres, formats }) => {
    setActiveFilters({ languages, genres, formats })
  }

  const filteredMovies = useMemo(() => {
    const { languages, genres, formats } = activeFilters
    const hasLanguage = languages.length > 0
    const hasGenre = genres.length > 0
    const hasFormat = formats.length > 0

    if (!hasLanguage && !hasGenre && !hasFormat) return baseMovies

    return baseMovies.filter((movie) => {
      // ── Language ──────────────────────────────────────────────────────────
      // API movies have language as string[], static have it as comma string
      const rawLangs = Array.isArray(movie.language)
        ? movie.language
        : Array.isArray(movie.languages)
          ? movie.languages
          : typeof movie.languages === 'string'
            ? movie.languages.split(',').map((l) => l.trim())
            : []
      const movieLangs = rawLangs.map((l) => l.toLowerCase())
      const languageMatch =
        !hasLanguage || languages.some((lang) => movieLangs.includes(lang.toLowerCase()))

      // ── Genre ─────────────────────────────────────────────────────────────
      // API: genre is string[], static: "Action/Drama/Sports"
      const rawGenres = Array.isArray(movie.genre)
        ? movie.genre
        : typeof movie.genre === 'string'
          ? movie.genre.split('/')
          : []
      const movieGenres = rawGenres.map((g) => g.trim().toLowerCase())
      const genreMatch =
        !hasGenre || genres.some((genre) => movieGenres.includes(genre.toLowerCase()))

      // ── Format ────────────────────────────────────────────────────────────
      const rawFormats = Array.isArray(movie.format)
        ? movie.format
        : typeof movie.format === 'string'
          ? [movie.format]
          : []
      const movieFormats = rawFormats.map((f) => f.trim().toLowerCase())
      const formatMatch =
        !hasFormat ||
        movieFormats.length === 0 ||
        formats.some((fmt) => movieFormats.includes(fmt.toLowerCase()))

      return languageMatch && genreMatch && formatMatch
    })
  }, [baseMovies, activeFilters])

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
