import React from "react";
import "./seriesInfo.css";

export default class SeriesInfo extends React.Component {
  constructor(props) {
    //Props: series, teams, round
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {}

  componentDidMount() {}

  componentDidCatch() {}

  render() {
    if (this.props.round.phase === "freezetime") {
      return (
        <div class={"seriesInfo seriesInfo" + this.props.series.bestOf}>
          {Object.keys(this.props.series.games).map((gameId) => {
            if (parseInt(gameId.substring(4, 5)) <= this.props.series.bestOf) {
              return (
                <div class="seriesMapInfo">
                  <div class="seriesMapInfoTop">
                    {this.props.series.games[gameId].map}{" "}
                    {this.props.series.games[gameId].winner !== "current" &&
                      this.props.series.games[gameId].winner !== "tbp" && (
                        <span>
                          <img
                            class="seriesMapInfoImage"
                            src={"./teamImages/" + this.props.teams.left.img}
                            alt=""
                          ></img>
                          {this.props.teams.left.name ===
                            this.props.series.games[gameId].winner && (
                            <span>
                              {this.props.series.games[gameId].winnerScore}-
                              {this.props.series.games[gameId].loserScore}
                            </span>
                          )}
                          {this.props.teams.right.name ===
                            this.props.series.games[gameId].winner && (
                            <span>
                              {this.props.series.games[gameId].loserScore}-
                              {this.props.series.games[gameId].winnerScore}
                            </span>
                          )}
                          <img
                            class="seriesMapInfoImage"
                            src={"./teamImages/" + this.props.teams.right.img}
                            alt=""
                          ></img>
                        </span>
                      )}
                    {this.props.series.games[gameId].winner === "current" && (
                      <span class="seriesMapInfoCurrent">Current</span>
                    )}
                  </div>
                  <div class="seriesMapInfoBottom">
                    {this.props.series.games[gameId].picked !== "decider" && (
                      <span>
                        <span class="seriesMapInfoPickedBy">PICKED BY </span>
                        {this.props.series.games[gameId].picked}
                      </span>
                    )}
                    {this.props.series.games[gameId].picked === "decider" && (
                      <span>Decider Map</span>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
