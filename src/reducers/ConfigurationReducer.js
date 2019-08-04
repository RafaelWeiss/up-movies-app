import { handleActions } from 'redux-actions';
import { createAsyncTypes, createAsyncActions } from '../core/utils/ReduxUtils';

const stateKey = 'configuration';

/* Action Types */
export const types = {
    GET_CONFIGURATION: createAsyncTypes(stateKey, 'GET_CONFIGURATION')
};

/* Actions */
export const actions = {
    getConfiguration: createAsyncActions(types.GET_CONFIGURATION)
};

/* Reducer */
const initialState = {
    configuration: null
};

export default handleActions(
    {
        [types.GET_CONFIGURATION.REQUEST]: (state) => ({
            ...state,
            configuration: null
        }),
        [types.GET_CONFIGURATION.SUCCESS]: (state, { payload }) => ({
            ...state,
            configuration: payload
        })
    },
    initialState
);

/* Selectors */
export const selectors = {
    getConfiguration: (state) => {
        return state[stateKey].configuration;
    }
};
