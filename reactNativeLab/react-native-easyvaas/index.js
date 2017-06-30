'use strict'

import React, {
    Component,
    PropTypes
} from 'react';

import {
    findNodeHandle,
    NativeModules,
    requireNativeComponent,
    UIManager,
    View,
    ViewPropTypes
} from 'react-native';

export class EasyVaasPlayer extends Component {
    static propTypes = {
        style: ViewPropTypes.style
    }

    play = () => {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.player),
            UIManager.RCTEasyVaas.Commands.play,
            []
        );
    }

    setUpPlayer = (id, isLive) => {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.player),
            UIManager.RCTEasyVaas.Commands.setUpPlayer,
            [id, isLive]
        );
    } 

    onPlayerStateChange = event => {
        const { onPlayerStateChange } = this.props;
        if (onPlayerStateChange) {
            onPlayerStateChange(event.nativeEvent.playerState);
        }
    }

    render() {
        const { style } = this.props;
        return <RCTEasyVaas
            ref={player => this.player = player}    
            onPlayerStateChange={this.onPlayerStateChange}
            style={[{ overflow: 'hidden' }, style]} />;
    }
}

const RCTEasyVaas = requireNativeComponent('RCTEasyVaas', EasyVaasPlayer, {
    nativeOnly: {
        onPlayerStateChange: true
    }
});

export const initEasyVaasSdk = (appId, appKey, appSecrete, userId) => {
    NativeModules.EasyVaasManager.initSdk(appId, appKey, appSecrete, userId);
}