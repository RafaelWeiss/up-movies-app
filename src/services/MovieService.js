import request from '../core/http/request';

export default {
    getUpcomingMoviesList(params) {
        return request.get('/movie/upcoming', `&page=${params.page}`);
    },

    getMovieDetails(params) {
        return request.get(`/movie/${params}`, ``);
    }
};
