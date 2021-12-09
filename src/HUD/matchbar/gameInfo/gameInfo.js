import React from "react";
import "./gameInfo.css";

export default class GameInfo extends React.Component {
  constructor(props) {
    //props: series, teams, sides, round
    super(props);
    this.state = {
      round: 1,
      totalRounds: 30,
    };
  }

  componentDidUpdate(prevProps) {
    let tempRound = this.props.round;
    let tempTotalRounds = 30;
    if (tempRound > 30) {
      tempRound = tempRound - 30;
      while (tempRound > 6) {
        tempRound = tempRound - 6;
        tempTotalRounds = tempTotalRounds + 6;
      }
    }
    if (prevProps !== this.props) {
      this.setState({
        round: tempRound,
        totalRounds: tempTotalRounds,
      });
    }
  }

  componentDidCatch(error, errorInfo) {
    //
  }

  componentDidMount() {}

  render() {
    return (
      <div class="gameInfo">
        <div class={"seriesWinsLeft seriesLength" + this.props.series.bestOf}>
          {Object.keys(this.props.series.games).map((gameNo) => {
            if (
              this.props.series.games[gameNo].winner ===
              this.props.teams.left.name
            ) {
              return (
                <div
                  key={gameNo}
                  class={"seriesDot " + this.props.sides.left + "Dot"}
                ></div>
              );
            } else {
              if (
                parseInt(gameNo.substring(4, 5)) <=
                Math.ceil(this.props.series.bestOf / 2)
              ) {
                return <div key={gameNo} class="seriesDot"></div>;
              }
            }
          })}
        </div>
        <div class="gameInfoRounds">
          ROUND {this.state.round + 1}/{this.state.totalRounds}
        </div>
        <div></div>
        <div class="gameInfoSeriesLength">
          BEST OF {this.props.series.bestOf}
        </div>
        <div class={"seriesWinsRight seriesLength" + this.props.series.bestOf}>
          {Object.keys(this.props.series.games).map((gameNo) => {
            if (
              this.props.series.games[gameNo].winner ===
              this.props.teams.right.name
            ) {
              return (
                <div
                  key={gameNo}
                  class={"seriesDot " + this.props.sides.right + "Dot"}
                ></div>
              );
            } else {
              if (
                parseInt(gameNo.substring(4, 5)) <=
                Math.ceil(this.props.series.bestOf / 2)
              ) {
                return <div key={gameNo} class="seriesDot"></div>;
              }
            }
          })}
        </div>
      </div>
    );
  }
}
