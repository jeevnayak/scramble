import {
  ResultRecord,
} from "./model.js";
import {
  formatSeconds,
  getSecondsRemaining,
} from "./Timer.jsx";
import {
  getAnswers,
} from "./words.js";

import Styles from "./Result.less";

export default class Result extends React.Component {
  static propTypes = {
    result: React.PropTypes.instanceOf(ResultRecord).isRequired,
  };

  render() {
    const { result } = this.props;
    const startTime = result.get("startTime");
    let rounds = result.get("completed").map((round) => <Round
      word={round.answer}
      secondsRemaining={getSecondsRemaining(startTime, round.time)}/>);
    rounds.push(<Round word={getAnswers(result.get("currentScramble"))[0]}/>)
    return <div className={Styles.results}>
      <div
          className={Styles.score}
          style={{ color: quip.apps.ui.ColorMap.BLUE.VALUE }}>
        Your Score: {result.getScore()}
      </div>
      <div className={Styles.rounds}>{rounds}</div>
    </div>;
  }
}

class Round extends React.Component {
  static propTypes = {
    word: React.PropTypes.string.isRequired,
    secondsRemaining: React.PropTypes.number,
  };

  render() {
    const { word, secondsRemaining } = this.props;
    const color = secondsRemaining ?
      quip.apps.ui.ColorMap.YELLOW.VALUE : quip.apps.ui.ColorMap.RED.VALUE;
    return <div className={Styles.round} style={{ color }}>
      <div>{word.toUpperCase()}</div>
      <div>{secondsRemaining ? formatSeconds(secondsRemaining) : undefined}</div>
    </div>;
  }
}
