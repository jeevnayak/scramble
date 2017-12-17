import Button from "./Button.jsx";
import {
  RootRecord,
} from "./model.js";

import Styles from "./Leaderboard.less";

export default class Leaderboard extends React.Component {
  static propTypes = {
    rootRecord: React.PropTypes.instanceOf(RootRecord).isRequired,
    onBack: React.PropTypes.func.isRequired,
  };

  render() {
    const { rootRecord, onBack } = this.props;
    const results = rootRecord.getCompletedResults().map((result, i) => <Result
      user={result.getUser()}
      score={result.getScore()}
      position={i + 1}/>);
    return <div className={Styles.leaderboard}>
        <div
          className={Styles.title}
          style={{ color: quip.apps.ui.ColorMap.BLUE.VALUE }}>
        Leaderboard
      </div>
      {results}
      <div className={Styles.backButton}>
        <Button text="BACK" size={14} onClick={onBack}/>
      </div>
    </div>;
  }
}

class Result extends React.Component {
  static propTypes = {
    user: React.PropTypes.instanceOf(quip.apps.User).isRequired,
    score: React.PropTypes.number.isRequired,
    position: React.PropTypes.number.isRequired,
  };

  render() {
    const { user, score, position } = this.props;
    const color = user.getId() === quip.apps.getViewingUser().getId() ?
      quip.apps.ui.ColorMap.YELLOW.VALUE : quip.apps.ui.ColorMap.BLUE.VALUE;
    return <div className={Styles.result} style={{ color }}>
      <div>{position + ". " + user.getName().toUpperCase()}</div>
      <div>{score}</div>
    </div>;
  }
}
