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
    upcomingMoviesListLoading: false,
    movieDetails: {}
};

export default handleActions(
    {
        [types.GET_UPCOMING_MOVIES_LIST.REQUEST]: (state) => ({
            ...state,
            upcomingMoviesListLoading: true
        }),
        [types.GET_UPCOMING_MOVIES_LIST.SUCCESS]: (state, { payload }) => {
            return {
                ...state,
                upcomingMoviesListCurrentPage: payload.page,
                upcomingMoviesListLastPage: payload.total_pages,
                upcomingMoviesListLoading: false,
                upcomingMoviesList: [...state.upcomingMoviesList, ...payload.results]
            };
        },
        [types.GET_UPCOMING_MOVIES_LIST.ERROR]: (state) => ({
            ...state,
            upcomingMoviesListLoading: false
        }),
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
    getUpcomingMoviesListLoading: (state) => {
        return state[stateKey].upcomingMoviesListLoading;
    },

    getMovieDetails: (state) => {
        return state[stateKey].movieDetails;
    }
};
