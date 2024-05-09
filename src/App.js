import {useEffect, useState} from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import {getSearchEndpoint, getDiscoverEndpoint, getMovieEndpoint} from './constants'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import MovieModal from './components/MovieModal'
import './app.scss'


const App = () => {
  const state = useSelector((state) => state)
  const { movies } = state
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()
  const {loadMoreRef, page, setPage} = useInfiniteScroll();

  const closeModal = () => setOpen(false)

  const closeCard = () => {}

  useEffect(() => {
      console.log('useEffect');
      getMovies(searchQuery)
  }, [page])

  const getMovies = (searchQuery = '') => {
    if (searchQuery) {
        dispatch(fetchMovies(getSearchEndpoint(page, searchQuery)))
        setSearchParams(createSearchParams({ search: searchQuery }))
    } else {
        dispatch(fetchMovies(getDiscoverEndpoint(page)))
        setSearchParams()
    }
  };

  const searchMovies = (query) => {
    navigate('/');
    setPage(1);
    window.scrollTo(0,0);
    if (!query) return;
    getMovies(query);
  }

  const viewTrailer = async (movie) => {
    await getMovie(movie.id)
    setOpen(true)
  }

  const getMovie = async (id) => {
    setVideoKey(null)
    const videoData = await fetch(getMovieEndpoint(id))
      .then((response) => {
        return response.json();
      })
    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        <MovieModal isOpen={isOpen} onRequestClose={closeModal} videoKey={videoKey} />

        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} loadMoreRef={loadMoreRef}/>} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
