exports.deleteMsg = (msgId) => {
  return {
    type: 'DELETE_MSG',
    id: msgId //delete by message_id
  };
};
// put import { deleteMsg } from 'FILL_IN /index.js' into component
// and dispatch(deleteMsg('Use Redux'))
