import React from "react";
import "./allplayers.css";
import PlayerAlive from "./playerAlive/playerAlive";
import PlayerDead from "./playerDead/playerDead";
import UtilBar from "./utilBar/utilBar";
import EconomyBar from "./economyBar/economyBar";

export default class AllPlayers extends React.Component {
  constructor(props) {
    //props: allplayers, teams, map, sides, bomb
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div class="allPlayers">
        <UtilBar
          allplayers={this.props.allplayers}
          side="Left"
          phase={this.props.map.phase}
        ></UtilBar>
        <EconomyBar
          allplayers={this.props.allplayers}
          side="Left"
          map={this.props.map.phase}
        ></EconomyBar>
        <div class="allPlayersContainer allPlayersContainerLeft">
          {Object.keys(this.props.allplayers).map((playerID) => {
            if (
              this.props.allplayers[playerID].team ===
              this.props.sides.left.toUpperCase()
            ) {
              if (this.props.allplayers[playerID].state.health !== 0) {
                return (
                  <PlayerAlive
                    key={playerID}
                    team={this.props.sides.left}
                    side={"Left"}
                    player={this.props.allplayers[playerID]}
                    teamLogo={this.props.teams.left.img}
                    bomb={this.props.bomb}
                    playerID={playerID}
                  ></PlayerAlive>
                );
              } else {
                return (
                  <PlayerDead
                    key={playerID}
                    team={this.props.sides.left}
                    side={"Left"}
                    player={this.props.allplayers[playerID]}
                    teamLogo={this.props.teams.left.img}
                  ></PlayerDead>
                );
              }
            }
          })}
        </div>
        <UtilBar
          allplayers={this.props.allplayers}
          side="Right"
          phase={this.props.map.phase}
        ></UtilBar>
        <EconomyBar
          allplayers={this.props.allplayers}
          side="Right"
          map={this.props.map.phase}
        ></EconomyBar>
        <div class="allPlayersContainer allPlayersContainerRight">
          {Object.keys(this.props.allplayers).map((playerID) => {
            if (
              this.props.allplayers[playerID].team ===
              this.props.sides.right.toUpperCase()
            ) {
              if (this.props.allplayers[playerID].state.health !== 0) {
                return (
                  <PlayerAlive
                    key={playerID}
                    team={this.props.sides.right}
                    side={"Right"}
                    player={this.props.allplayers[playerID]}
                    teamLogo={this.props.teams.right.img}
                    bomb={this.props.bomb}
                    playerID={playerID}
                  ></PlayerAlive>
                );
              } else {
                return (
                  <PlayerDead
                    key={playerID}
                    team={this.props.sides.right}
                    side={"Right"}
                    player={this.props.allplayers[playerID]}
                    teamLogo={this.props.teams.right.img}
                  ></PlayerDead>
                );
              }
            }
          })}
        </div>
      </div>
    );
  }
}
