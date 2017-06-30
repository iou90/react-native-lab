/** @providesModule Live */
/**
import Playground from 'Playground';
 
import Live from 'Live';

AppRegistry.registerComponent('reactNativeLab', () => {
    Playground.config(Live);
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

// import VHall from 'react-native-vhall';

import { EasyVaasPlayer, initEasyVaasSdk } from 'react-native-easyvaas';

const ScreenSize = Dimensions.get('window');

export default class Live extends Component {
    static test = (define) => {
        define('Live', () => <Live />);
    }

    componentDidMount() {
        // this.vhall.startPlay('', '', '', '');
        initEasyVaasSdk('yizhibo', 'evdev', 'helloworld', 'iOSTester');
        this.easyVaas.setUpPlayer('6klV2DD5SepASzJK', true);
        this.easyVaas.play();
    }

    render() {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/*<VHall
                ref={vhall => this.vhall = vhall}
                style={{
                    width: 300,
                    height: 50
                }}
                onPlayError={error => console.log(error)} />*/}
            <View style={{
                marginTop: 100,
                width: ScreenSize.width,
                height: 400
            }}>
                <EasyVaasPlayer
                    ref={easyVaas => this.easyVaas = easyVaas}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    }}
                    onPlayerStateChange={state => console.log(state)} />
            </View>
            <Text>
                hey
            </Text>
        </View>
    }
}