import React from 'react';
import { Message } from 'semantic-ui-react';


const UserMessage = (props) => {
  const { view, message } = props;
  return (
      <div>
        { view === 'DisplayMessage' &&  
        <Message color={message.color}>
          <Message.Header>{message.title}</Message.Header>
          <p>{message.body}
          </p>
        </Message>
        }
      </div>
  );
};

export default UserMessage;