import React from 'react';

class ToggleButton extends React.Component {
  constructor({ initialChecked }) {
    super();
    this.state = { checked: initialChecked }
  }
  onTextChanged() {
    const newState = !this.state.checked;
    this.setState({ checked: newState }); // we update our state
    this.props.callbackParent(newState); // we notify our parent
  }
  render() {
    return <label>
    {this.props.text}: <input type="checkbox"
    checked={this.state.checked}
    onChange={() => this.onTextChanged()}/>
    </label>
  }
}

export default ToggleButton;