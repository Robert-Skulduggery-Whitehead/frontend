import React from "react";
import "./playerNumber.css";

export default class PlayerNumber extends React.Component {
  constructor(props) {
    //props: number, side
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div
        class={
          "playerNumberContainer + playerNumberContainer" + this.props.side
        }
      >
        <div class={"playerNumber playerNumber" + this.props.side}>
          {this.props.number}
        </div>
      </div>
    );
  }
}
