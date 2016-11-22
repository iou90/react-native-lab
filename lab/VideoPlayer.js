/** @providesModule VideoPlayer 
 * AppRegistry.registerComponent('dscj_app_rn', () => {
    Playground.config(require('VideoPlayer'));
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
    Dimensions,
    InteractionManager,
    PanResponder,
    PixelRatio,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Video from 'react-native-video';

// import Orientation from 'react-native-orientation';

// import { VideoControl, VideoPlayerState } from './VideoControl';

import NavigationBar from './NavigationBar';

export default class VideoPlayer extends Component {
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
        if (Platform.OS === 'android') {
            this.isResizingOnAndroid = false;
        }
        this.state = {
            hideVideo: false,
            videoHeight: 195,
            isLoading: true,
            // playerState: VideoPlayerState.Playing,
            source: null,
            paused: false,
            currentTime: 0,
            duration: 0,
            isHideToolBar: false,
            isLandscape: false,
            deviceOrientation: DeviceOrientation.Portrait,
            isHd: false
        }
        this.resizeX = this.resizeAnimatedValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: !this.state.isLandscape ? [ScreenWidth, ScreenHeight] : [ScreenHeight, ScreenWidth]
            }
        );
        const h = !this.props.autoSize && this.props.height ? this.props.height : this.state.videoHeight;
        this.resizeY = this.resizeAnimatedValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: !this.state.isLandscape ? [h, ScreenWidth] : [ScreenWidth, h]
            }
        );
    }

    componentWillMount() {
        // Orientation.addOrientationListener(this.orientationChanged);
        // Orientation.lockToPortrait();
        // get the video source
        this.setState((prevState, props) => ({ source: props.source }));
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (event, gestureState) => {
                if (this.controller && this.controller.state.isVisible) {
                    return false;
                }
                return Math.abs(gestureState.dx * ScreenPixelRatio) > 5;
            },
            onPanResponderGrant: (event, gestureState) => {
                if (this.state.isLoading) {
                    return;
                }
                this.setState({ paused: true });
            },
            onPanResponderRelease: (event, gestureState) => {
                if (this.state.isLoading) {
                    return;
                }
                const {
                    isLoading,
                    currentTime,
                    duration,
                    isLandscape,
                } = this.state;
                if (isLoading || this.state.duration <= 0) {
                    return;
                }
                const width = (isLandscape ? ScreenHeight : ScreenWidth) / ScreenPixelRatio;
                const unit = duration < width ? duration / width : width / duration;
                const draggedSeconds = gestureState.dx * unit;
                const currentTimeAfterDragged = currentTime + draggedSeconds > duration ? duration : currentTime + draggedSeconds < 0 ? 0 : currentTime + draggedSeconds;
                this.player.seek(currentTimeAfterDragged);
                this.setState({
                    paused: false,
                    // playerState: VideoPlayerState.Playing
                });
            }
        });
    }

    // when player setting props changed
    componentWillReceiveProps(nextProps) {
        if (!nextProps.source) { return; }
        this.startPlayWithFullsize = nextProps.startPlayWithFullsize;
        this.setState({
            source: nextProps.source,
            isHd: false
        });
    }

    shouldComponentUpdate(nextProps, nextState, context) {
        if (this.state.isLandscape !== nextState.isLandscape) {
            const h = !this.props.autoSize && this.props.height ? this.props.height : this.state.videoHeight;
            this.resizeX = this.resizeAnimatedValue.interpolate(
                {
                    inputRange: [0, 1],
                    outputRange: !nextState.isLandscape ? [ScreenWidth, ScreenHeight] : [ScreenHeight, ScreenWidth]
                }
            );
            this.resizeY = this.resizeAnimatedValue.interpolate(
                {
                    inputRange: [0, 1],
                    outputRange: !nextState.isLandscape ? [h, ScreenWidth] : [ScreenWidth, h]
                }
            );
        }
        return true;
    }

    componentDidUpdate() {
        if (Platform.OS === 'android' && this.state.hideVideo) {
            if (this.isResizingOnAndroid) {
                this.setState({
                    hideVideo: false,
                    paused: true
                });
            }
            else {
                this.setState({
                    hideVideo: false,
                    // playerState: VideoPlayerState.Playing // replay
                });
            }
        }
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this.orientationChanged);
        Orientation.unlockAllOrientations();
    }

    orientationChanged(orientation) {
        if (orientation === DeviceOrientation.Landscape) {
            this.setState({
                isHideToolBar: true,
                deviceOrientation: DeviceOrientation.Landscape
            });
        }
        else {
            this.setState({
                isHideToolBar: false,
                deviceOrientation: DeviceOrientation.Portrait
            });
        }
    }

    animateResize() {
        Animated.timing(
            this.resizeAnimatedValue, {
                toValue: 1,
                duration: enterFullScreenAnimationTime
            }
        ).start(() => {
            this.setState(prevState => ({
                isHideToolBar: prevState.isLandscape ? false : true,
                isLandscape: !prevState.isLandscape
            }));
            this.resizeAnimatedValue.setValue(0);
        });
    }

    seek(value) {
        this.player.seek(value);
    };

    // play or pause
    control() {
        this.setState(prevState => ({
            paused: !prevState.paused,
            // playerState: !prevState.paused ? VideoPlayerState.Paused : VideoPlayerState.Playing
        }));
    };

    replay() {
        if (Platform.OS === 'android') {
            this.setState({ hideVideo: true });
        }
        else {
            this.player.seek(0);
            // this.setState({ playerState: VideoPlayerState.Playing });
        }
    }

    onProgress(data) {
        if (this.state.isLoading) {
            return null;
        }
        this.setState({ currentTime: data.currentTime });
        if (Platform.OS === 'android' && data.currentTime >= this.state.duration) {
            // this.setState({ playerState: VideoPlayerState.Ended });
        }
    };

    onLoad(data) {
        if (this.props.autoSize) {
            const ratio = ScreenWidth / data.naturalSize.width;
            const h = data.naturalSize.height * ratio;
            this.setState({
                videoHeight: h,
                duration: data.duration,
                isLoading: false
            });
            this.resizeY = this.resizeAnimatedValue.interpolate(
                {
                    inputRange: [0, 1],
                    outputRange: !this.state.isLandscape ? [h, ScreenWidth] : [ScreenWidth, h]
                }
            );
        }
        else {
            this.setState({
                duration: data.duration,
                isLoading: false
            });
        }
        if (this.resumeTime > 0) {
            if (Platform.OS === 'android' && this.isResizingOnAndroid) {
                this.player.seek(this.resumeTime);
                this.isResizingOnAndroid = false;
                this.setState({ paused: false });
            }
            else {
                this.player.seek(this.resumeTime);
            }
            this.resumeTime = 0;
        }
        if (this.startPlayWithFullsize) {
            this.resize();
            this.startPlayWithFullsize = false;
        }
    };

    onLoadStart(data) {
        this.setState({ isLoading: true });
    };

    onEnd() {
        // this.setState({ playerState: VideoPlayerState.Ended });
    };

    onError(error) {
        console.log("video play error:", error);
    };

    handleFromFullScreen(isContinuePlay) {
        this.control();
    }

    resize() {
        this.setState({ isHideToolBar: true });
        // if (this.state.deviceOrientation === DeviceOrientation.Portrait) {
        //     Orientation.lockToLandscapeLeft();
        // }
        // else {
        //     Orientation.lockToPortrait();
        // }
        this.animateResize();
        if (Platform.OS === 'android') {
            this.isResizingOnAndroid = true;
            this.resumeTime = this.state.currentTime;
            this.setState({
                hideVideo: true
            });
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

    renderToolBar() {
        if (this.state.hideVideo) {
            return null;
        }
        if (this.state.isHideToolBar || this.props.disableToolBar) {
            return null;
        }
        if (this.props.toolBar) {
            const ToolBar = this.props.toolBar;
            return <ToolBar />;
        }
        return (
            <NavigationBar
                {...this.props.toolBarSettings}
                />
        );
    }

    renderVideoControl() {
        if (this.state.hideVideo) {
            return null;
        }
        if (this.props.videoControl) {
            const CustomVideoControl = this.props.videoControl;
            return <CustomVideoControl />;
        }
        return (
            // <VideoControl
            //     ref={controller => this.controller = controller}
            //     state={this.state.playerState}
            //     isLoading={this.state.isLoading}
            //     isFullScreen={this.state.isLandscape}
            //     isHd={this.state.isHd}
            //     progress={this.state.currentTime}
            //     duration={this.state.duration}
            //     controlVideo={this.control}
            //     seekVideo={this.seek}
            //     replayVideo={this.replay}
            //     resizeVideo={this.resize}
            //     changeToHd={this.changeToHd}
            //     {...this.videoControlStyle}
            //     />
            null
        );
    }

    renderVideo() {
        if (this.state.hideVideo) {
            return null;
        }
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
                    onError={this.onError}
                    />
            );
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                ref="container"
                style={[
                    Styles.container,
                    {
                        width: this.resizeX,
                        height: this.resizeY
                    }
                ]}>
                {this.renderToolBar()}
                {this.renderVideo()}
                {this.renderVideoControl()}
            </Animated.View >
        );
    }
}

VideoPlayer.propTypes = {
    source: PropTypes.any.isRequired,
    resizeMode: PropTypes.string, // cover or contain, cover by default 
    hdSource: PropTypes.any,
    autoSize: PropTypes.bool,
    height: PropTypes.number,
    videoControlStyle: PropTypes.object, // style default videoControl
    videoControl: PropTypes.func, // custom video control
    toolBarSettings: PropTypes.object, // config default toolBar
    toolBar: PropTypes.func, //custom toolBar
    disableToolBar: PropTypes.bool,
    startPlayWithFullsize: PropTypes.bool
}

VideoPlayer.defaultProps = {
    resizeMode: 'cover',
    autoSize: true,
    height: NaN
}

class TestVideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: { uri: 'http://dscj-app.oss-cn-qingdao.aliyuncs.com/video/20160908182041.mp4' },
            hdSource: { uri: 'http://dscj-app.oss-cn-qingdao.aliyuncs.com/video/20160908182041_640.mp4' },
            startPlayWithFullsize: false
        };
    }

    render() {
        return (
            <View>
                <StatusBar hidden={true} />
                <VideoPlayer
                    autoSize={false}
                    height={200}
                    startPlayWithFullsize={this.state.startPlayWithFullsize}
                    source={this.state.source}
                    hdSource={this.state.hdSource}
                    />
                <TouchableOpacity onPress={() => {
                    this.setState({
                        source: { uri: 'http://dscj-test.oss-cn-hangzhou.aliyuncs.com/video_640/test-demo-min.mp4' },
                        hdSource: null,
                        startPlayWithFullsize: true
                    });
                } }>
                    <Text>change</Text>
                </TouchableOpacity>
            </View >
        );
    }
}

VideoPlayer.test = (define) => {
    define('VideoPlayer', () => <TestVideoPlayer />);
}

module.exports = VideoPlayer;

const DeviceOrientation = {
    Landscape: 'LANDSCAPE',
    Portrait: 'PORTRAIT'
}

const ScreenWidth = Dimensions.get('window').width;

const ScreenHeight = Dimensions.get('window').height;

const ScreenPixelRatio = PixelRatio.get();

const enterFullScreenAnimationTime = 55;

const Styles = StyleSheet.create({
    container: {
        zIndex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});

