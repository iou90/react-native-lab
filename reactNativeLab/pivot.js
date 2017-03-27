/** @providesModule Pivot */

'use strict'

import React, {
    Component,
    PropTypes
} from 'react';

import {
    Animated,
    Dimensions,
    Image,
    PanResponder,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default class Pivot extends Component {
    constructor(props) {
        super(props);
        this.views = [];
        this.headers = [{
            title: 'hey',
            backgroundColor: 'antiquewhite'
        },
        {
            title: 'lol',
            backgroundColor: 'lightcoral'
        },
        {
            title: 'wow',
            backgroundColor: 'lightpink'
        }];
        this.currentHeaderIndex = 0;
        this.currentHeaderPosition = 0;
        this.viewsData = [{
            datas: ['antiquewhite', 'cadetblue', 'honeydew']
        },
        {
            datas: ['lightcoral', 'ivory', 'hotpink']
        },
        {
            datas: ['lightpink', 'papayawhip', 'thistle']
        }];
        this.currentViewIndex = 0;
        this.currentViewPosition = 0;
        this.animatedValueX = 0;
        this.state = {
            pan: new Animated.ValueXY()
        };
        this.state.pan.x.addListener(x => {
            this.animatedValueX = x.value;
        });
        this.panHandlers = this.setPanHandlers();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.state.pan.x.removeAllListeners();
    }

    setPanHandlers() {
        const reduceRate = 3;
        return PanResponder.create({
            onMoveShouldSetPanResponder: (event, gestureState) => {
                return gestureState.dx !== 0;
            },
            onPanResponderGrant: (event, gestureState) => {
                this.state.pan.setOffset({ x: this.animatedValueX });
                this.state.pan.setValue({ x: 0 });
            },
            onPanResponderMove: (event, gestureState) => {
                const panX = gestureState.dx / reduceRate;
                // this.currentHeaderPosition = this.currentHeaderPosition - panX;
                // if (this.currentHeaderPosition < 0) {
                //     this.currentHeaderPosition = 0;
                // }
                this.state.pan.setValue({ x: panX });
            },
            onPanResponderRelease: (event, gestureState) => {
                const panX = gestureState.dx / reduceRate;
                this.state.pan.setValue({ x: 0 });
                this.state.pan.setOffset({ x: this.currentHeaderIndex * -ScreenWidth });
                // move to left
                if (!!(panX > 0)) {
                    if (this.currentHeaderIndex > 0 && panX > (this.props.flipDistance / reduceRate)) {
                        this.currentHeaderIndex--;
                        // this.currentHeaderPosition = ScreenWidth * this.currentHeaderIndex;
                        Animated.spring(this.state.pan, {
                            toValue: ScreenWidth
                        }).start();
                    }
                    else {
                        Animated.spring(this.state.pan, {
                            toValue: 0
                        }).start();
                    }
                }
                // move to right
                else {
                    if (this.currentHeaderIndex < (this.headers.length - 1) && -panX > (this.props.flipDistance / reduceRate)) {
                        this.currentHeaderIndex++;
                        // this.currentHeaderPosition = ScreenWidth * this.currentHeaderIndex;
                        Animated.spring(this.state.pan, {
                            toValue: -ScreenWidth
                        }).start();
                    }
                    else {
                        Animated.spring(this.state.pan, {
                            toValue: 0
                        }).start();
                    }
                }
            }
        }).panHandlers;
    }

    onViewScroll(index, event) {
        if (!this.props.syncViewScrollPosition) {
            return;
        }
        if (index !== this.currentViewIndex) {
            return;
        }
        for (const index in this.views) {
            if (index === this.currentViewIndex) {
                continue;
            }
            this.views[index].scrollTo({
                y: event.nativeEvent.contentOffset.y,
                animated: false,
            });
        }
    }

    render() {
        return (
            <View>
                <Animated.View
                    style={{
                        transform: [{ translateX: this.state.pan.x }],
                        flexDirection: 'row'
                    }}
                    {...this.panHandlers}>
                    {
                        this.headers.map((item, index) =>
                            <View
                                style={{
                                    backgroundColor: item.backgroundColor,
                                    width: ScreenWidth,
                                    paddingVertical: 55,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                key={index}>
                                <Text style={{
                                    fontSize: 35
                                }}>
                                    {item.title}
                                </Text>
                            </View>
                        )
                    }
                </Animated.View>
                <Animated.ScrollView
                    ref={pivotContainer => this.pivotContainer = pivotContainer}
                    pagingEnabled
                    style={{
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    {
                        this.viewsData.map((list, listIndex) =>
                            <ScrollView
                                key={listIndex}
                                ref={view => this.views.push(view)}
                                onMomentumScrollEnd={event => this.onViewScroll(listIndex, event)}
                                style={{
                                }}
                                showsVerticalScrollIndicator={false}>
                                {list.datas.map((item, itemIndex) =>
                                    <View
                                        style={{
                                            height: 555,
                                            width: ScreenWidth,
                                            backgroundColor: item
                                        }}
                                        key={itemIndex}>
                                    </View>
                                )}
                            </ScrollView>
                        )
                    }
                </Animated.ScrollView>
            </View >
        );
    }
}

const ScreenWidth = Dimensions.get('window').width;

Pivot.propTypes = {
    flipDistance: PropTypes.number,
    syncViewScrollPosition: PropTypes.bool
}

Pivot.defaultProps = {
    flipDistance: ScreenWidth / 5,
    syncViewScrollPosition: true
}