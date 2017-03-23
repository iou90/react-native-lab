/** @providesModule VideoPlayer 
import Playground from 'Playground';
 
import VideoPlayer from 'VideoPlayer';

AppRegistry.registerComponent('reactNativeLab', () => {
    Playground.config(VideoPlayer);
    return Playground;
});
*/

'use strict'

import React, {
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

import Video from 'react-native-video';

import ImmutableComponent from 'react-immutable-component';

import Orientation from 'react-native-orientation';

import { VideoControl, VideoPlayerState } from 'VideoControl';

export default class VideoPlayer extends ImmutableComponent {
    constructor(props) {
        super(props);
        this.seek = this.seek.bind(this);
        this.control = this.control.bind(this);
        this.replay = this.replay.bind(this);
        this.resize = this.resize.bind(this);
        this.changeToHd = this.changeToHd.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.orientationChanged = this.orientationChanged.bind(this);
        this.resizeAnimatedValue = new Animated.Value(0);
        this.startPlayWithFullsize = props.startPlayWithFullsize;
        this.resumeTime = 0;
        this.orientation = DeviceOrientation.Portrait;
        this.setPanResponder();
        this.state = {
            videoHeight: this.props.height,
            isLoading: true,
            playerState: VideoPlayerState.Playing,
            source: props.source,
            paused: props.paused,
            currentTime: 0,
            duration: 0,
            isHideToolBar: false,
            isLandscape: false,
            isHd: false
        };
        if (Platform.OS === 'android') {
            this.handleAndroidBackButton = this.handleAndroidBackButton.bind(this);
            BackAndroid.addEventListener('hardwareBackPress', this.handleAndroidBackButton);
            Orientation.addOrientationListener(this.orientationChanged);
            Orientation.lockToPortrait();
        }
        this.setResizeStyle(this.state.isLandscape);
    }

    setResizeStyle(isLandscape, height = this.state.videoHeight) {
        this.resizeX = this.resizeAnimatedValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: isLandscape ? [ScreenHeight, ScreenWidth] : [ScreenWidth, ScreenHeight]
            });
        this.resizeY = this.resizeAnimatedValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: isLandscape ? [ScreenWidth, height] : [height, ScreenWidth]
            });
        if (Platform.OS === 'ios') {
            this.rotate = this.resizeAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: isLandscape ? ['90deg', '0deg'] : ['0deg', '90deg']
            });
            const dy = (ScreenHeight - ScreenWidth) / 2;
            this.translateY = this.resizeAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: isLandscape ? [dy, 0] : [0, dy]
            });
            const dx = -(ScreenHeight - ScreenWidth) / 2;
            this.translateX = this.resizeAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: isLandscape ? [dx, 0] : [0, dx]
            });
        }
    }

    setPanResponder() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (event, gestureState) => {
                if (this.controller && this.controller.state.isVisible) {
                    return false;
                }
                return Math.abs(gestureState.dx) > 5;
            },
            onPanResponderGrant: (event, gestureState) => {
                if (this.state.isLoading) {
                    return;
                }
                this.setState({ paused: true });
            },
            onPanResponderRelease: (event, gestureState) => {
                const {
                    isLoading,
                    currentTime,
                    duration,
                    isLandscape,
                } = this.state;
                if (isLoading || this.state.duration <= 0) {
                    return;
                }
                const width = isLandscape ? ScreenHeight : ScreenWidth;
                const unit = duration / width;
                const draggedSeconds = gestureState.dx * unit;
                const currentTimeAfterDragged = currentTime + draggedSeconds > duration ? duration : currentTime + draggedSeconds < 0 ? 0 : currentTime + draggedSeconds;
                this.player.seek(currentTimeAfterDragged);
                this.setState({
                    paused: false,
                    playerState: VideoPlayerState.Playing
                });
            }
        });
    }

    // when player setting props changed
    componentWillReceiveProps(nextProps) {
        this.setState({ paused: nextProps.paused });
        if (this.props.source === nextProps.source && this.props.startPlayWithFullsize === nextProps.startPlayWithFullsize) {
            return;
        }
        // video source null or undefined
        if (!nextProps.source) {
            return;
        }
        if (this.props.startPlayWithFullsize !== nextProps.startPlayWithFullsize) {
            this.startPlayWithFullsize = nextProps.startPlayWithFullsize;
        }
        this.controller.fadeOutControls();
        this.setState({
            source: nextProps.source,
            playerState: VideoPlayerState.Playing,
            isLoading: true,
            currentTime: 0,
            duration: 0,
            isHd: false
        });
        if (nextProps.height && !nextProps.autoSize) {
            this.setResizeStyle(this.state.isLandscape, nextProps.height);
            this.setState({ videoHeight: nextProps.height });
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.handleAndroidBackButton);
            Orientation.removeOrientationListener(this.orientationChanged);
            Orientation.unlockAllOrientations();
        }
    }

    handleAndroidBackButton() {
        if (this.orientation === DeviceOrientation.Landscape) {
            this.resize();
            return true; // return true prevent navigator.pop
        }
    }

    orientationChanged(orientation) {
        if (orientation === DeviceOrientation.Landscape) {
            this.orientation = DeviceOrientation.Landscape;
        }
        else {
            if (this.state.isLandscape) {
                this.orientation = DeviceOrientation.Portrait;
            }
        }
    }

    animateResize() {
        Animated.timing(
            this.resizeAnimatedValue, {
                toValue: 1,
                duration: EnterFullScreenAnimationTime
            }
        ).start(() => {
            this.resizeAnimatedValue.setValue(0);
            const isLandscape = !this.state.isLandscape;
            this.setResizeStyle(isLandscape);
            this.setState({
                isHideToolBar: isLandscape,
                isLandscape
            });
            if (Platform.OS === 'ios') {
                if (!isLandscape) {
                    this.handleVideoResize(false);
                }
            }
            if (Platform.OS === 'android') {
                if (isLandscape) {
                    this.orientation = DeviceOrientation.Landscape;
                }
                else {
                    this.orientation = DeviceOrientation.Portrait;
                    this.handleVideoResize(false);
                }
            }
        });
    }

    seek(value) {
        this.player.seek(value);
    }

    // play or pause
    control() {
        this.updateVideoState(this.state.paused ? 'play' : 'pause');
        this.setState(prevState => ({
            paused: !prevState.paused,
            playerState: !prevState.paused ? VideoPlayerState.Paused : VideoPlayerState.Playing
        }));
    }

    replay() {
        this.player.seek(0);
        this.setState({ playerState: VideoPlayerState.Playing });
    }

    onProgress(data) {
        if (this.state.playerState === VideoPlayerState.Ended) {
            return;
        }
        if (this.state.isLoading) {
            return;
        }
        this.setState({ currentTime: data.currentTime });
    }

    onLoad(data) {
        if (this.resumeTime > 0) {
            this.player.seek(this.resumeTime);
            this.resumeTime = 0;
        }
        if (this.startPlayWithFullsize) {
            this.resize();
            this.startPlayWithFullsize = false;
        }
        if (this.props.onVideoLoaded) {
            this.props.onVideoLoaded(data);
        }
        if (this.resumeTime === 0 && this.props.lastPlayTime > 0) {
            this.player.seek(this.props.lastPlayTime);
        }
        let height = data.naturalSize.height * (ScreenWidth / data.naturalSize.width);
        height = height > ScreenHeight ? (ScreenHeight - (Platform.OS === 'android' && Platform.Version > 19 ? 64 : 44)) : height;
        if (this.props.autoSize) {
            this.setResizeStyle(this.state.isLandscape, height);
            this.setState({ videoHeight: height });
        }
        this.setState({
            duration: data.duration,
            isLoading: false
        });
    }

    onLoadStart() {
        this.setState({ isLoading: true });
    }

    onEnd() {
        this.updateVideoState('end');
        this.setState({
            currentTime: this.state.duration,
            playerState: VideoPlayerState.Ended
        });
    }

    onError(error) {
        console.log("video player error:", error);
    }

    resize() {
        if (Platform.OS === 'ios') {
            if (this.orientation === DeviceOrientation.Landscape) {
                StatusBar.setHidden(false);
                this.orientation = DeviceOrientation.Portrait;
                this.animateResize();
            }
            else {
                this.orientation = DeviceOrientation.Landscape;
                this.handleVideoResize(true);
                StatusBar.setHidden(true);
                this.animateResize();
            }
        }
        if (Platform.OS === 'android') {
            this.animateResize();
            if (this.orientation === DeviceOrientation.Portrait) {
                this.handleVideoResize(true);
                StatusBar.setHidden(true);
                Orientation.lockToLandscapeLeft();
            }
            else {
                StatusBar.setHidden(false);
                Orientation.lockToPortrait();
            }
        }
        this.setState({
            isHideToolBar: true
        });
    }

    handleVideoResize(isLandscape) {
        if (this.props.onVideoResize) {
            this.props.onVideoResize(isLandscape);
        }
    }

    changeToHd() {
        if (this.props.hdSource) {
            this.resumeTime = this.state.currentTime;
            this.setState((prevState, props) => ({
                source: !prevState.isHd ? props.hdSource : props.source,
                isHd: !prevState.isHd,
                isLoading: true,
                currentTime: 0,
                duration: 0
            }));
        }
    }

    updateVideoState(type) {
        if (this.props.updateVideoState) {
            this.props.updateVideoState(this.state.currentTime, type);
        }
    }

    renderVideoControl() {
        if (this.props.videoControl) {
            const CustomVideoControl = this.props.videoControl;
            return <CustomVideoControl />;
        }
        return (
            <VideoControl
                ref={controller => this.controller = controller}
                isDisplayFullScreenButton={this.props.isDisplayFullScreenButton}
                state={this.state.playerState}
                isLoading={this.state.isLoading}
                isFullScreen={this.state.isLandscape}
                isHd={this.state.isHd}
                enableHd={!!this.props.hdSource}
                progress={this.state.currentTime}
                duration={this.state.duration}
                controlVideo={this.control}
                seekVideo={this.seek}
                replayVideo={this.replay}
                resizeVideo={this.resize}
                changeToHd={this.changeToHd}
                title={this.props.title}
                {...this.props.videoControlStyle}
                {...this.props.videoControlIcons} />
        );
    }

    renderVideo() {
        if (this.state.source) {
            return (
                <Video
                    ref={player => this.player = player}
                    style={Styles.player}
                    source={this.state.source}
                    playWhenInactive={true}
                    resizeMode={this.props.resizeMode}
                    paused={this.state.paused}
                    onEnd={this.onEnd}
                    onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                    onProgress={this.onProgress}
                    onError={this.onError} />
            );
        }
        else {
            return null;
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <Animated.View
                    {...this.panResponder.panHandlers}
                    ref="container"
                    style={[
                        Styles.container,
                        this.props.containerStyle, {
                            zIndex: 1,
                            transform: [
                                { translateX: this.translateX },
                                { translateY: this.translateY },
                                { rotate: this.rotate },
                            ],
                            width: this.resizeX,
                            height: this.resizeY
                        }]}>
                    {this.renderVideo()}
                    {
                        this.props.audioBackgroundImage ?
                            <Image style={{ height: this.props.height, width: ScreenWidth }}
                                source={this.props.audioBackgroundImage} /> : null
                    }
                    {this.renderVideoControl()}
                </Animated.View>
            );
        }
        else if (Platform.OS === 'android') {
            return (
                <Animated.View
                    {...this.panResponder.panHandlers}
                    ref="container"
                    style={[
                        Styles.container,
                        this.props.containerStyle,
                        {
                            zIndex: 1,
                            width: this.resizeX,
                            height: this.resizeY
                        },
                    ]}>
                    {this.renderVideo()}
                    {
                        this.props.audioBackgroundImage ?
                            <Image style={{ height: this.props.height, width: ScreenWidth }}
                                source={this.props.audioBackgroundImage} /> : null
                    }
                    {this.renderVideoControl()}
                </Animated.View>
            );
        }
    }
}

