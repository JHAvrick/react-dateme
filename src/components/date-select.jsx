import React from 'react';
import PropTypes from 'prop-types';

class DateSelect extends React.Component {

  constructor(props) {
    super(props);

    //Indexes & lookup array
    this.dayIndex = 0;
    this.tableKeyIndex = 0;
    this.monthKeys = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let now = new Date(); //Today's date
    let propsDate = new Date(props.year, props.month, props.day); //The date passed via props (also today if no props given)
    this.state = {
      color: props.color,
      isVisible: props.isVisible,
      futureOnly: props.futureOnly,
      maxDay: null,
      maxMonth: null,
      maxYear: null,
      nowMonth: now.getMonth(),
      nowDay: now.getDate(),
      nowYear: now.getFullYear(),
      currentMonth: this.monthKeys[props.month] + " " + props.year, //month string lookup
      currentDayIndex: props.day,
      currentMonthIndex: props.month,
      currentYearIndex: props.year,
      currentMonthCount: new Date(props.year, props.month + 1, 0).getDate(),
      firstDayOfMonth: new Date(props.year, props.month + 1, 0).getDay(),
      onChange:  props.onChange
    };

    this.style = {
      border: props.color,
      table: {
        color: props.color
      },
      monthNext: {
        borderLeftColor: props.color
      },
      monthPrevious: {
        borderRightColor: props.color
      },
      monthLabel: {
        color: props.color
      }
    }

    this.getDayOfMonth = this.getDayOfMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.handleDaySelected = this.handleDaySelected .bind(this);
  
  }

  /* 
    The dayIndex must be reset after each render. It's used to calculate the day offset for each month.
  */
  componentDidMount() {
    this.dayIndex = 0;
    this.tableKeyIndex = 0;

    this.state.onChange({
      month: this.state.currentMonthIndex + 1,
      day: this.state.currentDayIndex,
      year: this.state.currentYearIndex
    });
  }

