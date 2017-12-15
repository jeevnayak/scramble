import Constants from "./constants.js";

import Styles from "./Timer.less";

export default class Timer extends React.Component {
  static propTypes = {
    startTime: React.PropTypes.number.isRequired,
    onFinish: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super();
    this.interval = null;
    this.state = {secondsRemaining: getSecondsRemaining(props.startTime)};
  }

  componentDidMount() {
    this.update();
    this.interval = window.setInterval(this.update, 200);
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  render() {
    return <div
        className={Styles.timer}
        style={{color: quip.apps.ui.ColorMap.BLUE.VALUE}}>
      {formatSeconds(this.state.secondsRemaining)}
    </div>;
  }

  update = () => {
    const secondsRemaining = getSecondsRemaining(this.props.startTime);
    this.setState({ secondsRemaining });
    if (secondsRemaining <= 0) {
      this.props.onFinish();
    }
  }
}

export function getSecondsRemaining(startTime, currentTime) {
  currentTime = currentTime || Date.now();
  const secondsElapsed = Math.floor((currentTime - startTime) / 1000);
  return Constants.GAME_SECONDS - secondsElapsed;
}

export function formatSeconds(seconds) {
  return "0:" + (seconds < 10 ? "0" + seconds : seconds);
}
