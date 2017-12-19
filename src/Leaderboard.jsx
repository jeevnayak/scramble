import {
  RootRecord,
} from "./model.js";

import Styles from "./Leaderboard.less";

export default class Leaderboard extends React.Component {
  static propTypes = {
    rootRecord: React.PropTypes.instanceOf(RootRecord).isRequired,
    onClickResult: React.PropTypes.func.isRequired,
  };

  render() {
    const { rootRecord, onBack, onClickResult } = this.props;
    const results = rootRecord.getCompletedResults()
      .slice(0, 10)
      .map((result, i) => <Result
        key={i}
        user={result.getUser()}
        score={result.getScore()}
        position={i + 1}
        onClick={() => onClickResult(result)}/>);
    return <div className={Styles.leaderboard}>
        <div
          className={Styles.title}
          style={{ color: quip.apps.ui.ColorMap.BLUE.VALUE }}>
        Leaderboard
      </div>
      {results}
    </div>;
  }
}

class Result extends React.Component {
  static propTypes = {
    user: React.PropTypes.instanceOf(quip.apps.User).isRequired,
    score: React.PropTypes.number.isRequired,
    position: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
  };

  render() {
    const { user, score, position, onClick } = this.props;
    const color = user.getId() === quip.apps.getViewingUser().getId() ?
      quip.apps.ui.ColorMap.YELLOW.VALUE : quip.apps.ui.ColorMap.BLUE.VALUE;
    return <div className={Styles.result} style={{ color }} onClick={onClick}>
      <div>{position + ". " + user.getName().toUpperCase()}</div>
      <div>{score}</div>
    </div>;
  }
}
