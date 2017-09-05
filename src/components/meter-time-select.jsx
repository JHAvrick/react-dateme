import React from 'react';
import PropTypes from 'prop-types';

import Meter from './meter.jsx';
import AmPmToggle from './am-pm-toggle.jsx';

class MeterTimeSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
      isVisible: props.isVisible,
      futureOnly: props.futureOnly,
      hour: props.hour,
      minute: props.minute,
      pm: props.pm,
      onChange: props.onChange
    };

    this.style = {
      border: props.color
    }

    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleAmPmChange = this.handleAmPmChange.bind(this);
    this.triggerOnChange = this.triggerOnChange.bind(this);

  }

  componentDidMount() {
    this.triggerOnChange();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible: nextProps.isVisible != null ? nextProps.isVisible : true,
      futureOnly: nextProps.futureOnly
    });
  }

  triggerOnChange(){
    var change = {
      hour: this.state.hour,
      minute: this.state.minute,
      pm: this.state.pm 
    }

    this.state.onChange(change);
  }

  handleHourChange(hour){
    this.setState({
      hour: hour
    }, ()=> {
      this.triggerOnChange();
    });
  }

  handleMinuteChange(minute){
    this.setState({
      minute: minute
    }, ()=> {
      this.triggerOnChange();
    });
  }

  handleAmPmChange(){
    this.setState({
      pm: this.state.pm ? false : true
    }, ()=> {
      this.triggerOnChange();
    });
  }
  
  render() {
    return (
      <div  className="time-select-container" 
            style={{ display: this.state.isVisible ? 'flex' : 'none', borderColor: this.style.border }}>

        <Meter  color={this.state.color} 
                onChange={this.handleHourChange} 
                min={ 1 }
                max={ 12 }
                defaultValue={this.state.hour}
                wrap={true} />

        <p  className="time-seperator"
            style={{ color:this.state.color }}>
        {":"}
        </p>

        <Meter  color={this.state.color} 
                onChange={this.handleMinuteChange} 
                min={ this.state.minMin } 
                max={59}
                defaultValue={this.state.minute}
                step={1}
                wrap={true} />

        <AmPmToggle color={ this.state.color }
                    onChange={ this.handleAmPmChange }
                    pm={this.state.pm} />

      </div>
    );
  }

}

//Defaults
MeterTimeSelect.propTypes = {
  color: PropTypes.string,
  isVisible: PropTypes.bool,
  futureOnly: PropTypes.bool,
  hour: PropTypes.number,
  minute: PropTypes.number,
  pm: PropTypes.bool,
  onChange: PropTypes.func
};

let now = new Date();
MeterTimeSelect.defaultProps = {
      color: '#282826',
      isVisible: true,
      futureOnly: false,
      hour: (() => {
        let hour24 = now.getHours();
        if (hour24 === 0) return 12;
        else if (hour24 > 12) return hour24 - 12;
        else return hour24;
      })(),
      minute: now.getMinutes(),
      pm: now.getHours() > 11 ? true : false,
      onChange: function(){}
};

export default MeterTimeSelect;