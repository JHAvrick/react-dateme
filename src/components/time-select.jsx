import React from 'react';
import PropTypes from 'prop-types';

class TimeSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      debug: 0,
      color: props.color,
      isVisible: props.isVisible,
      futureOnly: props.futureOnly,
      hour: props.hour,
      minute: props.minute,
      pm: props.pm,
      nowHour: props.nowHour,
      nowMinute: props.nowMinute,
      nowPm: props.nowPm,
      onChange: props.onChange
    };

    this.style = {
      border: props.color
    }

    this.timeUpdate = setInterval(()=>{
        if (this.state.futureOnly){
          let now = new Date();
          this.setState({
            nowHour: (() => {
              let hour24 = now.getHours();
              if (hour24 === 0) return 12;
              else if (hour24 > 12) return hour24 - 12;
              else return hour24;
            })(),
            nowMinute: now.getMinutes(),
            nowPm: now.getHours() >= 12 ? true : false 
          });
        }
    }, 30);
    
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleAmPmChange = this.handleAmPmChange.bind(this);
    this.getConstrainedTime = this.getConstrainedTime.bind(this);

  }

  componentDidMount() {
    this.triggerOnChange();
  }

  componentWillUnmount() {
    clearInterval(this.timeUpdate);
  }

  triggerOnChange(){
    var change = {
      hour: this.state.hour,
      minute: this.state.minute,
      pm: this.state.pm
    }

    this.state.onChange(change);
  }

  componentWillReceiveProps(nextProps) {
    let time = this.getConstrainedTime({
      hour: this.state.hour,
      minute: this.state.minute,
      pm: this.state.pm
    });

    this.setState({
      isVisible: nextProps.isVisible != null ? nextProps.isVisible : true,
      futureOnly: nextProps.futureOnly,
      hour: time.hour,
      minute: time.minute,
      pm: time.pm
    });
  }

  //Enforces time constraints if futureOnly is set to true
  //Returns params immediately otherwise
  getConstrainedTime(times){
    if (!this.state.futureOnly) return times;

    let pm = this.state.nowPm >= 12 ? true : times.pm; //force PM if it is past noon

    // Sign -- Actaul
    // AM      AM
    // PM      AM
    // PM      PM

    if (!pm && !this.state.nowPm){
      if (times.hour < this.state.nowHour){
        console.log(1);
        var hour = this.state.nowHour;
      } else {
        console.log(2);
        var hour = times.hour;
      }
    } else if (pm && this.state.nowPm){
      if (times.hour < this.state.nowHour) {
        console.log(3);
        var hour = this.state.nowHour;
      } else {
        console.log(4);
        var hour = times.hour;
      }
    } else {
      console.log(5);
      var hour = times.hour;
    }

    let minute = hour === this.state.nowHour 
                 && pm === this.state.nowPm
                 && times.minute < this.state.nowMinute
                 ? this.state.nowMinute
                 : times.minute;

    console.log(hour);
    return {
      pm: pm,
      hour: hour,
      minute: minute
    }

  }

  handleHourChange(e){
    let time = this.getConstrainedTime({
      hour: parseInt(e.target.value),
      minute: this.state.minute,
      pm: this.state.pm
    })

    this.setState({
      hour: time.hour,
      minute: time.minute,
      pm: time.pm
    }, () => {
      this.triggerOnChange();
    });

  }

  handleMinuteChange(e){
    let time = this.getConstrainedTime({
      hour: this.state.hour,
      minute: parseInt(e.target.value),
      pm: this.state.pm
    })

    this.setState({
      hour: time.hour,
      minute: time.minute,
      pm: time.pm
    }, () => {
      this.triggerOnChange();
    });
  }

  handleAmPmChange(){
    let time = this.getConstrainedTime({
      hour: this.state.hour,
      minute: this.state.minute,
      pm: this.state.pm ? false : true
    })

    this.setState({
      hour: time.hour,
      minute: time.minute,
      pm: time.pm
    }, () => {
      this.triggerOnChange();
    }); 
  }

  render() {
    return (
      <div  className="time-select-container" 
            style={{ display: this.state.isVisible ? 'block' : 'none', borderColor: this.style.border }}>

        <TimeDisplay  color={ this.state.color }
                      hour={ this.state.hour } 
                      minute={ this.state.minute } 
                      pm={ this.state.pm }
                      onChange={ this.handleAmPmChange } />

        <p className="time-label"> {" Hours "} </p>
        <div className="hour-container">
          <input  type="range" 
                  min={1}
                  max={12} 
                  step={1} 
                  value={ this.state.hour }
                  onChange={this.handleHourChange} />
        </div>

        <p className="time-label"> {" Minutes "} </p>
        <div className="minutes-container">
          <input  type="range" 
                  min={0}
                  max={59} 
                  step={1} 
                  value={ this.state.minute }
                  onChange={this.handleMinuteChange} />
        </div>

      </div>
    );
  }

}

class TimeDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.style = {
      foreground: {
        backgroundColor: props.color
      },
      background: {
        color: props.color
      }
    }

    this.state = {
      color: props.color,
      hour: this.zeroPad(props.hour),
      minute:  this.zeroPad(props.minute),
      pm: props.pm,
      onChange: props.onChange
    };

    this.zeroPad = this.zeroPad.bind(this);
    this.handleAmPmChange = this.handleAmPmChange.bind(this);
  }

  zeroPad(number){
    if (number == null) return;

    if (number < 10)
      return '0' + number;
    else 
      return number;
  }

  handleAmPmChange(){
    if (this.state.onChange)
      this.state.onChange();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      hour: this.zeroPad(nextProps.hour),
      minute:  this.zeroPad(nextProps.minute),
      pm: nextProps.pm
    });
  }

  render() {
    return (
      <div className="time-display-container">
        
        <span className="hour-display"
              style={ this.style.foreground }> 
              {this.state.hour} 
        </span>

        <span className="time-seperator" 
              style={ this.style.background }>  
              :  
        </span>
        
        <span className="minute-display" 
              style={ this.style.foreground }> 
              {this.state.minute}
        </span>

        <AmPmToggle color={ this.state.color }
                    pm={ this.state.pm }
                    onChange={ this.handleAmPmChange } />

      </div>
    );
  }
}

//AmPmToggle is a controlled component
//Clicking the toggle will not change its state, but will trigger a callback which
//should decide whether to update the state or not
class AmPmToggle extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
      pm: props.pm,
      onChange: props.onChange
    };

    this.style = {
      active: {
        color: 'white',
        backgroundColor: props.color
      },
      inactive: {
        color: props.color,
        backgroundColor: 'white'
      }
    }

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(){
    if (this.state.onChange)
      this.state.onChange();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pm: nextProps.pm
    });
  }

  render() {
    return (
      <div className="am-pm-container" onClick={this.onClickHandler}>

        <span style={ this.state.pm ? this.style.inactive : this.style.active }> 
          { "AM" } 
        </span>

        <span style={ this.state.pm ? this.style.active : this.style.inactive } > 
          { "PM" } 
        </span>

      </div>
    );
  }
}

//Defaults
TimeSelect.propTypes = {
  color: PropTypes.string,
  isVisible: PropTypes.bool,
  futureOnly: PropTypes.bool,
  hour: PropTypes.number,
  minute: PropTypes.number,
  pm: PropTypes.bool,
  nowHour: PropTypes.number,
  nowMinute: PropTypes.number,
  nowPm: PropTypes.bool,
  onChange: PropTypes.func
};

let now = new Date();
TimeSelect.defaultProps = {
      color: '#282826',
      isVisible: true,
      futureOnly: false,
      hour: 1,
      minute: 0,
      pm: false,
      nowHour: now.getHours(),
      nowMinute: now.getMinutes(),
      nowPm: now.getHours() > 11 ? true : false,
      onChange: function(){}
};

export default TimeSelect;