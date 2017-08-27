import React from 'react';
import {render} from 'react-dom';
import DateMe from '../../build/react-dateme.js';

class App extends React.Component {
  constructor(props){
  	super(props);
  }

  render() {
    return (<div style={ {display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent:'center', height: '100%' } }>
              
    					<div style={ { margin: '25px'} }>
              	<DateMe futureOnly={true} />
              </div>

              <div style={ { margin: '25px'} }>
              	<DateMe color="#824ED2" />
              </div>
              
              <div style={ { margin: '25px'} }>
              	<DateMe color="#00308F" />
              </div>

            </div>)
  }

}

render(<App/>, document.getElementById('app'));