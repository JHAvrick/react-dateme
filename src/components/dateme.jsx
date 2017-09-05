import React from 'react';
import PropTypes from 'prop-types';
import DateSelect from './date-select.jsx';
import DateSummary from './date-summary.jsx';
import MeterTimeSelect from './meter-time-select.jsx';

class DateMe extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
      buttonLabel: props.buttonLabel,
      dateTabActive: props.dateTabActive,
      month: props.month,
      day: props.day,
      year: props.year,
      hour: props.hour,
      minute: props.minute,
      pm: props.pm,
      futureOnly: props.futureOnly,
      dateIsToday: props.dateIsToday,
      onSubmit: props.onSubmit,
      onChange: props.onChange
    };

    this.style = {
      base: {
        color: props.color,
        borderColor: props.color
      },
      tabInactive: {
        color: props.color,
        backgroundColor: 'white'
      },
      tabActive: {
        color: 'white',
        backgroundColor: props.color
      },
      button: {
        color: 'white',
        backgroundColor: props.color       
      }       
    }

    this.triggerOnChange = this.triggerOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabSwitched = this.handleTabSwitched.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  triggerOnChange(){
    this.state.onChange({
      month: this.state.month,
      day: this.state.day,
      year: this.state.year,
      hour: this.state.hour,
      minute: this.state.minute,
      pm: this.state.pm
    });
  }

  handleSubmit(){    
    this.state.onSubmit({
      month: this.state.month,
      day: this.state.day,
      year: this.state.year,
      hour: this.state.hour,
      minute: this.state.minute,
      pm: this.state.pm
    });
  }

  handleTabSwitched(){
    this.setState({
      dateTabActive: this.state.dateTabActive ? false : true
    });
  }

  handleDateChange(change){
    this.setState({
      month: change.month != null ? change.month : this.state.month,
      day: change.day != null ? change.day : this.state.day,
      year: change.year != null ? change.year : this.state.year,
      dateIsToday: new Date().setHours(0,0,0,0) == new Date(change.year, change.month - 1, change.day).setHours(0,0,0,0)
    }, () => {
      this.triggerOnChange();
    });
  }

  handleTimeChange(change){
    this.setState({
      hour: change.hour != null ? change.hour : this.state.hour,
      minute: change.minute != null ? change.minute : this.state.minute,
      pm: change.pm != null ? change.pm : this.state.pm
    }, () => {
      this.triggerOnChange();
    });
  }

  render() {
    return (
      <div className="dateme-container" style={ this.style.base }>

        <div  className="dateme-tab-container" 
              style={ this.style.base }
              onClick={ this.handleTabSwitched }>
          
          <span className={ this.state.dateTabActive ? 'dateme-tab-active' : 'dateme-tab-inactive' }
                style = { this.state.dateTabActive ? this.style.tabActive : this.style.tabInactive }> 
            
            { "Date" } 
          
          </span>

          <span className={ this.state.dateTabActive ? 'dateme-tab-inactive' : 'dateme-tab-active' }
                style = { this.state.dateTabActive ? this.style.tabInactive : this.style.tabActive }> 
            
            { "Time" } 
          
          </span>

        </div>


        <div className="dateme-main-panel"
             style={ this.style.base } >

          <DateSelect   color={ this.state.color } 
                        futureOnly={ this.state.futureOnly }
                        isVisible={this.state.dateTabActive ? true : false} 
                        year={ this.state.year }
                        month={ this.state.month }
                        day={ this.state.day}
                        onChange={this.handleDateChange} />

          <MeterTimeSelect  color={ this.state.color } 
                            futureOnly={true}
                            isVisible={this.state.dateTabActive ? false : true }  
                            onChange={this.handleTimeChange} />

          <DateSummary isVisible={ this.state.dateTabActive ? false : true }
                       year={this.state.year}
                       month={this.state.month}
                       day={this.state.day}
                       hour={this.state.hour}
                       minute={this.state.minute}
                       pm={this.state.pm} />

        </div>
        

        
        {/* 
        <SliderTimeSelect   color={ this.state.color } 
                            futureOnly={ this.state.futureOnly && this.state.dateIsToday }
                            isVisible={this.state.dateTabActive ? false : true}
                            hour={ this.state.hour } 
                            minute={ this.state.minute }
                            pm={ this.state.pm }
                            onChange={this.handleTimeChange} />
          */}


        
          <input  type="button" 
                  style={ this.style.button }
                  value={ this.state.buttonLabel } 
                  onClick={ this.handleSubmit } />
      </div>
    );
  }
}

DateMe.propTypes = {
  color: PropTypes.string,
  buttonLabel: PropTypes.string,
  dateTabActive: PropTypes.bool,
  month: PropTypes.number,
  day: PropTypes.number,
  year: PropTypes.number,
  hour: PropTypes.number,
  minute: PropTypes.number,
  pm: PropTypes.bool,
  futureOnly: PropTypes.bool,
  dateIsToday: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func  
};
  
let now = new Date(); //Default date/time is today/now
DateMe.defaultProps = {
  color: '#282826',
  buttonLabel: 'Submit',
  dateTabActive: true,
  month: now.getMonth(),
  day: now.getDate(),
  year: now.getFullYear(),
  hour: (() => {
    let hours24 = now.getHours();
    if (hours24 === 0) return 12
    else if (hours24 > 12) return hours24 - 12;
    else return hours24;
  })(),
  minute: now.getMinutes(),
  pm: now.getHours() >= 12 ? true : false,
  futureOnly: false,
  dateIsToday: true,
  onSubmit: function(){},
  onChange: function(){}
};

export default DateMe;