import { all, fork, put, takeEvery } from 'redux-saga/effects';
import sagaBuilder from '../core/utils/SagaBuilder';
import configurationService from '../services/ConfigurationService';
import { actions, types } from '../reducers/ConfigurationReducer';

function* getConfigurationSaga({ payload }) {
    yield* sagaBuilder(
        configurationService.getConfiguration,
        payload,
        function*(data) {
            yield put(actions.getConfiguration.success(data));
        },
        function*(err) {
            yield put(actions.getConfiguration.error(err));
        },
        { multipleSuccessActions: true, loading: false }
    );
}

export function* getConfiguration() {
    yield takeEvery(types.GET_CONFIGURATION.REQUEST, getConfigurationSaga);
}

export default function* rootSaga() {
    yield all([fork(getConfiguration)]);
}
