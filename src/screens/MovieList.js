import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _ from 'lodash';
import { View, FlatList, ActivityIndicator } from 'react-native';

import { selectors as movieSelector, actions as movieAction } from '../reducers/MovieReducer';
import { selectors as configurationSelector, actions as configurationAction } from '../reducers/ConfigurationReducer';
import { selectors as systemSelector, actions as systemAction } from '../reducers/SystemReducer';

import styles from '../core/assets/styles';
import { primaryColor } from '../core/assets/styles/colors';
import AppContainer from '../components/AppContainer';
import MovieListItem from './MovieListItem';

class MovieList extends Component {
    state = {
        loadingPagination: false
    };

    componentDidMount() {
        if (_.isNil(this.props.configuration)) {
            this.props.getConfiguration();
        }

        if (_.isEmpty(this.props.movies)) {
            this.props.getUpcomingMoviesList({ page: 1 });
        }
    }

    shouldComponentUpdate(newProps) {
        const isNewMoviesLoaded = this.props.movies && this.props.movies.length !== newProps.movies.length;
        return isNewMoviesLoaded;
    }

    componentWillUpdate() {
        console.log('MovieList WillUpdate');
    }

    componentDidUpdate() {
        console.log('MovieList Update');
    }

    componentWillUnmount() {
        console.log('MovieList Unmount');
    }

    handleClick = (movie) => {
        console.log('MovieList click');
        this.props.navigation.navigate('MovieDetail', {
            movieId: movie.id,
            handleKeepScroll: this.handleKeepScroll
        });
    };

    handleScroll = (event) => {
        console.log('Kepp');
        this.props.setScrollPosition(event.nativeEvent.contentOffset.y);
    };

    renderSeparator = () => {
        return <View style={styles.listSeparator} />;
    };

    handleKeepScroll = () => {
        const offset = this.props.scrollPosition;
        console.log('setScroll');
        this.flatList.scrollToOffset({ offset, animated: false });
    };

    handleLoadMore = () => {
        const nextPage = parseInt(this.props.currentPage, 10) + parseInt(1, 10);
        this.setState({ loadingPagination: true });
        if (nextPage <= this.props.lastPage && !this.state.loadingPagination) {
            this.setState({ loadingPagination: true });
            this.props.getUpcomingMoviesList({ page: nextPage });
            console.log('MovieList Load More');
        }
    };

    renderLoadingPagination = () => {
        if (!this.state.loadingPagination) return null;
        return (
            <View style={styles.loadingPagination}>
                <ActivityIndicator color={primaryColor} />
            </View>
        );
    };

    render() {
        const { movies } = this.props;
        console.log('Movie List Render');
        return (
            <AppContainer>
                {movies && (
                    <FlatList
                        ref={(flatList) => {
                            this.flatList = flatList;
                        }}
                        data={movies}
                        renderItem={({ item, index }) => {
                            return (
                                <MovieListItem handleClick={() => this.handleClick(item)} item={item} index={index} />
                            );
                        }}
                        onScroll={this.handleScroll}
                        keyExtractor={(item, index) => `${index} - ${item}`}
                        onEndReached={() => this.handleLoadMore()}
                        ItemSeparatorComponent={this.renderSeparator}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={10}
                        maxToRenderPerBatch={8}
                        ListFooterComponent={this.renderLoadingPagination}
                    />
                )}
            </AppContainer>
        );
    }
}

MovieList.defaultProps = {
    movies: [],
    navigation: {},
    configuration: null,
    scrollPosition: 0,
    lastPage: -1
};

MovieList.propTypes = {
    movies: PropTypes.array,
    configuration: PropTypes.object,
    scrollPosition: PropTypes.number,
    lastPage: PropTypes.number,
    currentPage: PropTypes.number.isRequired,
    getUpcomingMoviesList: PropTypes.func.isRequired,
    getConfiguration: PropTypes.func.isRequired,
    setScrollPosition: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func
    })
};

const mapStateToProps = (state) => ({
    movies: movieSelector.getUpcomingMoviesList(state),
    currentPage: movieSelector.getUpcomingMoviesCurrentPage(state),
    lastPage: movieSelector.getUpcomingMoviesLastPage(state),
    configuration: configurationSelector.getConfiguration(state),
    scrollPosition: systemSelector.getSystemScrollPosition(state)
});

const mapDispatchToProps = {
    getUpcomingMoviesList: movieAction.getUpcomingMoviesList.request,
    getConfiguration: configurationAction.getConfiguration.request,
    setScrollPosition: systemAction.setSystemScrollPosition
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MovieList);
