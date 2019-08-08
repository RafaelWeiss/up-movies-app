import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import moment from 'moment';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modalbox';
import i18n from '../core/i18n';
import styles from '../core/assets/styles';
import { primaryColor } from '../core/assets/styles/colors';
import ImageContainer from '../components/ImageContainer';
import AppConfig from '../config';
import { selectors as movieSelector, actions as movieAction } from '../reducers/MovieReducer';

class MovieDetailModal extends Component {
    showModal = (movie) => {
        this.props.getMovieDetails(movie.id);
        this.movieDetailModal.open();
    };

    closeModal = () => {
        this.movieDetailModal.close();
        this.props.parentFlatList.handleKeepScroll();
    };

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

    renderButtonClose() {
        return (
            <Ionicons
                name="md-close"
                onPress={() => this.closeModal()}
                size={32}
                color={primaryColor}
                style={styles.modalButtonClose}
                title="X"
            />
        );
    }

    render() {
        const { movie } = this.props;
        return (
            <Modal
                ref={(movieDetailModal) => {
                    this.movieDetailModal = movieDetailModal;
                }}
                style={styles.modalContent}
                position="center">
                <>
                    {!_.isEmpty(movie) ? (
                        <View style={styles.container}>
                            <View style={styles.itemDetailsNavBar}>
                                <Text style={styles.itemDetailsHeader}>{movie.title}</Text>
                                {this.renderButtonClose()}
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
                    ) : (
                        <View style={styles.loading}>
                            <ActivityIndicator animating size="large" color={primaryColor} />
                        </View>
                    )}
                </>
            </Modal>
        );
    }
}

MovieDetailModal.propTypes = {
    getMovieDetails: PropTypes.any.isRequired,
    movie: PropTypes.any.isRequired,
    parentFlatList: PropTypes.any.isRequired
};

const mapStateToProps = (state) => ({
    movie: movieSelector.getMovieDetails(state)
});

const mapDispatchToProps = {
    getMovieDetails: movieAction.getMovieDetails.request
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
        null,
        { forwardRef: true }
    )
)(MovieDetailModal);
