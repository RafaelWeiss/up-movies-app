import request from '../core/http/request';

export default {
    getGenres() {
        return request.get('/genre', `/movie/list`, ``);
    }
};
