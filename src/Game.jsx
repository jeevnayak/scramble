import rand from "random-seed";

import Constants from "./constants.js";
import Letter from "./Letter.jsx";
import {
  ResultRecord,
} from "./model.js";
import Score from "./Score.jsx";
import Timer from "./Timer.jsx";
import {
  checkAnswer,
  getRandomScramble,
} from "./words.js";

import Styles from "./Game.less";

export default class Game extends React.Component {
  static propTypes = {
    seed: React.PropTypes.string.isRequired,
    result: React.PropTypes.instanceOf(ResultRecord).isRequired,
    onFinish: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super();
    this.rand = rand.create(props.seed);
    this.state = this.getNewScrambleState();
    props.result.set("currentScramble", this.state.scramble);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  render() {
    const { result, onFinish } = this.props;
    const letters = [];
    this.state.guess.forEach((letter, i) => {
      letters[letter.originalIndex] = <Letter
        key={letter.key}
        letter={letter.letter}
        top={(Constants.HEIGHT - Constants.LETTER_VSPACING) / 2 - Constants.LETTER_SIZE}
        left={this.getLetterLeft(i)}/>;
    });
    this.state.letters.forEach((letter, i) => {
      if (letter) {
        letters[letter.originalIndex] = <Letter
          key={letter.key}
          letter={letter.letter}
          top={(Constants.HEIGHT + Constants.LETTER_VSPACING) / 2}
          left={this.getLetterLeft(i)}/>;
      }
    });
    return <div>
      <div className={Styles.header}>
        <div className={Styles.timer}>
          <Timer startTime={result.get("startTime")} onFinish={onFinish}/>
        </div>
        <Score result={result}/>
        <div className={Styles.spacer}></div>
      </div>
      {letters}
    </div>;
  }

  getLetterLeft(i) {
    return (Constants.WIDTH + Constants.LETTER_HSPACING) / 2 +
      (i - 3) * (Constants.LETTER_SIZE + Constants.LETTER_HSPACING);
  }

  getNewScrambleState() {
    const scramble = getRandomScramble(this.rand);
    const letters = [];
    for (let i = 0; i < scramble.length; i++) {
      letters.push({
        letter: scramble.charAt(i),
        originalIndex: i,
        key: scramble + i,
      });
    }
    this.shuffle(letters, this.rand);
    return {
      scramble: scramble,
      letters: letters,
      guess: [],
    };
  }

  addLetterToGuess(l) {
    const { letters, guess } = this.state;
    let found = false;
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      if (letter && letter.letter === l) {
        guess.push(letter);
        letters[i] = undefined;
        found = true;
        break;
      }
    }
    if (found) {
      this.setState({ letters, guess });
    }
  }

  removeLastLetterFromGuess() {
    const { letters, guess } = this.state;
    const lastLetter = guess.pop();
    if (lastLetter) {
      this.insertIntoLetters(letters, lastLetter);
      this.setState({ letters, guess });
    }
  }

  clearGuess() {
    let { letters, guess } = this.state;
    guess.forEach((letter) => {
      this.insertIntoLetters(letters, letter);
    });
    guess = [];
    this.setState({ letters, guess });
  }

  insertIntoLetters(letters, letter) {
    for (let i = 0; i < letters.length; i++) {
      if (!letters[i]) {
        letters[i] = letter;
        return;
      }
    }
  }

  getCurrentGuess() {
    let currentGuess = "";
    for (let letter of this.state.guess) {
      currentGuess += letter.letter;
    }
    return currentGuess;
  }

  shuffleLetters() {
    const { letters } = this.state;
    this.shuffle(letters);
    this.setState({ letters })
  }

  shuffle(array, rand) {
    let i = 0
    let j = 0;
    let temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = rand ? rand.intBetween(0, i) : Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  onKeyDown = (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) { // letter
      const c = String.fromCharCode(e.keyCode + 32);
      this.addLetterToGuess(c);
    } else if (e.keyCode === 8) {
      this.removeLastLetterFromGuess();
    } else if (e.keyCode === 13) { // Return
      const currentGuess = this.getCurrentGuess();
      if (checkAnswer(this.state.scramble, currentGuess)) {
        const newState = this.getNewScrambleState();
        this.props.result.completeScramble(currentGuess, newState.scramble);
        this.setState(newState);
      } else {
        this.clearGuess();
      }
    } else if (e.keyCode === 32) { // Space
      this.shuffleLetters();
    }
  }
}
