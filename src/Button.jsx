import Styles from "./Button.less";

export default class Button extends React.Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  };

  render() {
    const { text, onClick } = this.props;
    return <div
        className={Styles.button}
        style={{
          color: quip.apps.ui.ColorMap.BLUE.VALUE,
          borderColor: quip.apps.ui.ColorMap.BLUE.VALUE,
        }}
        onClick={onClick}>
      {text}
    </div>;
  }
}
