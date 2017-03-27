/** @providesModule PivotHeader 
import Playground from 'Playground';
 
import PivotHeader from 'PivotHeader';

AppRegistry.registerComponent('reactNativeLab', () => {
    Playground.config(PivotHeader);
    return Playground;
});
*/

'use strict'

import React, {
    PropTypes
} from 'react';

import {
    Animated,
    Dimensions,
    PanResponder,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import ImmutableComponent from 'react-immutable-component';

import Carousel from 'react-native-snap-carousel';

export default class PivotHeader extends ImmutableComponent {
    constructor(props) {
        super(props);
        this.offset = (ScreenWidth - props.itemWidth) / 2;
    }

    render() {
        const { itemWidth, datas, containerStyle, itemStyle, titleStyle, position } = this.props;
        return (
            <Carousel
                inactiveSlideScale={1}
                sliderWidth={itemWidth}
                itemWidth={itemWidth}>
                {
                    datas.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={[itemStyle, {
                                    width: itemWidth
                                }]}>
                                <Text style={titleStyle}>{item}</Text>
                            </View>
                        );
                    })
                }
            </Carousel>
        );
        /*return (
            <ScrollView
                contentOffset={{ x: -this.offset }}
                contentInset={{ left: this.offset, right: this.offset }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                decelerationRate={0}
                style={[containerStyle]}
                snapToInterval={itemWidth}
                snapToAlignment={'center'}>
                {
                    datas.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={[itemStyle, {
                                    width: itemWidth
                                }]}>
                                <Text style={titleStyle}>{item}</Text>
                            </View>
                            );
                    })
                }
            </ScrollView>
        );*/
    }
}

const ScreenWidth = Dimensions.get('window').width;

PivotHeader.propTypes = {
    itemWidth: PropTypes.number,
    datas: PropTypes.array,
    itemStyle: View.propTypes.style,
    titleStyle: Text.propTypes.style
}

PivotHeader.defaultProps = {
}

PivotHeader.test = (define) => {
    define('PivotHeader', () => {
        return (
            <View style={{ marginTop: 40 }}>
                <PivotHeader
                    containerStyle={Styles.container}
                    itemWidth={200}
                    itemStyle={Styles.item}
                    titleStyle={Styles.title}
                    datas={['名师工坊', '移动课堂', '明日之星']} />
            </View>
        );
    });
}

const Styles = StyleSheet.create({
    container: {
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'beige',
        paddingVertical: 15
    },
    title: {
        color: 'dimgrey'
    }
});