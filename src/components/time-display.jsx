import React from 'react';
import AmPmToggle from './am-pm-toggle.jsx';

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
      hour: this.zeroPad(props.hour === 0 ? 12 : props.hour),
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
      hour: this.zeroPad(nextProps.hour === 0 ? 12 : nextProps.hour),
      minute:  this.zeroPad(nextProps.minute),
      pm: nextProps.pm
    });
  }

  render() {
    return (
      <div className="time-display-container">
        
        <span className="hour-display"
              style={ this.style.foreground }> 
              { this.state.hour } 
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

export default TimeDisplay;