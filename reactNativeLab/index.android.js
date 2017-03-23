'use strict'

import {
  AppRegistry
} from 'react-native';

import Playground from 'Playground';
 
import VideoPlayer from 'VideoPlayer';

AppRegistry.registerComponent('reactNativeLab', () => {
    Playground.config(VideoPlayer);
    return Playground;
});