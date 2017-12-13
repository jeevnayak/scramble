import rand from "random-seed";

import {
  RootRecord,
} from "./model.js";
import {
  checkAnswer,
  getRandomScramble,
} from "./words.js";

export default class Game extends React.Component {
  static propTypes = {
    rootRecord: React.PropTypes.instanceOf(RootRecord).isRequired,
  };

  constructor(props) {
    super();
    this.rand = rand.create(props.rootRecord.get("seed"));
    this.state = {
      scramble: this.getRandomScramble(),
      guess: "",
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  render() {
    return <div>
      <div>{this.state.scramble}</div>
      <div>{this.state.guess}</div>
    </div>;
  }

  getRandomScramble() {
    return getRandomScramble(this.rand);
  }

  onKeyDown = (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const c = String.fromCharCode(e.keyCode + 32);
      this.setState({guess: this.state.guess + c})
    } else if (e.keyCode === 8) {
      if (this.state.guess.length > 0) {
        this.setState({guess: this.state.guess.slice(0, -1)})
      }
    } else if (e.keyCode === 13) {
      if (checkAnswer(this.state.scramble, this.state.guess)) {
        this.setState({
          scramble: this.getRandomScramble(),
          guess: "",
        })
      }
    }
  }
}
