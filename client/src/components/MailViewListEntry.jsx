import React from 'react';
import { Table, Segment, Label } from 'semantic-ui-react';

class MailViewListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  
    return (
      <Table.Row >
        <Table.Cell>
          <Label circular color={this.props.color}>{this.props.from.charAt(0)}</Label>
        </Table.Cell>
        <Table.Cell>
          {'     ' + this.props.from}
        </Table.Cell>
        <Table.Cell style={{fontWeight: 'bold'}}>{this.props.subject}</Table.Cell>
        <Table.Cell>{this.props.snippet}</Table.Cell>
      </Table.Row>
    );
  }
}

export default MailViewListEntry;

// onClick={()=> this.props.handleViewChange('mail')}