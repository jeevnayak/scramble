import {
  RootRecord,
} from "./model.js";

export default class Start extends React.Component {
  static propTypes = {
    rootRecord: React.PropTypes.instanceOf(RootRecord).isRequired,
  };

  render() {
    return <div onClick={this.onClickStart}>Start</div>;
  }

  onClickStart = () => {
    this.props.rootRecord.createResultForViewingUser();
  }
}