const DeviceOrientation = {
    Landscape: 'LANDSCAPE',
    Portrait: 'PORTRAIT'
}

const ScreenWidth = Dimensions.get('window').width;

const ScreenHeight = Dimensions.get('window').height;

const EnterFullScreenAnimationTime = Platform.OS === 'android' ? 155 : 555;

VideoPlayer.propTypes = {
    paused: PropTypes.bool,
    title: PropTypes.string,
    lastPlayTime: PropTypes.number,
    containerStyle: View.propTypes.style,
    source: PropTypes.any,
    resizeMode: PropTypes.string, // cover or contain, cover by default 
    hdSource: PropTypes.any,
    autoSize: PropTypes.bool,
    height: PropTypes.number,
    videoControlStyle: View.propTypes.style, // default videoControl style 
    videoControlIcons: PropTypes.object, // default videoControl icons 
    videoControl: PropTypes.func, // custom video control
    startPlayWithFullsize: PropTypes.bool,
    onVideoLoaded: PropTypes.func,
    onVideoResize: PropTypes.func,
    updateVideoState: PropTypes.func,
    isDisplayFullScreenButton: PropTypes.bool,
    audioBackgroundImage: Image.propTypes.source
}

VideoPlayer.defaultProps = {
    isDisplayFullScreenButton: true,
    paused: false,
    resizeMode: 'cover',
    autoSize: true,
    height: ScreenWidth / 16 * 9
}

