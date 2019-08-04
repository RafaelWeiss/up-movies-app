import { handleActions } from 'redux-actions';
import { createAsyncTypes, createAsyncActions } from '../core/utils/ReduxUtils';

const stateKey = 'genre';

/* Action Types */
export const types = {
    GET_GENRES: createAsyncTypes(stateKey, 'GET_GENRES')
};

/* Actions */
export const actions = {
    getGenres: createAsyncActions(types.GET_GENRES)
};

/* Reducer */
const initialState = {
    genres: {}
};

export default handleActions(
    {
        [types.GET_GENRES.REQUEST]: (state) => ({
            ...state,
            initialState
        }),
        [types.GET_GENRES.SUCCESS]: (state, { payload }) => ({
            ...state,
            genres: payload
        })
    },
    initialState
);

/* Selectors */
export const selectors = {
    getGenres: (state) => {
        return state[stateKey].genres;
    }
};
