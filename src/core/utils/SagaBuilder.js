import { call, put } from 'redux-saga/effects';
import { actions as SystemAction } from '../../reducers/SystemReducer';

export default function*(
    fn,
    parameter,
    success,
    failure,
    settings = { multipleSuccessActions: false, loading: false }
) {
    try {
        if (settings.loading) {
            yield put(SystemAction.setSystemLoading(true));
        }
        const response = yield call(fn, parameter);
        let data = {};
        if (response) {
            data = response.data ? response.data : response;
        }
        yield settings.multipleSuccessActions ? call(success, data) : put(success(data));
        yield put(SystemAction.setSystemLoading(false));
    } catch (error) {
        yield put(SystemAction.setSystemLoading(false));
        yield call(failure, error);
    }
}
