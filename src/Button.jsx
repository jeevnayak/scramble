import Styles from "./Button.less";

export default class Button extends React.Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    size: React.PropTypes.number,
  };

  render() {
    const { text, onClick, size } = this.props;
    return <div
        className={Styles.button}
        style={{
          color: quip.apps.ui.ColorMap.BLUE.VALUE,
          borderColor: quip.apps.ui.ColorMap.BLUE.VALUE,
          fontSize: size || 18,
        }}
        onClick={onClick}>
      {text}
    </div>;
  }
}
