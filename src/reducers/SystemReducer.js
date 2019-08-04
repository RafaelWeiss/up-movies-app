import { handleActions, createAction } from 'redux-actions';

import { createType } from '../core/utils/ReduxUtils';

const stateKey = 'system';

/* Action Types */
export const types = {
    SYSTEM_LOADING: createType(stateKey, 'SYSTEM_LOADING'),
    SYSTEM_SCROLL_POSITION: createType(stateKey, 'SYSTEM_SCROLL_POSITION')
};

/* Actions */
export const actions = {
    setSystemLoading: createAction(types.SYSTEM_LOADING),
    setSystemScrollPosition: createAction(types.SYSTEM_SCROLL_POSITION)
};

/* Reducer */
const initialState = {
    systemLoading: false,
    systemScrollPosition: null
};

export default handleActions(
    {
        [types.SYSTEM_LOADING]: (state, { payload }) => ({
            ...state,
            systemLoading: payload
        }),
        [types.SYSTEM_SCROLL_POSITION]: (state, { payload }) => ({
            ...state,
            systemScrollPosition: payload
        })
    },
    initialState
);

/* Selectors */
export const selectors = {
    isSystemLoading: (state) => {
        return state && state[stateKey] ? state[stateKey].systemLoading === true : false;
    },
    getSystemScrollPosition: (state) => {
        return state[stateKey].systemScrollPosition;
    }
};
