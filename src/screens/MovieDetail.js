import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import moment from 'moment';
import { Text, View, ScrollView } from 'react-native';
import i18n from '../core/i18n';

import { selectors as movieSelector, actions as movieAction } from '../reducers/MovieReducer';
import { selectors as configurationSelector } from '../reducers/ConfigurationReducer';

import styles from '../core/assets/styles';
import AppContainer from '../components/AppContainer';
import ImageContainer from '../components/ImageContainer';
import AppConfig from '../config';

class MovieDetail extends Component {
    componentDidMount() {
        this.props.getMovieDetails(this.getMovieId());
    }

    componentWillUnmount() {
        this.props.navigation.state.params.handleKeepScroll();
    }

    getMovieId() {
        return this.props.navigation.state.params.movieId;
    }

    renderFieldValue = (value, valueFmt) => {
        return value ? valueFmt : '-';
    };

    renderGenres() {
        const { movie } = this.props;
        return (
            <View style={styles.itemDetailsSection}>
                <Text style={styles.itemDetailsSubtitle}>{i18n.t('label.genres')}</Text>
                <View style={styles.itemDetailsTagsSubSection}>
                    <ScrollView style={styles.flex1} horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.itemDetaislTags}>
                            <View style={styles.flex1Row}>
                                {movie.genres &&
                                    movie.genres.map((genre) => {
                                        return (
                                            <Text style={styles.itemDetailsBadge} key={`${genre.id}`}>
                                                {genre.name}
                                            </Text>
                                        );
                                    })}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    renderFields() {
        const { movie } = this.props;
        return (
            <View style={styles.itemDetailsSection}>
                <Text style={styles.itemDetailsSubtitle}>{i18n.t('label.info')}</Text>
                <View style={styles.itemDetailsFields}>
                    <View style={styles.flex1Row}>
                        <View style={styles.flex1}>
                            <Text style={styles.infoTypeLabel}>{i18n.t('label.status')}</Text>
                            <Text style={styles.infoTypeLabel}>{i18n.t('label.runtime')}</Text>
                        </View>
                        <View style={styles.itemDetailsFieldsLeft}>
                            <Text style={styles.infoAnswerLabel}>{movie.status}</Text>
                            <Text style={styles.infoAnswerLabel}>
                                {this.renderFieldValue(movie.runtime, `${movie.runtime} ${i18n.t('label.minutes')}`)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.flex1Row}>
                        <View style={styles.flex1}>
                            <Text style={styles.infoTypeLabel}>{i18n.t('label.release')}</Text>
                            <Text style={styles.infoTypeLabel}>{i18n.t('label.language')}</Text>
                        </View>
                        <View style={styles.itemDetailsFieldsRight}>
                            <Text style={styles.infoAnswerLabel}>
                                {this.renderFieldValue(
                                    movie.release_date,
                                    moment(movie.release_date).format(AppConfig.dateFormatDefault)
                                )}
                            </Text>
                            <Text style={styles.infoAnswerLabel}>
                                {this.renderFieldValue(
                                    movie.original_language,
                                    i18n.t(`label.${movie.original_language}`)
                                )}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const { movie } = this.props;
        return (
            <AppContainer>
                <>
                    {movie && (
                        <View style={styles.flex1}>
                            <View style={styles.itemDetailsNavBar}>
                                <Text style={styles.itemDetailsHeader}>{movie.title}</Text>
                            </View>
                            <ScrollView style={styles.flex1}>
                                <View style={styles.itemDetailsImageSection}>
                                    <ImageContainer path={movie.poster_path} style={styles.itemDetailsImage} />
                                </View>
                                <View style={styles.itemDetailsLeftInfo}>
                                    <Text style={styles.itemDetailsLeftInfoLabel}>
                                        {`${movie.vote_count} ${i18n.t('label.votes')}`}
                                    </Text>
                                    <Text style={styles.itemDetailsLeftInfoValue}>{movie.vote_average}</Text>
                                </View>
                                <View style={styles.itemDetailsDescription}>
                                    <Text style={styles.itemDetailsDescriptionFont}>{movie.overview}</Text>
                                </View>
                                {this.renderGenres(movie)}
                                {this.renderFields(movie)}
                            </ScrollView>
                        </View>
                    )}
                </>
            </AppContainer>
        );
    }
}
MovieDetail.defaultProps = {
    movie: null,
    navigation: {}
};

MovieDetail.propTypes = {
    getMovieDetails: PropTypes.func.isRequired,
    movie: PropTypes.object,
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        state: PropTypes.object,
        goBack: PropTypes.func
    })
};

const mapStateToProps = (state) => ({
    movie: movieSelector.getMovieDetails(state),
    configuration: configurationSelector.getConfiguration(state)
});

const mapDispatchToProps = {
    getMovieDetails: movieAction.getMovieDetails.request
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MovieDetail);
