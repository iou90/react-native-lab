/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AutoHeightWebView from 'react-native-autoheightwebview';

export default class lab extends Component {
  render() {
    const script = `document.body.style.background = 'lightyellow';`;
    const html = `<p>1. &nbsp;课程内容：<span style=\"color: rgb(51, 51, 51); font-size: 14px; line-height: 24px; white-space: normal;\">普通话、</span><span style=\"color: rgb(51, 51, 51); font-size: 14px; line-height: 24px; white-space: normal;\">综合素质系统班（中学）、教育知识与能力系统班（中学）、冲刺班、面试实战班</span>。<span style=\"font-weight: 700; color: rgb(51, 51, 51); font-size: 14px; line-height: 24px;\">（不含学科知识与能力）</span></p><div><p>2. &nbsp;课程特色：全程保驾护航，省心省力，包含所有班次的全套服务，理论课程无限次免费听，并且配备私人助教辅导学习。</p><p>3. &nbsp;课程时间：笔试课程9月19日-10月28日；笔试冲刺班开课时间为考前一周，面试实战班开课时间为考前一个月。</p></div><div><p>4. &nbsp;购课方式：点师成金APP内购课，购课后加群<span style=\"font-size:16px;font-family: 宋体\">294085100</span>联系助教。</p></div><div><p>5. &nbsp;适用人群：备考2016中<span style=\"color: rgb(51, 51, 51); font-size: 14px; line-height: 24px;\">小</span>学教师资格考试学员，不适用幼儿园学员。</p><p><br/></p></div>`;
    return (
      <AutoHeightWebView
        customScript={script}
        html={html} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('lab', () => lab);
