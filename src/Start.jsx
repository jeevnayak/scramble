import Button from "./Button.jsx";
import Constants from "./constants.js";
import Letter from "./Letter.jsx";
import {
  RootRecord,
} from "./model.js";

import Styles from "./Start.less";

export default class Start extends React.Component {
  static propTypes = {
    onStart: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super();
    this.interval = null;
    const letters = ["s", "c", "r", "a", "m", "b", "l", "e"].map(
      (letter, i) => ({
        letter: letter,
        originalIndex: i,
      }));
    this.state = { letters };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.interval = window.setInterval(this.update, 1000);
    }, 3000);
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  render() {
    const letters = [];
    this.state.letters.forEach((letter, i) => {
      letters[letter.originalIndex] = <Letter
        key={letter.originalIndex}
        letter={letter.letter}
        top={80}
        left={this.getLetterLeft(i)}
        small={true}/>;
    });
    return <div>
      {letters}
      <div className={Styles.buttonContainer}>
        <Button text="START GAME" onClick={this.props.onStart}/>
      </div>
    </div>;
  }

  getLetterLeft(i) {
    return (Constants.WIDTH + Constants.LETTER_HSPACING_SMALL) / 2 +
      (i - 4) * (Constants.LETTER_SIZE_SMALL + Constants.LETTER_HSPACING_SMALL);
  }

  update = () => {
    const { letters } = this.state;
    const newIndex = Math.floor(Math.random() * (letters.length - 1)) + 1;
    const firstLetter = letters.shift();
    letters.splice(newIndex, 0, firstLetter);
    this.setState({ letters });
  }
}
