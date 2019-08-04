import request from '../core/http/request';

export default {
    getConfiguration() {
        return request.get('/configuration', ``, ``);
    }
};
