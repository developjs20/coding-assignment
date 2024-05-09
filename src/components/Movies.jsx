import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer, closeCard, loadMoreRef }) => {
    const isLoadMoreVisible = movies.movies?.page < movies.movies?.total_pages;
    return (
        <div data-testid="movies">
            <div className="row">
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
            {isLoadMoreVisible && (<div className="load-more" ref={loadMoreRef}>Load more...</div>)}
        </div>
    )
}

export default Movies
