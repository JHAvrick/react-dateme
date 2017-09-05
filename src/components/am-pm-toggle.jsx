import React from 'react';

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

export default AmPmToggle;