import axios from 'axios';
import AppConfig from '../../config';

const executeRequestWithApiKey = (method, path, params) => {
    return axios[method](`${AppConfig.apiUrl}${path}?api_key=${AppConfig.apiKey}${params}`);
};

export default {
    get: (path, params) => executeRequestWithApiKey('get', path, params)
};
