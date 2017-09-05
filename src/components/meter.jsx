import React from 'react';
import PropTypes from 'prop-types';

class Meter extends React.Component {

  constructor(props) {
    super(props);

    this.eventIsTouch = false;
    this.state = {
      value: props.defaultValue,
      pad: props.pad,
      min: props.min,
      max: props.max,
      step: props.step,
      wrap: props.wrap,
      increaseEnabled: props.increaseEnabled,
      decreaseEnabled: props.decreaseEnabled,
      onChange: props.onChange
    };

    this.style = {
      color: props.color,
    }

    this.boundedIncrease = this.boundedIncrease.bind(this);
    this.boundedDecrease = this.boundedDecrease.bind(this);
    this.wrapIncrease = this.wrapIncrease.bind(this);
    this.wrapDecrease = this.wrapDecrease.bind(this);
    this.touchIncrease = this.touchIncrease.bind(this);
    this.touchDecrease = this.touchDecrease.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.endHold = this.endHold.bind(this);

  }

  
  componentWillReceiveProps(nextProps) {
    var min = nextProps.min || this.state.min;
    var max = nextProps.max || this.state.max;
    var value = this.state.value > max ? max
                : this.state.value < min ? min
                : this.state.value;

    this.setState({
      value: value,
      min: min,
      max: max
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.value !== nextState.value 
        || nextProps.min !== this.state.min 
        || nextProps.max !==  this.state.max)
      return true;
    else 
      return false;
  }

  touchIncrease(){
    this.eventIsTouch = true;
    this.wrapIncrease();
    this.onHoldFunc = setInterval(this.state.wrap ? this.wrapIncrease : this.boundedIncrease, 100);
  }

  touchDecrease(){
    this.eventIsTouch = true;
    this.wrapDecrease();
    this.onHoldFunc = setInterval(this.state.wrap ? this.wrapDecrease : this.boundedDecrease, 100);
  }

  increase(){
    this.wrapIncrease();
    this.onHoldFunc = setInterval(this.state.wrap ? this.wrapIncrease : this.boundedIncrease, 100);
  }

  decrease(){
    this.wrapDecrease();
    this.onHoldFunc = setInterval(this.state.wrap ? this.wrapDecrease : this.boundedDecrease, 100);
  }

  endHold(){
    this.eventIsTouch = false;
    clearTimeout(this.onHoldFunc);
  }

  wrapIncrease(){
    var newValue = this.state.value + this.state.step
    this.setState({
      value: newValue > this.state.max ? this.state.min : newValue,
      increaseEnabled: true,
      decreaseEnabled: true   
    }, ()=> {

      this.state.onChange(this.state.value);

    });

  }

  wrapDecrease(){
    var newValue = this.state.value - this.state.step
    this.setState({
      value: newValue < this.state.min ? this.state.max : newValue,
      increaseEnabled: true,
      decreaseEnabled: true   
    }, ()=> {

      this.state.onChange(this.state.value);

    });

  }

  boundedIncrease(){
    if (!this.state.increaseEnabled) return false;

    this.setState({
      value: this.state.value + this.state.step,
      increaseEnabled:  this.state.value + (this.state.step * 2) > this.state.max 
                        ? false
                        : true,
      decreaseEnabled:  this.state.value + this.state.step > this.state.min 
                        ? true
                        : false
    }, ()=> {

      this.state.onChange(this.state.value);

    });

  }

  boundedDecrease(){
    if (!this.state.decreaseEnabled) return false;

    this.setState({
      value: this.state.value - this.state.step,
      increaseEnabled:  this.state.value - this.state.step < this.state.max 
                        ? true
                        : false,
      decreaseEnabled:  this.state.value - (this.state.step * 2) < this.state.min 
                        ? false
                        : true
    }, ()=> {

      this.state.onChange(this.state.value);

    });
  }

  render() {
    return (
      <div  className="meter-container">

        <span className="arrow-container" 
              onTouchStart={ this.touchIncrease }
              onTouchEnd={ this.endHold }
              onMouseDown={ !this.eventIsTouch ? this.increase : () => {} }
              onMouseUp={ this.endHold }>

          <div className="arrow-up" 
               style={{ borderBottomColor: this.style.color,
                        filter: this.state.increaseEnabled ? 'brightness(100%) grayscale(0%)' : 'brightness(200%) grayscale(100%)' }} >
          
          </div>
        </span>

        <span className="count-display"
              style={{ backgroundColor: this.style.color }}> 
              { this.state.value < 10 && this.state.pad ? '0' + this.state.value : this.state.value } 
        </span>

        <span className="arrow-container" 
              onTouchStart={ this.touchDecrease }
              onTouchEnd={ this.endHold }
              onMouseDown={ !this.eventIsTouch ? this.decrease : () => {} }
              onMouseUp={ this.endHold }>

          <div  className="arrow-down" 
                style={{ borderTopColor: this.style.color,
                         filter: this.state.decreaseEnabled ? 'brightness(100%) grayscale(0%)' : 'brightness(200%) grayscale(100%)' }}>
          </div>
        </span>

      </div>
    );
  }

}

//Defaults
Meter.propTypes = {
  color: PropTypes.string,
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  pad: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  wrap: PropTypes.bool,
  increaseEnabled: PropTypes.bool,
  decreaseEnabled: PropTypes.bool,
  onChange: PropTypes.func
};

Meter.defaultProps = {
  color: '#282826',
  defaultValue: 0,
  value: 0,
  pad: true,
  min: 0,
  max: Infinity,
  step: 1,
  wrap: false,
  increaseEnabled: true,
  decreaseEnabled: true,
  onChange: function(){ return true; }
};

export default Meter;