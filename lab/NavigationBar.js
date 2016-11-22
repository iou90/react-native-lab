/** @providesModule NavigationBar 
 * AppRegistry.registerComponent('dscj_app_rn', () => {
    Playground.config(require('NavigationBar'));
    return Playground;
});
*/
'use strict'

import React, {
    Component,
    PropTypes
} from 'react';

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
} from 'react-native';

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.onLeftButtonPressHandle = this.onLeftButtonPressHandle.bind(this);
        this.onRightButtonPressHandle = this.onRightButtonPressHandle.bind(this);
    }

    renderRightIcon() {
        if (this.props.rightButtonIcon) {
            return (
                <Image
                    style={Styles.rightButtonIcon}
                    resizeMode={'contain'}
                    source={this.props.rightButtonIcon}
                    />
            );
        }
        return null;
    }

    renderLeftIcon() {
        if (this.props.leftButtonIcon) {
            return (
                <Image
                    style={Styles.leftButtonIcon}
                    resizeMode={'contain'}
                    source={this.props.leftButtonIcon}
                    />
            );
        }
        return null;
    }

    renderCenter() {
        if (this.props.centerComponent) {
            const CustomCenterComponent = this.props.centerComponent;
            return <CustomCenterComponent />;
        }

        return (
            <View style={Styles.title}>
                <Text
                    style={[
                        Styles.titleText,
                        { color: this.props.titleColor }]}
                    numberOfLines={1}>
                    {this.props.title}
                </Text>
            </View>
        );
    }

    onLeftButtonPressHandle(event) {
        let onPress = this.props.onLeftButtonPress;
        typeof onPress === 'function' && onPress(event);
    }

    onRightButtonPressHandle(event) {
        let onPress = this.props.onRightButtonPress;
        typeof onPress === 'function' && onPress(event);
    }

    render() {
        return (
            <View style={[
                Styles.container,
                {
                    zIndex: this.props.zIndex,
                    width: this.props.width,
                    height: this.props.height,
                    backgroundColor: this.props.backgroundColor
                }]}>
                <TouchableOpacity onPress={this.onLeftButtonPressHandle}>
                    <View style={Styles.leftButton}>
                        {this.renderLeftIcon()}
                        <Text
                            style={[
                                Styles.leftButtonTitle,
                                { color: this.props.leftButtonTitleColor }]}
                            numberOfLines={1}>
                            {this.props.leftButtonTitle}
                        </Text>
                    </View>
                </TouchableOpacity>
                {this.renderCenter()}
                <TouchableOpacity onPress={this.onRightButtonPressHandle}>
                    <View style={Styles.rightButton}>
                        {this.renderRightIcon()}
                        <Text
                            style={[Styles.rightButtonTitle,
                            { color: this.props.rightButtonTitleColor }]}
                            numberOfLines={1}>
                            {this.props.rightButtonTitle}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
};

NavigationBar.propTypes = {
    title: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number, // not include the height of statusBar on ios platform
    titleColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    leftButtonIcon: Image.propTypes.source,
    leftButtonTitle: PropTypes.string,
    leftButtonTitleColor: PropTypes.string,
    onLeftButtonPress: PropTypes.func,
    rightButtonIcon: Image.propTypes.source,
    rightButtonTitle: PropTypes.string,
    rightButtonTitleColor: PropTypes.string,
    onRightButtonPress: PropTypes.func,
    zIndex: PropTypes.number,
    centerComponent: PropTypes.func
};

NavigationBar.defaultProps = {
    width: ScreenWidth,
    height: 40,
    titleColor: 'black',
    backgroundColor: 'transparent',
    leftButtonIcon: null,
    leftButtonTitle: null,
    leftButtonTitleColor: 'black',
    rightButtonIcon: null,
    rightButtonTitle: null,
    rightButtonTitleColor: 'black',
    zIndex: 0
};

NavigationBar.test = (define) => {
    const center = () => {
        return (
            <View style={[Styles.title,
            {
                backgroundColor: 'palevioletred',
                margin: 7
            }
            ]}>
                <Text numberOfLines={1}>
                    cake is good
                </Text>
            </View>
        );
    };
    define('NavigationBar', () =>
        <View style={{ marginTop: 20 }}>
            <NavigationBar
                centerComponent={center}
                backgroundColor='aliceblue'
                title='cake is good'
                />
        </View>
    );
}

module.exports = NavigationBar;

const ScreenWidth = Dimensions.get('window').width;

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    leftButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 90,
        paddingTop: 1,
        paddingLeft: 8,
    },
    leftButtonIcon: {
        width: 16,
        height: 16
    },
    leftButtonTitle: {
        // fontSize: 15
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    titleText: {
        // fontSize: 18,
        // fontWeight: '400'
    },
    rightButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 90,
        paddingTop: 1,
        paddingRight: 8
    },
    rightButtonIcon: {
        width: 16,
        height: 16
    },
    rightButtonTitle: {
        // fontSize: 15
    }
});