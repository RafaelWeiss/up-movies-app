import Reactotron from 'reactotron-react-native';

Reactotron.configure({ host: '10.249.0.2', port: 9090 })
    .useReactNative()
    .connect();
