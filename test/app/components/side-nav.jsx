import React from 'react';

class SideNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      headerIcon: props.headerIcon,
      headerTitle: props.headerTitle,
      widthOpen: 250
    };

  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isOpen !== nextProps.isOpen;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.isOpen
    });
  }

  render() {
    return (
      <div className="react-sidenav" style={ { width: this.state.isOpen ? this.state.widthOpen : 0 } }>

        <div className="react-sidenav-header">

          <div  className="react-sidenav-header-icon" 
                style={{ 
                          backgroundImage:'url("' + this.state.headerIcon + '")',
                          display: this.state.headerIcon ? "block" : "none"
                      }}>
          </div>
          <div className="react-sidenav-header-title">
            <p> { this.state.headerTitle ? this.state.headerTitle : '' } </p>
          </div>
        
        </div>
      </div>
      );
  }

}

class SideNavItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: props.icon
    };
  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  componentWillReceiveProps(nextProps) {

  }

  
  render() {
    return (
      <div className="react-sidenav-item">
      </div>
      );
  }

}

export default SideNav;