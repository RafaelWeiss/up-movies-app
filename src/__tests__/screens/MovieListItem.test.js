import React from 'react';
import { shallow } from 'enzyme';
import MovieListItem from '../../screens/MovieListItem';

const itemMovie = {
    vote_count: 195,
    id: 384018,
    video: false,
    vote_average: 6.7,
    title: 'Fast & Furious Presents: Hobbs & Shaw',
    popularity: 452.935,
    poster_path: '/keym7MPn1icW1wWfzMnW3HeuzWU.jpg',
    original_language: 'en',
    original_title: 'Fast & Furious Presents: Hobbs & Shaw',
    genre_ids: [28],
    backdrop_path: '/hpgda6P9GutvdkDX5MUJ92QG9aj.jpg',
    adult: false,
    overview:
        "A spinoff of The Fate of the Furious, focusing on Johnson's US Diplomatic Security Agent Luke Hobbs forming an unlikely alliance with Statham's Deckard Shaw.",
    release_date: '2019-08-01'
};

describe('Testing Component <MovieListItem/ >', () => {
    it('should render correctly MovieListItem', () => {
        const component = shallow(<MovieListItem item={itemMovie} index={1} />);

        expect(component).toMatchSnapshot();
    });
});
