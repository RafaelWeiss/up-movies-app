import React, { Component } from 'react';
import './reactotron.config';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { registerAxiosInterceptors } from './src/core/http/axios';
import { getStore, getPersistor } from './src/store';
import MainNavigator from './src/routes';

registerAxiosInterceptors();

class App extends Component {
    render() {
        const store = getStore();
        const persistor = getPersistor();
        return (
            <PersistGate persistor={persistor}>
                <Provider store={store}>
                    <MainNavigator />
                </Provider>
            </PersistGate>
        );
    }
}

export default App;
