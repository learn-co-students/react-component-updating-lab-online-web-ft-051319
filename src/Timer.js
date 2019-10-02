import React, { Component } from "react";

class Timer extends Component {
  constructor() {
    super();
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  // `shouldComponentUpdate` useful in stopping unwanted component updates 
  // Mainly used for performance enhancement
  // Can also have `class Timer extends React.PureComponent` instead 
  // Pure components do not implement `shouldComponentUpdate`.
  // Instead, a pure component automatically does a
  // comparison of current and next props and state,
  // and only updates if it registers a change.
  // implements `shouldComponentUpdate` with a shallow prop and state comparison
  // React.PureComponent’s shouldComponentUpdate() skips
  // prop updates for the whole component subtree.
  // Make sure all the children components are also “pure”.
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.time === nextState.time) {
      return false
    }
    return true
  }

  // useful for DOM manipulation and updating 3rd party libraries
  componentDidUpdate() {
    this.timer.current.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };
}

export default Timer;
