/**
 * test component
 * @providesModule Playground
 */

'use strict';

import React, {
  Component,
  PropTypes
} from 'react';

import { View } from 'react-native';

export default class Playground extends Component {
  constructor() {
    super();
    this.state = { content: null };
  }

  componentDidMount() {
    const define = (name, render) => {
      this.setState({ content: <Example key={name} render={render} /> });
    };
    Playground.Module.test(define);
  }

  render() {
    const content = this.state.content;
    return content;
  }
}

Playground.config = (module) => {
  Playground.Module = module;
}

class Example extends Component {
  constructor() {
    super();
    this.state = { inner: null };
  }

  render() {
    const content = this.props.render(this.state.inner, (inner) => this.setState({ inner }));
    return content;
  }
}
