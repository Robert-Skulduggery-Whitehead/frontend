import React from "react";

export default class GameInfo extends React.Component {
  constructor(props) {
    //props: series, teams, sides
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {}

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
                <div class={"seriesDot " + this.props.sides.left + "Dot"}></div>
              );
            } else {
              if (gameNo !== "game" + this.props.series.bestOf) {
                return <div class="seriesDot"></div>;
              }
            }
          })}
        </div>
        <div class="gameInfoRounds">ROUND 9/30</div>
        <div></div>
        <div class="gameInfoSeriesLength">BEST OF 3</div>
        <div class={"seriesWinsRight seriesLength" + this.props.series.bestOf}>
          {Object.keys(this.props.series.games).map((gameNo) => {
            if (
              this.props.series.games[gameNo].winner ===
              this.props.teams.right.name
            ) {
              return (
                <div
                  class={"seriesDot " + this.props.sides.right + "Dot"}
                ></div>
              );
            } else {
              if (gameNo !== "game" + this.props.series.bestOf) {
                return <div class="seriesDot"></div>;
              }
            }
          })}
        </div>
      </div>
    );
  }
}
