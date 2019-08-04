import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _ from 'lodash';
import { View, ActivityIndicator, ScrollView } from 'react-native';

import { selectors as movieSelector, actions as movieAction } from '../reducers/MovieReducer';
import { selectors as configurationSelector, actions as configurationAction } from '../reducers/ConfigurationReducer';
import { selectors as systemSelector, actions as systemAction } from '../reducers/SystemReducer';

import styles from '../core/assets/styles';
import AppContainer from '../components/AppContainer';
import MovieListItem from './MovieListItem';
import { primaryColor } from '../core/assets/styles/colors';

class MovieList2 extends Component {
    state = {
        loadingPagination: false
    };

    componentDidMount() {
        if (_.isNil(this.props.configuration)) {
            this.props.getConfiguration();
        }
        this.props.getUpcomingMoviesList({ page: 1 });
    }

    shouldComponentUpdate(newProps) {
        const isNewMoviesLoaded = this.props.movies && this.props.movies.length !== newProps.movies.length;
        return isNewMoviesLoaded || this.state.loadingPagination;
    }

    componentDidUpdate() {
        console.log('UPDATE');
    }

    handleClick = (movie) => {
        this.props.navigation.navigate('MovieDetail', { movieId: movie.id, handleKeepScroll: this.handleKeepScroll });
    };

    renderSeparator = () => {
        return <View style={styles.listSeparator} />;
    };

    renderLoadingPagination = () => {
        if (!this.state.loadingPagination) return null;
        return (
            <View style={styles.loadingPagination}>
                <ActivityIndicator color={primaryColor} />
            </View>
        );
    };

    handleKeepScroll = () => {
        const y = this.props.scrollPosition;
        console.log('setScroll');
        this.scrollView.scrollTo({ y, animated: false });
    };

    handleLoadMore = () => {
        const nextPage = parseInt(this.props.currentPage, 10) + 1;
        if (nextPage <= this.props.lastPage) {
            this.setState({ loadingPagination: true });
            this.props.getUpcomingMoviesList({ page: nextPage });
        }
    };

    handleScroll = ({ contentOffset }) => {
        this.props.setScrollPosition(contentOffset.y);
    };

    isEndScreen = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
    };

    renderList = () => {
        return this.props.movies.map((item, index) => {
            return <MovieListItem handleClick={() => this.handleClick(item)} item={item} index={index} key={item.id} />;
        });
    };

    render() {
        return (
            <AppContainer>
                {this.props.movies && (
                    <ScrollView
                        ref={(ref) => {
                            this.scrollView = ref;
                        }}
                        scrollEventThrottle={8}
                        onScroll={({ nativeEvent }) => {
                            this.handleScroll(nativeEvent);
                            if (this.isEndScreen(nativeEvent)) {
                                this.handleLoadMore();
                            }
                        }}>
                        {this.renderList()}
                        {this.state.loadingPagination && this.renderLoadingPagination()}
                    </ScrollView>
                )}
            </AppContainer>
        );
    }
}

MovieList2.defaultProps = {
    movies: [],
    navigation: {},
    configuration: null,
    scrollPosition: 0
};

MovieList2.propTypes = {
    movies: PropTypes.array,
    configuration: PropTypes.object,
    scrollPosition: PropTypes.number,
    lastPage: PropTypes.number.isRequired,
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
)(MovieList2);
