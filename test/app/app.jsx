import React from 'react';
import {render} from 'react-dom';
import DateMe from '../../build/react-dateme.js';

class App extends React.Component {
  constructor(props){
  	super(props);
  }

  render() {
    return (<div>
              
              <div id="components-container">
      					<div className="item-containers" style={ { margin: '25px'} }>
                	<DateMe color="#3E3F3A" futureOnly={true} />
                </div>

                <div className="item-containers" style={ { margin: '25px'} }>
                	<DateMe color="#824ED2" />
                </div>
                
                <div className="item-containers" style={ { margin: '25px'} }>
                	<DateMe month={0} day={1} year={2038} color="#FF6961" />
                </div>
              </div>

            </div>)
  }

}

render(<App/>, document.getElementById('app'));