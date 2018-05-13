import React from 'react';

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.initialChecked }
  }
  onStateChanged() {
    const newState = !this.state.checked;
    this.setState({ checked: newState }); // we update our state
    this.props.callbackParent(newState); // we notify our parent
  }
  render() {
    return <label>
    {this.props.text}: <input type="checkbox"
    checked={this.state.checked}
    onChange={() => this.onStateChanged()}/>
    </label>
  }
}

export default ToggleButton;