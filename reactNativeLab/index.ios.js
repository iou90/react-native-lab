'use strict'

import {
  AppRegistry
} from 'react-native';

import Playground from 'Playground';
 
import PivotHeader from 'PivotHeader';

AppRegistry.registerComponent('reactNativeLab', () => {
    Playground.config(PivotHeader);
    return Playground;
});