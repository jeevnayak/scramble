import Constants from "./constants.js";
import Game from "./Game.jsx";
import Leaderboard from "./Leaderboard.jsx";
import {
  getSecondsRemaining,
  RootRecord,
} from "./model.js";
import Result from "./Result.jsx";
import Start from "./Start.jsx";

import Styles from "./App.less";

export default class App extends React.Component {
  static propTypes = {
    rootRecord: React.PropTypes.instanceOf(RootRecord).isRequired,
  };

  constructor(props) {
    super();
    this.state = {
      started: false,
      showLeaderboard: false,
      showResult: null,
    };
  }

  render() {
    const { rootRecord } = this.props;
    const { started, showLeaderboard, showResult } = this.state;
    const viewerResult = rootRecord.getResultForViewingUser();
    let contents;
    if (viewerResult) {
      const secondsRemaining = getSecondsRemaining(viewerResult.get("startTime"));
      if (started && secondsRemaining > 0) {
        contents = <Game
          seed={rootRecord.get("seed")}
          result={viewerResult}
          onFinish={this.onFinish}/>;
      } else if (showLeaderboard) {
        contents = <Leaderboard
          rootRecord={rootRecord}
          onClickResult={this.showResult}
          onBack={this.onLeaderboardBack}/>;
      } else {
        contents = <Result
          result={showResult || viewerResult}
          onShowLeaderboard={this.onShowLeaderboard}/>;
      }
    } else {
      contents = <Start onStart={this.onStart}/>;
    }
    return <div
        className={Styles.app}
        style={{
          width: Constants.WIDTH,
          height: Constants.HEIGHT,
          backgroundColor: quip.apps.ui.ColorMap.BLUE.VALUE_LIGHT,
        }}>
      {contents}
    </div>;
  }

  onStart = () => {
    this.props.rootRecord.createResultForViewingUser();
    this.setState({started: true});
  }

  onFinish = () => {
    this.forceUpdate();
  }

  onShowLeaderboard = () => {
    this.setState({showLeaderboard: true});
  }

  showResult = (result) => {
    this.setState({
      showLeaderboard: false,
      showResult: result,
    });
  }

  onLeaderboardBack = () => {
    this.setState({showLeaderboard: false});
  }
}
