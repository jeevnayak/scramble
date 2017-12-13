import rand from "random-seed";

import Letter from "./Letter.jsx";
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
    this.state = this.getNewScrambleState();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  render() {
    const letters = [];
    this.state.guess.forEach((letter, i) => {
      letters[letter.originalIndex] = <Letter
        key={letter.key}
        letter={letter.letter}
        top={60}
        left={70 * i}/>;
    });
    this.state.letters.forEach((letter, i) => {
      if (letter) {
        letters[letter.originalIndex] = <Letter
          key={letter.key}
          letter={letter.letter}
          top={180}
          left={70 * i}/>;
      }
    });
    return <div>
      {letters}
    </div>;
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
      for (let i = 0; i < letters.length; i++) {
        if (!letters[i]) {
          letters[i] = lastLetter;
          break;
        }
      }
      this.setState({ letters, guess });
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
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const c = String.fromCharCode(e.keyCode + 32);
      this.addLetterToGuess(c);
    } else if (e.keyCode === 8) {
      this.removeLastLetterFromGuess();
    } else if (e.keyCode === 13) {
      if (checkAnswer(this.state.scramble, this.getCurrentGuess())) {
        this.setState(this.getNewScrambleState());
      }
    } else if (e.keyCode === 32) {
      this.shuffleLetters();
    }
  }
}
