import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router-dom';
import {BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import Routes from './components/Navigation/Routes.jsx';


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router history={browserHistory} >
      <div>
        <Routes />
      </div>
     </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));