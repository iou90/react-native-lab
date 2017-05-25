import {
  AppRegistry,
} from 'react-native';

import Playground from 'Playground';
 
import VHallLive from './VHallLive';

AppRegistry.registerComponent('reactNativeLab', () => {
    Playground.config(VHallLive);
    return Playground;
});