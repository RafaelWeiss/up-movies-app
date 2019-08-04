import { all, fork, put, takeEvery } from 'redux-saga/effects';
import sagaBuilder from '../core/utils/SagaBuilder';
import movieService from '../services/MovieService';
import { actions, types } from '../reducers/MovieReducer';

function* getUpcomingMoviesListSaga({ payload }) {
    yield* sagaBuilder(
        movieService.getUpcomingMoviesList,
        payload,
        function* success(data) {
            yield put(actions.getUpcomingMoviesList.success(data));
        },
        function* error(err) {
            yield put(actions.getUpcomingMoviesList.error(err));
        },
        { multipleSuccessActions: true, loading: payload.page === 1 }
    );
}

function* getMovieDetailsSaga({ payload }) {
    yield* sagaBuilder(
        movieService.getMovieDetails,
        payload,
        function* success(data) {
            yield put(actions.getMovieDetails.success(data));
        },
        function* error(err) {
            yield put(actions.getMovieDetails.error(err));
        },
        { multipleSuccessActions: true, loading: true }
    );
}

export function* getUpcomingMoviesList() {
    yield takeEvery(types.GET_UPCOMING_MOVIES_LIST.REQUEST, getUpcomingMoviesListSaga);
}

export function* getMovieDetails() {
    yield takeEvery(types.GET_MOVIE_DETAILS.REQUEST, getMovieDetailsSaga);
}

export default function* rootSaga() {
    yield all([fork(getUpcomingMoviesList), fork(getMovieDetails)]);
}
