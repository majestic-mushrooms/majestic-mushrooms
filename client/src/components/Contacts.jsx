import React from 'react';
import ContactContainer from '../containers/ContactContainer.jsx';
import { Message, Divider, Table, Icon, Label, Image, Menu } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { WAIT_IMAGE } from './utils/stylesHelper.js';
import ContactItem from './ContactItem.jsx';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePageNav(direction) {
    const { page, setPage } = this.props;

    if (direction === 'back') {
      if (page - 1 > 0) { setPage(page - 1); }
    } else {
      const maxPage = Math.ceil(this.props.contacts.length / 25);
      if (page + 1 <= maxPage) { setPage(page + 1); }
    }
  } 

  render() {
    const { view, page } = this.props;
    const contacts = this.props.contacts ? this.props.contacts.slice(25 * (page - 1), 25 * page) 
                      : console.log(this.props.contacts);
    console.log(this.props);
    // return (
    //   <div>

    //   {contacts.length === 0 ? (
    //       <Image src={WAIT_IMAGE} centered size='small'/>          
    //     ) : (
    //       <div>
    //         <Table singleLine fixed>
    //           <Table.Body>
    //             {contacts.map((contact, index, array) => {
    //               index = (25 * (page - 1)) + index;
    //               return <ContactItemContainer key={index} contactIndex={index}  />;
    //             })}
    //           </Table.Body> 
    //         </Table>

    //         <Icon name="chevron left" onClick={() => { this.handlePageNav('back'); }} />
    //           {page} / {Math.ceil(this.props.messages.length / 25)} 
    //         <Icon name="chevron right" onClick={() => { this.handlePageNav('forward'); }} />
    //       </div>
    //       )
    //     }
    //   </div>
    // );
    return (<div>Testing</div>);
  }
}
            
export default Contacts;
