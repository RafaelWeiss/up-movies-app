import { combineReducers } from 'redux';
import SystemReducer from './SystemReducer';
import MovieReducer from './MovieReducer';
import ConfigurationReducer from './ConfigurationReducer';
import GenreReducer from './GenreReducer';

const state = combineReducers({
    system: SystemReducer,
    movie: MovieReducer,
    configuration: ConfigurationReducer,
    genre: GenreReducer
});

export default state;
