import React from "react";
import Timer from "./timer";

export default class GameInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error, errorInfo) {
    //
  }

  componentDidMount() {}

  render() {
    return (
      <div class="gameInfo">
        <Timer></Timer>
      </div>
    );
  }
}
