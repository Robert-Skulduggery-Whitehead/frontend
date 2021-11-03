import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error, errorInfo) {
    //
  }

  componentDidMount() {}

  render() {
    return <div class="timer">Timer</div>;
  }
}
