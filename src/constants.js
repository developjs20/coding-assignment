export const API_KEY = process.env.REACT_APP_API_KEY;
export const ENDPOINT = 'https://api.themoviedb.org/3'

export const getDiscoverEndpoint = (page) => `${ENDPOINT}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=vote_count.desc`;
export const getSearchEndpoint = (page, search) => `${ENDPOINT}/search/movie?api_key=${API_KEY}&page=${page}&query=${search}`;
export const getMovieEndpoint = (movieId) => `${ENDPOINT}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`;
