import React from 'react';
import {render} from 'react-dom';

import DateMe from '../../build/react-dateme.js';
import TopNav from './components/top-nav.jsx';
import SideNav from './components/side-nav.jsx';
import Hamburger from './components/hamburger.jsx';
import OnClickOut from 'react-onclickout';

class App extends React.Component {
  constructor(props){
  	super(props);

    this.state = {
      sideNavOpen: false,
      reveal: false
    }

    this.openSideNav = this.openSideNav.bind(this);
    this.closeSideNav = this.closeSideNav.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  openSideNav(){
    this.setState({ 
      sideNavOpen: true,
    });
  }

  closeSideNav(){
    if (this.state.sideNavOpen){
      this.setState({ sideNavOpen: false });
    } 
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        reveal: true
      });
    }, 1);
  }

  onChange(change){
    
  }

  render() {
    return (<div className="app">
              <TopNav backgroundColor="#282C34" title="React-DateMe">
                <OnClickOut onClickOut={this.closeSideNav}>
                  <Hamburger onClick={this.openSideNav} />
                  <SideNav isOpen={this.state.sideNavOpen} headerTitle="React-DateMe" />
                </OnClickOut>
              </TopNav>

              <div id="components-container" style={ { opacity: this.state.reveal ? 1 : 0 } }>

      					<div className="item-containers" style={ { margin: '25px'} }>
                  <p className="component-title"> {"Basic Date/Time"} </p>
                  <DateMe color="#6556BD" onChange={this.onChange} />
                </div>

                <div className="item-containers" style={ { margin: '25px'} }>
                  <p className="component-title"> {"Future Only"} </p>
                  <DateMe color="#4830AC" futureOnly={true} />
                </div>
                
                <div className="item-containers" style={ { margin: '25px'} }>
                  <p className="component-title"> {"Set Initial Values"} </p>
                  <DateMe month={0} day={1} year={2038} color="#2B0D57" />
                </div>

              </div>

            </div>)
  }

}

render(<App/>, document.getElementById('app'));