import React from 'react';
import { Icon, Table, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showButton: false
        };
      }

      render() {
          return (
              <div>
                REPLY HERE
              </div>
          )
        }

    };
    
export default Reply;