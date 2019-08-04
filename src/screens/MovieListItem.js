import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import ImageContainer from '../components/ImageContainer';
import styles from '../core/assets/styles';
import AppConfig from '../config';

class MovieListItem extends PureComponent {
    renderVoteAverage() {
        const { item } = this.props;
        return item.vote_average > 0 ? item.vote_average : '-';
    }

    renderReleaseDate() {
        const { item } = this.props;
        return moment(item.release_date).format(AppConfig.dateFormatDefault);
    }

    render() {
        const { item, index, handleClick } = this.props;
        return (
            <TouchableOpacity onPress={handleClick} key={index}>
                <ListItem
                    leftIcon={<ImageContainer style={styles.listItemImageSquare} path={item.poster_path} />}
                    title={this.props.item.title}
                    titleStyle={styles.listItemTitle}
                    subtitle={this.renderReleaseDate()}
                    subtitleStyle={styles.listItemSubTitle}
                    containerStyle={styles.listItem}
                    rightIcon={<Text style={styles.listItemRightIcon}>{this.renderVoteAverage()}</Text>}
                />
            </TouchableOpacity>
        );
    }
}
MovieListItem.defaultProps = {
    index: null,
    item: {}
};

MovieListItem.propTypes = {
    index: PropTypes.number,
    item: PropTypes.object,
    handleClick: PropTypes.func.isRequired
};
export default MovieListItem;
