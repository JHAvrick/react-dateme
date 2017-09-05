import React from 'react';
import PropTypes from 'prop-types';
import TimeDisplay from './time-display.jsx';

class SliderTimeSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
      hour: this.state.hour === 0 ? 12 : this.state.hour,
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

    let pm = this.state.nowPm ? true : times.pm; //force PM if it is past noon

    var hour = times.hour; //given value is passed through if none of the conditionans below are true
    if (!pm && !this.state.nowPm){ //if the toggle is set to am AND the it is currently morning
      if (times.hour < this.state.nowHour){ //prevent hour from moving lower than current hour
        hour = this.state.nowHour;
      }
    } else if (pm && this.state.nowPm){ //if it is currently afternoon (toggle is already forced to pm)
      if (times.hour < this.state.nowHour){ //prevent hour from moving lower than current hour
        hour = this.state.nowHour; 
      }
    }

    let minute = hour === this.state.nowHour 
                 && pm === this.state.nowPm
                 && times.minute < this.state.nowMinute
                 ? this.state.nowMinute
                 : times.minute;

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

        <div className="arrow-up"></div>

        <TimeDisplay  color={ this.state.color }
                      hour={ this.state.hour } 
                      minute={ this.state.minute } 
                      pm={ this.state.pm }
                      onChange={ this.handleAmPmChange } />

        <p className="time-label"> {" Hours "} </p>
        <div className="hour-container">
          <input  type="range" 
                  min={0}
                  max={11} 
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

//Defaults
SliderTimeSelect.propTypes = {
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
SliderTimeSelect.defaultProps = {
      color: '#282826',
      isVisible: true,
      futureOnly: false,
      hour: 1,
      minute: 0,
      pm: false,
      nowHour: (() => {
        let hour24 = now.getHours();
        if (hour24 === 0) return 12;
        else if (hour24 > 12) return hour24 - 12;
        else return hour24;
      })(),
      nowMinute: now.getMinutes(),
      nowPm: now.getHours() > 11 ? true : false,
      onChange: function(){}
};

export default SliderTimeSelect;