import React from 'react';

class TopNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      alignItems: props.alignItems
    };

    this.style = {
      backgroundColor: props.backgroundColor
    }

  }

  render() {

    const alignItemsLeft = (
      <div className="react-topnav" style={this.style}>
          <div className="topnav-container-items">
            { this.props.children  }
          </div>
          <div className="topnav-container-title">
            { this.state.title }
          </div>
      </div> );

    const alignItemsRight = (
      <div className="react-topnav" style={this.style}>
          <div className="topnav-container-title">
            { this.state.title }
          </div>
          <div className="topnav-container-items">
            { this.props.children }
          </div>
      </div> );

    return this.state.alignItems === 'left' ? alignItemsLeft : alignItemsRight;
  }

}

TopNav.defaultProps = {
  title: null,
  alignItems: 'left',
  backgroundColor: '#333333'
}

export default TopNav;