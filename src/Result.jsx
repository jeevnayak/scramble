import Button from "./Button.jsx";
import {
  getSecondsRemaining,
  ResultRecord,
} from "./model.js";
import {
  formatSeconds,
} from "./Timer.jsx";
import {
  getAnswers,
} from "./words.js";

import Styles from "./Result.less";

export default class Result extends React.Component {
  static propTypes = {
    result: React.PropTypes.instanceOf(ResultRecord).isRequired,
    onShowLeaderboard: React.PropTypes.func.isRequired,
  };

  render() {
    const { result, onShowLeaderboard } = this.props;
    const startTime = result.get("startTime");
    let rounds = result.get("completed").map((round) => <Round
      word={round.skipped ? getAnswers(round.answer)[0] : round.answer}
      secondsRemaining={getSecondsRemaining(startTime, round.time)}
      skipped={round.skipped}/>);
    rounds.push(<Round word={getAnswers(result.get("currentScramble"))[0]}/>)
    return <div className={Styles.results}>
      <div
          className={Styles.score}
          style={{ color: quip.apps.ui.ColorMap.BLUE.VALUE }}>
        Your Score: {result.getScore()}
      </div>
      <div className={Styles.rounds}>{rounds}</div>
      <div className={Styles.leaderboardButton}>
        <Button text="LEADERBOARD" size={14} onClick={onShowLeaderboard}/>
      </div>
    </div>;
  }
}

class Round extends React.Component {
  static propTypes = {
    word: React.PropTypes.string.isRequired,
    secondsRemaining: React.PropTypes.number,
    skipped: React.PropTypes.bool,
  };

  render() {
    const { word, secondsRemaining, skipped } = this.props;
    const color = secondsRemaining && !skipped  ?
      quip.apps.ui.ColorMap.YELLOW.VALUE : quip.apps.ui.ColorMap.RED.VALUE;
    return <div className={Styles.round} style={{ color }}>
      <div>{word.toUpperCase()}</div>
      <div>{secondsRemaining ? formatSeconds(secondsRemaining) : undefined}</div>
    </div>;
  }
}
