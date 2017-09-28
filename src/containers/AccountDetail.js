import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withdrawFunds }  from '../actions/index';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import router Link
import { Link } from 'react-router-dom';

// Modal.propTypes = {
//   isOpen:  PropTypes.bool,
//   // boolean to control the state of the popover
//   toggle:  PropTypes.func,
//   // callback for toggling isOpen in the controlling component
//   size: PropTypes.string,
//   // control backdrop, see http://v4-alpha.getbootstrap.com/components/modal/#options
//   backdrop: PropTypes.oneOfType([
//     PropTypes.bool,
//     PropTypes.oneOf(['static'])
//   ]),
//   keyboard: PropTypes.bool,
//   // zIndex defaults to 1000.
//   zIndex: PropTypes.oneOfType([
//     PropTypes.number,
//     PropTypes.string,
//   ]),
//   className: PropTypes.string,
//   wrapClassName: PropTypes.string,
//   modalClassName: PropTypes.string,
//   backdropClassName: PropTypes.string,
//   contentClassName: PropTypes.string,
// }

class AccountDetail extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   modal: false,
    //   backdrop: false
    // };

    // this.toggle = this.toggle.bind(this);
  }

  // MODAL-SPECIFIC FUNCTIONS
  toggle() {
    this.setState({
      modal: !this.props.modal,
      backdrop: !this.props.modal
    });
  }
  // changeBackdrop(e) {
  //   // let value = e.target.value;
  //   // if (value !== 'static') {
  //   //   value = JSON.parse(value);
  //   // }
  //   this.setState({ backdrop: !this.state.modal });
  // }

  render() {
    console.log('this.props: ', this.props);
    if(!this.props.user) {
      return (
        <div>Please select a user...</div>
      )
    }

    return (
      <div className="col-md-6">
        <div className= "card my-3">
          <div className= "card-block m-3">
            <h4 className= "card-title">Account Information</h4>
            <h6 className= "card-subtitle mb-2 text-muted"><b style={{textTransform: 'capitalize'}}>{this.props.account.accountType}</b> account for {this.props.user.name}</h6>
            <div className= "card-text mb-2">
              <div>Balance: {this.props.account.balance}</div>
            </div>
            <div className="d-flex justify-content-between">
              <p>Withdraw:</p>
              <span onClick={() => this.props.withdrawFunds(5)} className="btn btn-primary">$5</span>
              <span onClick={() => this.props.withdrawFunds(10)} className="btn btn-success">$10</span>
              <span onClick={() => this.props.withdrawFunds(20)} className="btn btn-danger">$20</span>
            </div>
            <Link className="btn btn-secondary btn-block mt-3" to={`/users/${this.props.user._id}`} >Back</Link>
          </div>
        </div>
        {/*<Button color="danger" onClick={this.toggle}>Click Me{this.props.buttonLabel}</Button>
        <Modal isOpen={this.props.modal} toggle={this.toggle} className={this.props.className} backdrop={this.props.backdrop}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state on AccountDetail', state);
  const userIdx = state.users.findIndex(user => user._id === state.selectedUser);
  const accountIdx = state.users[userIdx].accounts.findIndex(account => account.id === state.selectedAccount.id);
  return {
    account: state.users[userIdx].accounts[accountIdx],
    user: state.users[userIdx]
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      withdrawFunds: withdrawFunds
  }, dispatch)
  // return {
  //   withdrawFunds: function(filter) {
  //     dispatch(withdrawFunds(filter));
  //   }
  // }
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
