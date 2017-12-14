import Constants from "./constants.js";
import Game from "./Game.jsx";
import {
  RootRecord,
} from "./model.js";
import Start from "./Start.jsx";

import Styles from "./App.less";

export default class App extends React.Component {
  static propTypes = {
    rootRecord: React.PropTypes.instanceOf(RootRecord).isRequired,
  };

  constructor(props) {
    super();
    this.state = {started: false};
  }

  render() {
    const { rootRecord } = this.props;
    const result = rootRecord.getResultForViewingUser();
    let contents;
    if (result) {
      if (this.state.started) { // TODO: check time
        contents = <Game
          seed={rootRecord.get("seed")}
          result={result}
          onFinish={this.onFinish}/>;
      } else {
        // TODO: render finish screen
        contents = <Game
          seed={rootRecord.get("seed")}
          result={result}
          onFinish={this.onFinish}/>;
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
}
