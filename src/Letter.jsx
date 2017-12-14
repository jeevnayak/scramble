import Constants from "./constants.js";

import Styles from "./Letter.less";

export default class Letter extends React.Component {
  static propTypes = {
    letter: React.PropTypes.string.isRequired,
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
  };

  render() {
    const { letter, top, left } = this.props;
    return <div
        className={Styles.letter}
        style={{
          width: Constants.LETTER_SIZE,
          height: Constants.LETTER_SIZE,
          transform: `translate3d(${left}px, ${top}px, 0px)`,
          backgroundColor: quip.apps.ui.ColorMap.BLUE.VALUE,
        }}>
      {letter.toUpperCase()}
    </div>;
  }
}
