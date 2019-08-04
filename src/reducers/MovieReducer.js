import { handleActions } from 'redux-actions';

import { createAsyncTypes, createAsyncActions } from '../core/utils/ReduxUtils';

const stateKey = 'movie';

/* Action Types */
export const types = {
    GET_UPCOMING_MOVIES_LIST: createAsyncTypes(stateKey, 'GET_UPCOMING_MOVIES_LIST'),
    GET_MOVIE_DETAILS: createAsyncTypes(stateKey, 'GET_MOVIE_DETAILS')
};

/* Actions */
export const actions = {
    getUpcomingMoviesList: createAsyncActions(types.GET_UPCOMING_MOVIES_LIST),
    getMovieDetails: createAsyncActions(types.GET_MOVIE_DETAILS)
};

/* Reducer */
const initialState = {
    upcomingMoviesListCurrentPage: 1,
    upcomingMoviesListLastPage: null,
    upcomingMoviesList: [],
    movieDetails: {}
};

export default handleActions(
    {
        [types.GET_UPCOMING_MOVIES_LIST.REQUEST]: (state) => ({
            ...state
        }),
        [types.GET_UPCOMING_MOVIES_LIST.SUCCESS]: (state, { payload }) => {
            return {
                ...state,
                upcomingMoviesListCurrentPage: payload.page,
                upcomingMoviesListLastPage: payload.total_pages,
                upcomingMoviesList: [...state.upcomingMoviesList, ...payload.results]
            };
        },
        [types.GET_MOVIE_DETAILS.REQUEST]: (state) => ({
            ...state,
            movieDetails: {}
        }),
        [types.GET_MOVIE_DETAILS.SUCCESS]: (state, { payload }) => ({
            ...state,
            movieDetails: payload
        })
    },
    initialState
);

/* Selectors */
export const selectors = {
    getUpcomingMoviesList: (state) => {
        return state[stateKey].upcomingMoviesList;
    },
    getUpcomingMoviesCurrentPage: (state) => {
        return state[stateKey].upcomingMoviesListCurrentPage;
    },
    getUpcomingMoviesLastPage: (state) => {
        return state[stateKey].upcomingMoviesListLastPage;
    },
    getMovieDetails: (state) => {
        return state[stateKey].movieDetails;
    }
};
