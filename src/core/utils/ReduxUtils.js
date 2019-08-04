import { createAction } from 'redux-actions';
import AppConfig from '../../config';

export const createType = (stateKey, type) => `${AppConfig.appName}/${stateKey}/${type}`;

export const createAsyncTypes = (stateKey, type) => ({
    REQUEST: `${createType(stateKey, type)}_REQUEST`,
    SUCCESS: `${createType(stateKey, type)}_SUCCESS`,
    ERROR: `${createType(stateKey, type)}_ERROR`
});

export const createAsyncActions = (asyncTypes) => ({
    request: createAction(asyncTypes.REQUEST),
    success: createAction(asyncTypes.SUCCESS),
    error: createAction(asyncTypes.ERROR)
});
