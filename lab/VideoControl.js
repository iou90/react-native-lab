/** @providesModule VideoControl */

'use strict'

import React, {
    PropTypes
} from 'react';

import {
    Dimensions,
    Platform,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
    Animated,
    Image,
    UIManager,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

import Slider from 'react-native-slider';

import ImmutableComponent from 'react-immutable-component';

export class VideoControl extends ImmutableComponent {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.show = this.show.bind(this);
        this.dragging = this.dragging.bind(this);
        this.seekVideo = this.seekVideo.bind(this);
        this.onControl = this.onControl.bind(this);
        this.onReplay = this.onReplay.bind(this);
        this.opacityAnimatedValue = new Animated.Value(0);
        this.state = {
            isVisible: false
        };
    }

    componentDidMount() {
        // TODO remove when android supports animations
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.fadeOutControls(this.props.controlFadeOutDelayTime);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state === VideoPlayerState.Ended) {
            this.fadeInControls(false);
        }
    }

    componentWillUnmount() {
        this.willUnmount = true;
    }

    getStateIcon(state) {
        switch (state) {
            case VideoPlayerState.Paused:
                return this.props.playIcon;
            case VideoPlayerState.Playing:
                return this.props.pauseIcon;
            case VideoPlayerState.Ended:
                return this.props.replayIcon;
        }
    }

    showControlButton(state) {
        const icon = this.getStateIcon(state);
        const pressAction = state === VideoPlayerState.Ended ? this.onReplay : this.onControl;
        return (
            <TouchableOpacity
                style={[
                    Styles.controlButton,
                    { backgroundColor: this.props.controlButtonBackgroundColor }
                ]}
                onPress={pressAction}>
                <Image
                    source={icon}
                    style={Styles.controlIcon} />
            </TouchableOpacity>
        );
    }

    show(thenFadeOut = true) {
        if (this.willUnmount) {
            return;
        }
        this.opacityAnimatedValue.stopAnimation(() => this.setState({ isVisible: true }));
        // fade in when pressed button on fading out
        this.fadeInControls(thenFadeOut);
    }

    showLoadingView() {
        return (
            <ActivityIndicator color={this.props.accentColor} />
        );
    }

    fadeInControls(thenFadeOut = true) {
        if (this.willUnmount) {
            return;
        }
        this.setState({ isVisible: true });
        Animated.timing(this.opacityAnimatedValue, {
            toValue: 1,
            duration: FadeDuration
        }).start(() => {
            if (thenFadeOut) {
                this.fadeOutControls(this.props.controlFadeOutDelayTime);
            }
        });
    }

    fadeOutControls(delay = 0) {
        if (this.willUnmount) {
            return;
        }
        Animated.timing(this.opacityAnimatedValue, {
            toValue: 0,
            duration: FadeDuration,
            delay
        }).start((result) => {
            //I noticed that the callback is called twice, when it is invoked and when it completely finished
            //This prevents some flickering
            if (result.finished) {
                this.setState({ isVisible: false });
            }
        });
    }

    toggle() {
        if (this.willUnmount) {
            return;
        }
        // value is the last value of the animation when stop animation was called.
        // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
        this.opacityAnimatedValue.stopAnimation((value) => {
            this.setState({ isVisible: !!value });
            value ? this.fadeOutControls() : this.fadeInControls();
        });
    }

    onReplay() {
        this.fadeOutControls(this.props.controlFadeOutDelayTime);
        this.props.replayVideo();
    }

    // play or pause
    onControl(thenFadeOut = true) {
        if (this.props.state === VideoPlayerState.Playing) {
            this.show(thenFadeOut);
        }
        if (this.props.state === VideoPlayerState.Paused) {
            this.fadeOutControls(this.props.controlFadeOutDelayTime);
        }
        this.props.controlVideo();
    }

    dragging() {
        if (this.props.state === VideoPlayerState.Paused) {
            this.show(false);
            return;
        }
        this.onControl(false);
    }

    seekVideo(value) {
        this.props.seekVideo(value);
        this.onControl();
    }

    // display time as 00:00
    humanizeVideoDuration(seconds) {
        const [begin, end] = seconds >= 3600 ? [11, 8] : [14, 5];
        const date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(begin, end);
    }

    renderControls() {
        if (!this.state.isVisible) {
            return null;
        }
        const unit = 15;
        return (
            <View style={Styles.container}>
                <View style={{
                    width: ScreenWidth,
                    position: 'absolute',
                    left: unit,
                    right: unit,
                    top: this.props.isFullScreen ? unit : Platform.OS === 'ios' ? unit * 2 : unit,
                    bottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                }}>
                    <TouchableOpacity
                        style={{
                            height: null,
                            alignSelf: 'flex-start',
                            justifyContent: 'center',
                            backgroundColor: 'transparent'
                        }}
                        onPress={this.props.resizeVideo}>
                        <Image
                            style={
                                this.props.isFullScreen ? null : {
                                    height: 0,
                                    opacity: 0
                                }
                            }
                            source={this.props.quitFullscreenIcon} />
                    </TouchableOpacity>
                    <View style={{
                        position: 'absolute',
                        left: unit * 2,
                        right: unit * 2,
                        top: 0,
                        bottom: 0,
                    }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 15,
                                fontFamily: 'PingFang SC',
                                color: 'white',
                                backgroundColor: 'transparent'
                            }}>
                            {this.props.title}
                        </Text>
                    </View>
                </View>
                <View style={Styles.bottom}>
                    <Text style={[
                        Styles.timeLabel,
                        { color: this.props.accentColor }
                    ]}>
                        {this.humanizeVideoDuration(this.props.progress)}
                    </Text>
                    <Slider
                        onValueChange={this.dragging}
                        onSlidingComplete={this.seekVideo}
                        maximumValue={Math.floor(this.props.duration)}
                        value={Math.floor(this.props.progress)}
                        style={SliderStyles.container}
                        trackStyle={[
                            SliderStyles.track,
                            { backgroundColor: this.props.themeColor }
                        ]}
                        thumbStyle={[
                            SliderStyles.thumb,
                            {
                                shadowColor: this.props.accentColor,
                                backgroundColor: this.props.accentColor
                            }
                        ]}
                        minimumTrackTintColor={this.props.accentColor}
                        thumbTouchSize={{
                            width: ButtonLength,
                            height: ButtonLength
                        }} />
                    <Text style={[
                        Styles.timeLabel,
                        { color: this.props.accentColor }
                    ]}>
                        {this.humanizeVideoDuration(this.props.duration)}
                    </Text>
                    <TouchableOpacity
                        style={!this.props.enableHd ? Styles.hidden : Styles.qualityContainer}
                        onPress={this.props.changeToHd}>
                        <Text style={[
                            Styles.qualityLabel,
                            { color: this.props.isHd ? this.props.hdLabelColor : this.props.accentColor }
                        ]}>
                            HD
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Styles.resizeContainer}
                        onPress={this.props.resizeVideo}>
                        {
                            this.props.isFullScreen ? <Image source={this.props.exitFullscreenIcon} /> : <Image source={this.props.fullscreenIcon} />
                        }
                    </TouchableOpacity>
                </View>
                <View style={Styles.onScreen}>
                    {
                        this.props.isLoading ? this.showLoadingView() : this.showControlButton(this.props.state)
                    }
                </View>
            </View>
        );
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.toggle}>
                <Animated.View style={[
                    Styles.container,
                    {
                        opacity: this.opacityAnimatedValue,
                        backgroundColor: this.props.backgroundColor
                    }]}>
                    {this.renderControls()}
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

