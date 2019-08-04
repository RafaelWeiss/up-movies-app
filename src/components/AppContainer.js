import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import styles from '../core/assets/styles';
import { selectors as systemSelector } from '../reducers/SystemReducer';
import { primaryColor } from '../core/assets/styles/colors';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            georgia: require('../core/assets/fonts/Georgia.ttf'), // eslint-disable-line global-require
            regular: require('../core/assets/fonts/Montserrat-Regular.ttf'), // eslint-disable-line global-require
            light: require('../core/assets/fonts/Montserrat-Light.ttf'), // eslint-disable-line global-require
            bold: require('../core/assets/fonts/Montserrat-Bold.ttf') // eslint-disable-line global-require
        });
        this.setState({ fontLoaded: true });
    }

    isLoading = () => {
        return this.props.isLoading || !this.state.fontLoaded;
    };

    render() {
        return (
            <ThemeProvider>
                {this.isLoading() ? (
                    <SafeAreaView style={styles.loading}>
                        <ActivityIndicator animating size="large" color={primaryColor} />
                    </SafeAreaView>
                ) : (
                    <SafeAreaView style={styles.container}>{this.props.children}</SafeAreaView>
                )}
            </ThemeProvider>
        );
    }
}

AppContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

const mapStateToProps = (state) => ({
    isLoading: systemSelector.isSystemLoading(state)
});

export default connect(mapStateToProps)(AppContainer);
