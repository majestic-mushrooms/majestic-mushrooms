import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Input, Menu } from 'semantic-ui-react';
import LeftMenu from './components/LeftMenu.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentView: 'home'
    }
  }

  render() {

    var display = null;

    if (this.state.currentView === 'home') {
      display = (
        <div>
          <LeftMenu />
       </div>
      )
    } else {
      display = (
        <div>
          <LeftMenu />
        </div>
      )
    }

    return (<div>{display}</div>)
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