VideoControl.propTypes = {
    controlFadeOutDelayTime: PropTypes.number,
    progress: PropTypes.number,
    duration: PropTypes.number,
    isLoading: PropTypes.bool,
    isFullScreen: PropTypes.bool,
    enableHd: PropTypes.bool,
    isHd: PropTypes.bool,
    state: PropTypes.number,
    resizeVideo: PropTypes.func, // fullscreen or exit fullscreen
    controlVideo: PropTypes.func, // play or pause
    replayVideo: PropTypes.func,
    seekVideo: PropTypes.func,
    changeToHd: PropTypes.func, // change video quality
    accentColor: PropTypes.string,
    themeColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    hdLabelColor: PropTypes.string,
    controlButtonBackgroundColor: PropTypes.string,
    title: PropTypes.string,
    // icons
    pauseIcon: Image.propTypes.source,
    playIcon: Image.propTypes.source,
    replayIcon: Image.propTypes.source,
    fullscreenIcon: Image.propTypes.source,
    exitFullscreenIcon: Image.propTypes.source,
    quitFullscreenIcon: Image.propTypes.source
}

VideoControl.defaultProps = {
    controlFadeOutDelayTime: 2555,
    enableHd: true,
    accentColor: 'snow',
    themeColor: 'rgba(0,0,0,0.55)',
    backgroundColor: 'rgba(0,0,0,0.25)',
    hdLabelColor: '#00896c',
    controlButtonBackgroundColor: 'rgba(255,250,250,0.25)'
}

export const VideoPlayerState = {
    Playing: 0,
    Paused: 1,
    Ended: 2
};

const ScreenWidth = Dimensions.get('window').width;

const FadeDuration = 555;

const ButtonLength = 35;

const Styles = StyleSheet.create({
    container: {
        zIndex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    onScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: ButtonLength,
        height: ButtonLength,
        borderRadius: 3
    },
    controlIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    bottom: {
        position: 'absolute',
        bottom: 5,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    resizeContainer: {
        paddingLeft: 4,
        paddingRight: 16,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeLabel: {
        fontSize: 10
    },
    qualityContainer: {
        paddingLeft: 10,
        paddingRight: 4,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qualityLabel: {
        fontSize: 12
    },
    hidden: {
        width: 0,
        height: 0
    }
});

const SliderStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5
    },
    track: {
        height: 2
    },
    thumb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 2,
        shadowOpacity: 1,
    }
});