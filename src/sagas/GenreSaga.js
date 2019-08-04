import { all, fork, put, takeEvery } from 'redux-saga/effects';
import sagaBuilder from '../core/utils/SagaBuilder';
import genreService from '../services/GenreService';
import { actions, types } from '../reducers/GenreReducer';

function* getGenresSaga({ payload }) {
    yield* sagaBuilder(
        genreService.getGenres,
        payload,
        function* success(data) {
            yield put(actions.getGenres.success(data));
        },
        function* error(err) {
            yield put(actions.getGenres.error(err));
        },
        { multipleSuccessActions: true, loading: false }
    );
}

export function* getGenres() {
    yield takeEvery(types.GET_GENRES.REQUEST, getGenresSaga);
}

export default function* rootSaga() {
    yield all([fork(getGenres)]);
}
