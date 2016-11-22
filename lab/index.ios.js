/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AliyunOSS from 'react-native-aliyun-oss';

import Video from 'react-native-video';

import VideoPlayer from './VideoPlayer';

export default class lab extends Component {
  constructor(props) {
    super(props);
    AliyunOSS.enableOSSLog();
    const config = {
      AccessKey: 'I55gwdJazvvCDIKi',
      SecretKey: 'ro89UkyAyFGPA0T7qtaGKssfT9qQFJ',
    };
    const endPoint = 'https://oss-cn-qingdao.aliyuncs.com';
    AliyunOSS.initWithKey(config, endPoint);
    this.onload = this.onload.bind(this);
    this.state = {
      VideoDownloadProgress: 0,
      ImageUploadProgress: 0,
      ImageDownloadProgress: 0,
      downloadVideoUri: null,
      downloadImageUri: null,
      downloadImageHeight: 1,
      downloadImageWidth: 1
    }
  }

  async componentDidMount() {
    const uploadImageFileName = 'IMG_0126.PNG'
    const uploadImageConfig = {
      bucketName: 'dscj-app',
      sourceFile: '/Users/iou90/Library/Developer/CoreSimulator/Devices/02CB70BC-F5B6-48D9-82E0-CED29F61859B/data/Containers/Data/Application/9AC842FB-31BA-4DF4-8BA2-9C68B5D50D25/Documents/IMG_0126.PNG',
      ossFile: 'test/IMG_0126.PNG'
    };
    const uploadProgress = p => this.setState({ ImageUploadProgress: p.currentSize / p.totalSize });
    AliyunOSS.addEventListener('uploadProgress', uploadProgress);
    await AliyunOSS.uploadObjectAsync(uploadImageConfig)
      .then((resp) => {
        console.log(resp);
        AliyunOSS.removeEventListener('uploadProgress', uploadProgress);
      });
    const downloadImageConfig = {
      bucketName: 'dscj-app',
      ossFile: 'test/201610271758035.jpg'
    };
    const downloadImageProgress = p => this.setState({ ImageDownloadProgress: p.currentSize / p.totalSize });
    AliyunOSS.addEventListener('downloadProgress', downloadImageProgress);
    await AliyunOSS.downloadObjectAsync(downloadImageConfig).then(path => {
      console.log(path);
      this.setState({ downloadImageUri: path });
      AliyunOSS.removeEventListener('downloadProgress', downloadImageProgress);
    }).catch((error) => {
      console.error(error);
    });
    const downloadVideoConfig = {
      bucketName: 'dscj-app',
      ossFile: 'video/test-demo-min.mp4'
    };
    const downloadVideoProgress = p => this.setState({ VideoDownloadProgress: p.currentSize / p.totalSize });
    AliyunOSS.addEventListener('downloadProgress', downloadVideoProgress);
    await AliyunOSS.downloadObjectAsync(downloadVideoConfig).then(path => {
      console.log(path);
      this.setState({ downloadVideoUri: path });
      AliyunOSS.removeEventListener('downloadProgress', downloadVideoProgress);
    }).catch((error) => {
      console.error(error);
    });
  }

  onload(event) {
    Image.getSize(event.nativeEvent.source.url, (w, h) => {
      this.setState({
        downloadImageHeight: h,
        downloadImageWidth: w
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          aliyun oss test
        </Text>
        <Text style={styles.instructions}>
          {'image upload progress: ' + this.state.ImageUploadProgress}
        </Text>
        <Text style={styles.instructions}>
          {'image download progress: ' + this.state.ImageDownloadProgress}
        </Text>
        {
          this.state.downloadImageUri ? <Image
            style={{
              height: this.state.downloadImageHeight,
              width: this.state.downloadImageWidth
            }}
            onLoad={this.onload}
            source={{ uri: this.state.downloadImageUri }}
            /> : null
        }
        <Text style={styles.instructions}>
          {'video download progress: ' + this.state.VideoDownloadProgress}
        </Text>
        {
          this.state.downloadVideoUri ? <VideoPlayer source={{ uri: this.state.downloadVideoUri }} /> : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('lab', () => lab);
