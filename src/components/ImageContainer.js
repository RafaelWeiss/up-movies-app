import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { selectors as configurationSelector } from '../reducers/ConfigurationReducer';

class ImageContainer extends Component {
    shouldComponentUpdate(newProps) {
        return this.props.path !== newProps.path;
    }

    getUri = () => {
        return `${this.props.configuration.images.secure_base_url}w${this.props.width}${this.props.path}`;
    };

    render() {
        const uri = this.getUri();
        return (
            <Image
                ref={(ref) => {
                    this.imageRef = ref;
                }}
                style={this.props.style}
                onLoad={this.handleOnLoad}
                source={{ uri }}
            />
        );
    }
}

ImageContainer.defaultProps = {
    path: '',
    width: 500
};

ImageContainer.propTypes = {
    path: PropTypes.string,
    width: PropTypes.number,
    style: PropTypes.object.isRequired,
    configuration: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    configuration: configurationSelector.getConfiguration(state)
});

export default connect(mapStateToProps)(ImageContainer);
