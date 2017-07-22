import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router-dom';
import {BrowserRouter as Router, browserHistory } from 'react-router-dom';
import MainRoutes from './components/Navigation/MainRoutes.jsx';
import LeftMenu from './components/LeftMenu.jsx';
import FolderList from './components/FolderList.jsx';
import { Grid, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import store from './store';
import { Provider } from 'react-redux';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

  const PropsRoute = ({ component, ...rest }) => {
    return (
      <Route {...rest} render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}/>
    );
  }



class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { store } = this.context;
    console.log('Inside index.jsx componentDidMount() ', store.getState());
    this.unsubscribe = store.subscribe(
      () => this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  render() {
    return (
      <div>
      <Router history={browserHistory} >
        <Grid >
          <Grid.Row>
            <Grid.Column width={1}>
              <LeftMenu /> 
            </Grid.Column>

            <Grid.Column width={11} style={{marginLeft: '25px'}} >
              <MainRoutes />
            </Grid.Column> 

            <Grid.Column className='foldersTable' width={3}>
              <FolderList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Router>
      </div>
   
    );
  }
}
App.contextTypes = {
  store: React.PropTypes.object
};

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);