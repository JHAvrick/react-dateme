import React from 'react';

class Hamburger extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      onClickCallback: props.onClick
    };

    this.onClick = this.onClick.bind(this)
  }

  onClick(){
    if (this.state.onClickCallback)
      this.state.onClickCallback();
  }

  render() {
    return (
      <div className="hamburger-container" onClick={ this.onClick }>
        <div className="hamburger-bar-top"></div>
        <div className="hamburger-bar-middle"></div>
        <div className="hamburger-bar-bottom"></div>
      </div>
    );
  }

}

export default Hamburger;