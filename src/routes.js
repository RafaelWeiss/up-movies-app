import { createStackNavigator, createAppContainer } from 'react-navigation';
import MovieDetail from './screens/MovieDetail';
import MovieList from './screens/MovieList';
import styles from './core/assets/styles';
import { primaryColor } from './core/assets/styles/colors';
import AppConfig from './config';

const headerNavigator = {
    title: AppConfig.appName,
    headerTintColor: primaryColor,
    headerStyle: styles.headerStyle,
    headerBackTitleVisible: false,
    headerBackTitle: null
};

const MainNavigator = createStackNavigator(
    {
        MovieList: {
            screen: MovieList,
            navigationOptions: () => headerNavigator
        },
        MovieDetail: {
            screen: MovieDetail,
            navigationOptions: () => headerNavigator
        }
    },
    {
        initialRouteName: 'MovieList',
        headerLayoutPreset: 'center'
    }
);

export default createAppContainer(MainNavigator);
