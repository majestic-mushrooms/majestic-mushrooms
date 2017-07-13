import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div>
            <Button primary>Primary</Button>
            <Button secondary>Secondary</Button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
