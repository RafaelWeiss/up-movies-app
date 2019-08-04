import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor, whiteColor, primaryColor, greyColor } from './colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_WIDTH = SCREEN_WIDTH - 80;

module.exports = StyleSheet.create({
    // Container
    headerStyle: {
        backgroundColor,
        color: primaryColor
    },
    container: {
        flex: 1,
        backgroundColor
    },
    flex1: {
        flex: 1
    },
    flex1Row: {
        flex: 1,
        flexDirection: 'row'
    },
    loading: {
        backgroundColor,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingPagination: {
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: 'transparent'
    },
    // MovieList
    listItemImageSquare: {
        borderRadius: 5,
        height: 120,
        backgroundColor: '#ddd',
        margin: 0,
        width: 80,
        flex: 0
    },
    listSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: '#000000'
    },
    listItem: {
        backgroundColor: 'transparent'
    },
    listItemTitle: {
        color: whiteColor
    },
    listItemSubTitle: {
        color: greyColor
    },
    listItemRightIcon: {
        flex: 1,
        fontSize: 20,
        color: primaryColor,
        fontFamily: 'bold',
        textAlign: 'right'
    },
    // Movie Detail
    itemDetailsStatusBar: {
        height: 1
    },
    itemDetailsNavBar: {
        height: 60,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignContent: 'center'
    },
    itemDetailsHeader: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    infoTypeLabel: {
        fontSize: 15,
        textAlign: 'right',
        color: greyColor,
        fontFamily: 'regular',
        paddingBottom: 10
    },
    infoAnswerLabel: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'regular',
        paddingBottom: 10
    },

    itemDetailsImageSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemDetailsImage: {
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH + (IMAGE_WIDTH * 50) / 100,
        borderRadius: 10
    },
    itemDetailsBadge: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 30,
        width: 127,
        backgroundColor: 'transparent',
        fontSize: 15,
        color: 'white',
        fontFamily: 'regular',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginRight: 5
    },

    itemDetailsLeftInfo: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemDetailsLeftInfoLabel: {
        flex: 0.5,
        fontSize: 15,
        color: 'gray',
        textAlign: 'left',
        marginTop: 5
    },
    itemDetailsLeftInfoValue: {
        flex: 1,
        fontSize: 26,
        color: primaryColor,
        fontFamily: 'bold',
        textAlign: 'right'
    },
    itemDetailsDescription: {
        flex: 1,
        marginTop: 20,
        width: SCREEN_WIDTH - 80,
        marginLeft: 40
    },
    itemDetailsDescriptionFont: {
        flex: 1,
        fontSize: 15,
        color: 'white',
        fontFamily: 'regular'
    },
    itemDetailsSubtitle: {
        flex: 1,
        fontSize: 15,
        color: primaryColor,
        fontFamily: 'regular',
        marginLeft: 40
    },

    itemDetailsFields: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 30
    },

    itemDetailsFieldsLeft: {
        flex: 1,
        marginLeft: 10
    },

    itemDetailsFieldsRight: {
        flex: 1,
        marginLeft: 10,
        marginRight: -20
    },

    itemDetailsSection: {
        flex: 1,
        marginTop: 30
    },

    itemDetailsTagsSubSection: {
        flex: 1,
        width: SCREEN_WIDTH,
        marginTop: 20
    },

    itemDetaislTags: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 40,
        marginRight: 10
    }
});