class TestVideoPlayer extends ImmutableComponent {
    constructor(props) {
        super(props);
        this.state = {
            audioBackgroundImage: null,
            isDisplayFullScreenButton: true,
            autoSize: true,
            height: 200,
            hdSource: { uri: 'http://dscj-app.oss-cn-qingdao.aliyuncs.com/video/20160908182041_640.mp4' },
            source: { uri: 'http://dscj-test.oss-cn-hangzhou.aliyuncs.com/video_640/test-demo-min.mp4' },
            startPlayWithFullsize: false
        };
    }

    render() {
        return (
            <View>
                <VideoPlayer
                    title='test'
                    audioBackgroundImage={this.state.audioBackgroundImage}
                    isDisplayFullScreenButton={this.state.isDisplayFullScreenButton}
                    autoSize={this.state.autoSize}
                    height={this.state.height}
                    startPlayWithFullsize={this.state.startPlayWithFullsize}
                    source={this.state.source}
                    hdSource={this.state.hdSource}
                    videoControlIcons={{
                        quitFullscreenIcon: require('./img/back.png'),
                        pauseIcon: require('./img/pause.png'),
                        playIcon: require('./img/play.png'),
                        replayIcon: require('./img/replay.png'),
                        fullscreenIcon: require('./img/fullscreen.png'),
                        exitFullscreenIcon: require('./img/exitFullscreen.png')
                    }} />
                <TouchableOpacity onPress={() => {
                    this.setState({
                        source: { uri: 'http://dscj-test.oss-cn-hangzhou.aliyuncs.com/video_640/test-demo-min.mp4' },
                        isDisplayFullScreenButton: true,
                        hdSource: null,
                        audioBackgroundImage: null,
                        startPlayWithFullsize: true
                    });
                }}>
                    <Text>change source & play with fullsize</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        source: { uri: 'http://audio.xmcdn.com/group25/M05/8E/17/wKgJMVhCyTXSuy4CAN1cppkqWic906.m4a' },
                        //source: { uri: 'http://a.tumblr.com/tumblr_ll3por5Y3P1qjmo16o1.mp3' },
                        autoSize: false,
                        isDisplayFullScreenButton: false,
                        height: 200,
                        audioBackgroundImage: { uri: 'https://pic4.zhimg.com/80/v2-7dff9dc454a797c5ab258dde1827847b_r.jpg' },
                        hdSource: null
                    });
                }}>
                    <Text>play audio</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

VideoPlayer.test = (define) => {
    define('VideoPlayer', () => <TestVideoPlayer />);
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        justifyContent: 'flex-start'
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});