  componentDidUpdate() {
    this.dayIndex = 0;
    this.tableKeyIndex = 0;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible: nextProps.isVisible != null ? nextProps.isVisible : true,
    });
  }

  /* 
      This is called for each CalenderDay (just a <td>) component on render, specifying what day it holds.
  */
  getDayOfMonth(){
    var dayLabel = '';
    if (this.dayIndex >= this.state.firstDayOfMonth)
      if ( ((this.dayIndex + 1) - this.state.firstDayOfMonth) <= this.state.currentMonthCount)
        dayLabel = ( (this.dayIndex + 1) - this.state.firstDayOfMonth);

    this.dayIndex++;
    return dayLabel;
  }


  /* 
      The nextMonth() and previousMonth() methods are  called when the  forward or back buttons are clicked.
      The current month/year is incremented or decremented to find the next one and a new Date is created to
      get the number of days and what day of the week the first day falls on.  
  */
  nextMonth(){
    //Get  next year/month/days-in-next-month
    var year = this.state.currentMonthIndex === 11 ? this.state.currentYearIndex + 1 : this.state.currentYearIndex;
    var month = this.state.currentMonthIndex === 11 ? 0 : this.state.currentMonthIndex + 1;
    var monthCount = new Date(year, month + 1, 0).getDate();

    //move day back if the last day of a month was selected but the next month has fewer days
    var day  = this.state.currentDayIndex <= monthCount ? this.state.currentDayIndex : monthCount;

    var newMonth = new Date(year, month);
    this.setState({
      
      currentMonth: this.monthKeys[newMonth.getMonth()] + " " + newMonth.getFullYear(),
      currentMonthIndex: month,
      currentYearIndex: year,
      currentMonthCount: monthCount,
      firstDayOfMonth: newMonth.getDay(),
      currentDayIndex: day

    }, () => {

      this.state.onChange({
        month: this.state.currentMonthIndex + 1,
        day: this.state.currentDayIndex,
        year: this.state.currentYearIndex
      });

    });

    this.dayIndex = 0;
  }

  previousMonth(){

    //Get previous year/month/days-in-next-month
    var year = this.state.currentMonthIndex === 0 ? this.state.currentYearIndex - 1 : this.state.currentYearIndex;
    var month = this.state.currentMonthIndex === 0 ? 11 : this.state.currentMonthIndex - 1;
    var monthCount = new Date(year, month + 1, 0).getDate();

    //move day back if the last day of a month was selected but the next month has fewer days
    var day  = this.state.currentDayIndex <= monthCount ? this.state.currentDayIndex : monthCount; 

    var newMonth = new Date(year, month);
    this.setState({

      currentMonth: this.monthKeys[newMonth.getMonth()] + " " + newMonth.getFullYear(),
      currentMonthIndex: month,
      currentYearIndex: year,
      currentMonthCount: monthCount,
      firstDayOfMonth: newMonth.getDay(),
      currentDayIndex: day

    }, () => {

      this.state.onChange({
        month: this.state.currentMonthIndex + 1,
        day: this.state.currentDayIndex,
        year: this.state.currentYearIndex
      });

    });

    this.dayIndex = 0;
  }

  /* 
      The day contained in each CalenderDay component is used as a unique identifier.
  */
  handleDaySelected(selected){
    //if (selected.day === '' || selected.future === false) return;

    this.setState({
      currentDayIndex: selected.day
    }, () => {

      this.state.onChange({
        month: this.state.currentMonthIndex + 1,
        day: this.state.currentDayIndex,
        year: this.state.currentYearIndex
      });

    });

  }

  render() {
    return (
      <div  className="date-select-container" 
            style={{ display: this.state.isVisible ? 'block' : 'none', borderColor: this.style.border }}>

        <div className="month-container">

          <div  className="month-previous" 
                style={ this.style.monthPrevious }
                onClick={this.previousMonth}>  
          </div>

          <div className="month-current"
               style={ this.style.monthLabel }> 

            { this.state.currentMonth } 
          </div>

          <div  className="month-next" 
                style={ this.style.monthNext }
                onClick={this.nextMonth}>
          </div>

        </div>
        <div className="day-container">
          
          <table className="day-table">
            <thead style={ this.style.table } >
              <tr>
                <td>SUN</td>
                <td>MON</td>
                <td>TUE</td>
                <td>WED</td>
                <td>THU</td>
                <td>FRI</td>
                <td>SAT</td>
              </tr>
            </thead>
            <tbody>
              { [...Array(6)].map((x, a) =>
                <tr key={ this.tableKeyIndex++ }>
                  {[...Array(7)].map((x, b) =>

                    <CalenderDay key={ this.tableKeyIndex++ }
                                 color={ this.state.color }
                                 day={ this.getDayOfMonth() }
                                 futureOnly={ this.state.futureOnly }
                                 onSelected={ this.handleDaySelected } 
                                 activeDay={ this.state.currentDayIndex }
                                 activeMonth={ this.state.currentMonthIndex }
                                 activeYear={ this.state.currentYearIndex } />

                  )}
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

class CalenderDay extends React.Component {
  constructor(props) {
    super(props);

    this.style = {
      blank: {
        cursor: 'default',
        backgroundColor: 'white'
      },
      unselectable: {
        cursor: 'default',
        color: '#E1E8F3'
      },
      unselected: {
        cursor: 'pointer',
        backgroundColor: 'white',
        color: props.color || '#282826'
      },
      selected: {
        cursor: 'pointer',
        color: 'white',
        backgroundColor: props.color || '#282826'
      }
    }

    this.state = {
      color: props.color,
      day: props.day,
      isPast: props.day < props.activeDay ? true : false,
      futureOnly: props.futureOnly || false,
      activeDay: props.activeDay,
      activeMonth: props.activeMonth,
      activeYear: props.activeYear,
      onSelected: props.onSelected || function(){},
      styleType: props.day != props.activeDay ? this.style.unselected : this.style.selected
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    if (this.state.futureOnly && this.state.isPast) return; //Don't handle clicks if this calender is set for future only
    if (this.state.day === '') return; //Don't handle click for empty days

    this.state.onSelected({ day: this.state.day }); //onSelected callback
  }

  componentWillReceiveProps(nextProps) {
    var isPast = new Date() > new Date(nextProps.activeYear, nextProps.activeMonth, nextProps.day + 1);
    this.setState({
      day: nextProps.day,
      activeDay: nextProps.activeDay,
      activeMonth: nextProps.activeMonth,
      activeYear: nextProps.activeYear,
      isPast: isPast,
      styleType: (() => {

        if (nextProps.day === '')
          return this.style.blank;
        else if (isPast && this.state.futureOnly)
          return this.style.unselectable;
        else if (nextProps.activeDay != nextProps.day)
          return this.style.unselected;
        else
          return this.style.selected;

      })()
    });
  }

  render() {
    return (
      <td style={ this.state.styleType }
          onClick={ this.handleClick }> 

        { this.state.day } 

      </td>
    );
  }

}

var style = {
  active: {

  },

  inactive: {
    color: '#DFE0E4'
  }
}

//Defaults
DateSelect.propTypes = {
  color: PropTypes.string,
  isVisible: PropTypes.bool,
  futureOnly: PropTypes.bool,
  nowMonth: PropTypes.number,
  nowDay: PropTypes.number,
  nowYear: PropTypes.number,
  currentMonth: PropTypes.string,
  currentDayIndex: PropTypes.number,
  currentMonthIndex: PropTypes.number,
  currentYearIndex: PropTypes.number,
  currentMonthCount: PropTypes.number,
  firstDayOfMonth: PropTypes.number,
  onChange: PropTypes.func
};

let now = new Date();
DateSelect.defaultProps = {
  color: '#282826',
  isVisible: true,
  futureOnly: false,
  nowMonth: now.getMonth(),
  nowDay: now.getDate(),
  nowYear: now.getFullYear(),
  onChange: function(){}
};

export default DateSelect;