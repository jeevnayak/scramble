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
    this.state = {numCompleted: props.result.get("completed").length};
  }

  componentDidMount() {
    this.props.result.listen(this.updateNumCompleted);
  }

  componentWillUnmount() {
    this.props.result.unlisten(this.updateNumCompleted);
  }

  render() {
    return <div
        className={Styles.score}
        style={{color: quip.apps.ui.ColorMap.BLUE.VALUE}}>
      {this.state.numCompleted}
    </div>;
  }

  updateNumCompleted = () => {
    this.setState({numCompleted: this.props.result.get("completed").length});
  }
}
