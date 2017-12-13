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

  componentDidMount() {
    this.props.rootRecord.get("results").listen(this.onResultsChanged);
  }

  componentWillUnmount() {
    this.props.rootRecord.get("results").unlisten(this.onResultsChanged);
  }

  render() {
    const { rootRecord } = this.props;
    const result = rootRecord.getResultForViewingUser();
    let contents;
    if (result) {
      contents = <Game rootRecord={rootRecord}/>;
    } else {
      contents = <Start rootRecord={rootRecord}/>;
    }
    return <div
        className={Styles.app}
        style={{
          backgroundColor: quip.apps.ui.ColorMap.BLUE.VALUE_LIGHT,
        }}>
      {contents}
    </div>;
  }

  onResultsChanged = () => {
    this.forceUpdate();
  }
}
