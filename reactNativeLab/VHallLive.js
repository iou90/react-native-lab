/** @providesModule VHallLive
import Playground from 'Playground';
 
import VHallLive from 'VHallLive';

AppRegistry.registerComponent('reactNativeLab', () => {
    Playground.config(VHallLive);
    return Playground;
});
*/

'use strict'

import React, {
    Component,
    PropTypes
} from 'react';

import {
    Animated,
    BackAndroid,
    Dimensions,
    Image,
    PanResponder,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import VHall from 'react-native-vhall';

export default class VHallLive extends Component {
    static test = (define) => {
        define('VHallLive', () => <VHallLive />);
    }

    componentDidMount() {
        this.vhall.startPlay('', '', '', '');
    }

    render() {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <VHall
                ref={vhall => this.vhall = vhall}
                style={{
                    width: 300,
                    height: 50
                }}
                onPlayError={error => console.log(error)} />
            <Text>
                hey
            </Text>
        </View>
    }
}