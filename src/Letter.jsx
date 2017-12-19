import Constants from "./constants.js";

import Styles from "./Letter.less";

export default class Letter extends React.Component {
  static propTypes = {
    letter: React.PropTypes.string.isRequired,
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
    small: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  };

  render() {
    const { letter, top, left, small, onClick } = this.props;
    const size = small ? Constants.LETTER_SIZE_SMALL : Constants.LETTER_SIZE;
    const fontSize = small ? 24 : 28;
    let classNames = [Styles.letter];
    if (onClick) {
      classNames.push(Styles.clickable);
    }
    return <div
        className={classNames.join(" ")}
        style={{
          width: size,
          height: size,
          fontSize: fontSize,
          transform: `translate3d(${left}px, ${top}px, 0px)`,
          backgroundColor: quip.apps.ui.ColorMap.YELLOW.VALUE,
        }}
        onClick={onClick}>
      {letter.toUpperCase()}
    </div>;
  }
}
