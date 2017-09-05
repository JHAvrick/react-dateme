import React from 'react';

//AmPmToggle is a controlled component
//Clicking the toggle will not change its state, but will trigger a callback which
//should decide whether to update the state or not
class DateSummary extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isVisible: props.isVisible,
      year: props.year,
      month: props.month,
      day: props.day,
      pm: props.pm,
      hour: props.hour,
      minute: props.minute,
      dateString: 'date'
    };

  }

  componentWillReceiveProps(nextProps) {

    console.log(nextProps);

    var hour = nextProps.hour;
    if (!nextProps.pm && nextProps.hour === 12)
      hour = 0;
    else if (nextProps.pm && nextProps.hour === 12)
      hour = 12;
    else if (nextProps.pm)
      hour = nextProps.hour + 12;

    var date = new Date(nextProps.year, nextProps.month - 1, nextProps.day, hour, nextProps.minute);  
    var options = {  
        weekday: "long", year: "numeric", month: "short",  
        day: "numeric", hour: "2-digit", minute: "2-digit"  
    }; 

    this.setState({
      isVisible: nextProps.isVisible,
      year: nextProps.year,
      month: nextProps.month,
      day: nextProps.day,
      pm: nextProps.pm,
      hour: hour,
      minute: nextProps.minute,
      dateString: date.toLocaleTimeString("en-us", options)
    });

  }

  render() {
    return (
      <div className="date-summary-container" 
          style={{ display: this.state.isVisible ? 'flex' : 'none',
                   borderColor: '#000000',
                   height: '75px' }}>

        { this.state.dateString }

      </div>
    );
  }
}

export default DateSummary;