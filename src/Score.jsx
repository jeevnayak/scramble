import {
  ResultRecord,
} from "./model.js";

import Styles from "./Score.less";

export default class Score extends React.Component {
  static propTypes = {
    result: React.PropTypes.instanceOf(ResultRecord).isRequired,
  };

  constructor(props) {
    super();
    this.state = {score: props.result.getScore()};
  }

  componentDidMount() {
    this.props.result.listen(this.updateScore);
  }

  componentWillUnmount() {
    this.props.result.unlisten(this.updateScore);
  }

  render() {
    return <div
        className={Styles.score}
        style={{color: quip.apps.ui.ColorMap.BLUE.VALUE}}>
      {this.state.score}
    </div>;
  }

  updateScore = () => {
    this.setState({score: this.props.result.getScore()});
  }
}
