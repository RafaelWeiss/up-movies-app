import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import { sagas } from './sagas';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['configuration']
};

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};
export { getStore, getState, getPersistor };
export default {
    getStore,
    getState,
    getPersistor
};
