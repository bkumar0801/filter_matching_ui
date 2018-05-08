import React from 'react';
import '../style/App.css';

class RangeSlider extends React.Component {
  
    constructor(props) {
        super(props)
        this.state = { value: 18 }
    }
    
    changeValue(e) {
      this.setState({
        value: e.currentTarget.value
      });
      this.props.callbackParent(e.currentTarget.value);
    }
    
    render() {
      return (
        <div>
          <input type="range" name="quantity" min="18" max="95" onInput={(e)=>this.changeValue(e)} value={this.state.value} />
          <output for="quantity">{this.state.value}</output>
        </div>
      );
    }
  };

  export default RangeSlider;
  