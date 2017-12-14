import {
  RootRecord,
} from "./model.js";

export default class Start extends React.Component {
  static propTypes = {
    onStart: React.PropTypes.func.isRequired,
  };

  render() {
    return <div onClick={this.props.onStart}>Start</div>;
  }
}
