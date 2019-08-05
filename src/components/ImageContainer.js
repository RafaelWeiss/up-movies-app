import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Picache from 'picache';
import { selectors as configurationSelector } from '../reducers/ConfigurationReducer';

class ImageContainer extends PureComponent {
    getUri = () => {
        return `${this.props.configuration.images.secure_base_url}w${this.props.width}${this.props.path}`;
    };

    render() {
        const uri = this.getUri();
        return (
            <Picache
                ref={(ref) => {
                    this.imageRef = ref;
                }}
                style={this.props.style}
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
