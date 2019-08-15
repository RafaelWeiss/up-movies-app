import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
        const configReturn = config;
        configReturn.headers = config.headers || {};
        configReturn.headers['Access-Control-Allow-Origin'] = '*';
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        let response = error ? error.response : {};
        if (error.response.status && error.response.status === 404) {
            response = 'msg.httpNotFound';
        }
        return Promise.reject(response);
    }
);
