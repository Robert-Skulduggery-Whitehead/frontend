import React from "react";
import "./team.css";

export default class Team extends React.Component {
  constructor(props) {
    //props: class, team, bomb, allplayers, map, side
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class={"team " + this.props.class}>
        <div class={"teamLogo " + this.props.class + "Logo"}>
          <img
            class="teamLogoImage"
            src={"./teamImages/" + this.props.team.img}
            alt=""
          ></img>
        </div>
        <div class="teamName">{this.props.team.name}</div>
        <div
          class={
            "teamScoreShadow " +
            this.props.class +
            "ScoreShadow" +
            this.props.side
          }
        >
          <div
            class={"teamScore " + this.props.class + "Score " + this.props.side}
          >
            {this.props.side === "ct" && (
              <div>{this.props.map.team_ct.score}</div>
            )}
            {this.props.side === "t" && (
              <div>{this.props.map.team_t.score}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
