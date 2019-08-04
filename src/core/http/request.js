import axios from 'axios';
import AppConfig from '../../config';

const executeRequestWithApiKey = (method, context, url, params) => {
    return axios[method](`${AppConfig.apiUrl}${context}${url}?api_key=${AppConfig.apiKey}${params}`);
};

export default {
    get: (context, url, params) => executeRequestWithApiKey('get', context, url, params)
};
