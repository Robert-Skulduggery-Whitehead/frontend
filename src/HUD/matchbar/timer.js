import React from "react";
import countdown from "easytimer.js";
import bombImage from "../../images/svgs/icon_c4_default.svg";
import defuseImage from "../../images/svgs/icon_defuse_default.svg";

export default class Timer extends React.Component {
  constructor(props) {
    //props: round, bomb, phase_countdowns
    super(props);
    this.state = {
      //Bomb state
      bombPlanted: false,
      bombDefused: false,
      bombTimer: 0,
      defuseTimer: 0,
      plantTimer: new countdown(),
      plantedPercentage: 100,
      plantingPercentage: 100,
      defusingPercentage: 100,
      defuseState: false,
      defuseTime: 10,
      phaseCountdown: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.phase_countdowns !== this.props.phase_countdowns) {
      this.setState({
        phase_countdowns: this.props.phase_countdowns,
      });
      let min = 0;
      let seconds = 0;
      let time = this.props.phase_countdowns.phase_ends_in;

      while (time >= 60) {
        min += 1;
        time -= 60;
      }
      seconds = Math.round(time);

      if (seconds < 10) {
        this.setState({
          phaseCountdown: min.toString() + ":0" + seconds.toString(),
        });
      } else {
        this.setState({
          phaseCountdown: min.toString() + ":" + seconds.toString(),
        });
      }
    }

    if (prevProps.bomb !== this.props.bomb) {
      this.setState({
        bomb: this.props.bomb,
      });
      if (!this.state.bombPlanted && this.props.bomb.state === "planted") {
        this.state.plantTimer.start({
          countdown: true,
          startValues: { seconds: 40 },
          precision: "secondTenths",
        });
        this.state.plantTimer.addEventListener("secondsUpdated", () => {
          let time = this.state.plantTimer.getTimeValues().seconds;
          let percentage = (time / 40) * 100;
          this.setState({
            plantedPercentage: percentage,
          });
        });
        this.setState({
          bombPlanted: true,
          defuseState: false,
        });
      }

      if (
        this.props.bomb.state === "defused" ||
        this.props.bomb.state === "dropped" ||
        this.props.bomb.state === "carried"
      ) {
        this.state.plantTimer.reset();
        this.setState({
          bombPlanted: false,
          defuseState: false,
        });
      }

      if (this.props.bomb.state === "defusing") {
        if (this.props.bomb.countdown <= 5) {
          this.setState({
            defuseState: true,
            defuseTime: 5,
          });
        } else {
          this.setState({
            defuseState: true,
            defuseTime: 10,
          });
        }
        this.setState({
          defusingPercentage:
            (this.props.bomb.countdown / this.state.defuseTime) * 100,
        });
      }

      if (this.props.bomb.state === "planting") {
        this.setState({
          plantingPercentage: (this.props.bomb.countdown / 3) * 100,
        });
      }
    }

    if (prevProps.round !== this.props.round) {
      this.setState({
        round: this.props.round,
      });
      if (this.props.round.phase === "over") {
        this.setState({
          bombPlanted: false,
          bombDefused: false,
        });
      }
    }
  }

  componentDidCatch(error, errorInfo) {
    //
  }

  componentDidMount() {
    //
  }

  render() {
    return (
      <div class="timerShadow">
        <div class="timer">
          {this.state.bombPlanted && !this.state.defuseState && (
            <img class="timerBombImage" src={bombImage} alt=""></img>
          )}
          {this.state.defuseState && (
            <div>
              <img class="timerDefuseImage" src={defuseImage} alt=""></img>
            </div>
          )}
          {!this.state.bombPlanted && !this.state.defuseState && (
            <div class="timerText">{this.state.phaseCountdown}</div>
          )}
        </div>
      </div>
    );
  }
}
