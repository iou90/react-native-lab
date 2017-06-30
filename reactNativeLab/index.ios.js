import {
  AppRegistry,
} from 'react-native';

import Playground from 'Playground';
 
import Live from 'Live';

AppRegistry.registerComponent('reactNativeLab', () => {
    Playground.config(Live);
    return Playground;
});