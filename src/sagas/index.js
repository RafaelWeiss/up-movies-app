import { all } from 'redux-saga/effects';
import configurationSaga from './ConfigurationSaga';
import genreSaga from './GenreSaga';
import movieSaga from './MovieSaga';

export function* sagas() {
    yield all([configurationSaga(), genreSaga(), movieSaga()]);
}
