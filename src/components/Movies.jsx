import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer, closeCard }) => {

    return (
        <div data-testid="movies">
            <div class="row">
                {movies.movies.results?.map((movie) => {
                    return (
                        <Movie
                            movie={movie}
                            key={movie.id}
                            viewTrailer={viewTrailer}
                            closeCard={closeCard}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Movies
