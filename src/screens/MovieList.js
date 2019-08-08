import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _ from 'lodash';
import { View, FlatList, ActivityIndicator } from 'react-native';
import styles from '../core/assets/styles';
import { primaryColor } from '../core/assets/styles/colors';

import { selectors as movieSelector, actions as movieAction } from '../reducers/MovieReducer';
import { selectors as configurationSelector, actions as configurationAction } from '../reducers/ConfigurationReducer';
import { selectors as systemSelector, actions as systemAction } from '../reducers/SystemReducer';

import AppContainer from '../components/AppContainer';
import MovieListItem from './MovieListItem';
import MovieDetailModal from './MovieDetailModal';

class MovieList extends Component {
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
        const isLoading = newProps.loadingPagination && !this.props.loadingPagination;
        return isLoading || isNewMoviesLoaded;
    }

    handleClick = (movie) => {
        this.movieModal.showModal(movie);
    };

    renderSeparator = () => {
        return <View style={styles.listSeparator} />;
    };

    handleScroll = (event) => {
        this.props.setScrollPosition(event.nativeEvent.contentOffset.y);
    };

    renderSeparator = () => {
        return <View style={styles.listSeparator} />;
    };

    handleKeepScroll = () => {
        const offset = this.props.scrollPosition;
        this.flatList.scrollToOffset({ offset, animated: false });
    };

    handleLoadMore = () => {
        const nextPage = parseInt(this.props.currentPage, 10) + parseInt(1, 10);
        if (nextPage <= this.props.lastPage && !this.props.loadingPagination) {
            this.props.getUpcomingMoviesList({ page: nextPage });
        }
    };

    renderLoadingPagination = () => {
        if (!this.props.loadingPagination) return null;
        return (
            <View style={styles.loadingPagination}>
                <ActivityIndicator color={primaryColor} />
            </View>
        );
    };

    render() {
        const { movies } = this.props;
        return (
            <AppContainer>
                {movies && (
                    <>
                        <FlatList
                            ref={(flatList) => {
                                this.flatList = flatList;
                            }}
                            data={movies}
                            renderItem={({ item, index }) => {
                                return (
                                    <MovieListItem
                                        handleClick={() => this.handleClick(item)}
                                        item={item}
                                        index={index}
                                    />
                                );
                            }}
                            onScroll={this.handleScroll}
                            keyExtractor={(item, index) => `${index} - ${item}`}
                            onEndReached={() => this.handleLoadMore()}
                            ItemSeparatorComponent={this.renderSeparator}
                            onEndReachedThreshold={0.6}
                            initialNumToRender={10}
                            maxToRenderPerBatch={8}
                            ListFooterComponent={this.renderLoadingPagination}
                        />
                        <MovieDetailModal
                            ref={(movieModal) => {
                                this.movieModal = movieModal;
                            }}
                            parentFlatList={this}
                        />
                    </>
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
    lastPage: -1,
    loadingPagination: false
};

MovieList.propTypes = {
    movies: PropTypes.array,
    configuration: PropTypes.object,
    lastPage: PropTypes.number,
    loadingPagination: PropTypes.bool,
    scrollPosition: PropTypes.number,
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
    loadingPagination: movieSelector.getUpcomingMoviesListLoading(state),
    configuration: configurationSelector.getConfiguration(state),
    scrollPosition: systemSelector.getSystemScrollPosition(state),
    movie: movieSelector.getMovieDetails(state)
});

const mapDispatchToProps = {
    getUpcomingMoviesList: movieAction.getUpcomingMoviesList.request,
    getMovieDetails: movieAction.getMovieDetails.request,
    getConfiguration: configurationAction.getConfiguration.request,
    setScrollPosition: systemAction.setSystemScrollPosition
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MovieList);
