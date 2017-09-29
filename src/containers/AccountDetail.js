import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withdrawFunds }  from '../actions/index';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
//import router Link
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  // MODAL-SPECIFIC FUNCTIONS
  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    // if(!this.props.selectedUser) {
    //   return (
    //     <div>Please select a user...</div>
    //   )
    // }

    return (
      <div className="col-md-6">
        <div className= "card my-3">
          <div className= "card-block m-3">
            <h4 className= "card-title">Account Information</h4>
            <h6 className= "card-subtitle mb-2 text-muted"><b style={{textTransform: 'capitalize'}}>{this.props.account.accountType}</b> account for {this.props.user.name}</h6>
            <div className= "card-text mb-2">
              <div>Balance: {this.props.account.balance}</div>
            </div>
            <button onClick={this.toggle} className="btn btn-danger btn-block mt-3">Withdraw funds</button>
            <Link className="btn btn-secondary btn-block mt-3" to={`/users/${this.props.user._id}`} >Back</Link>
          </div>
        </div>
        <Modal isOpen={this.state.modal} onRequestClose={this.toggle} contentLabel="Withdraw Funds" className="card p-3 w-50 mx-auto my-5" >
          <h2 ref={subtitle => this.subtitle = subtitle}>Make a withdrawal</h2>
          <div className= "mb-2">
            <p>Please select an ammount to withdraw from your {this.props.account.accountType} account. Your current balance is: {this.props.account.balance}</p>
          </div>
          <div className="d-flex justify-content-end">
            <span onClick={() => this.props.withdrawFunds(5)} className="btn btn-primary mr-2">$5</span>
            <span onClick={() => this.props.withdrawFunds(10)} className="btn btn-success mr-2">$10</span>
            <span onClick={() => this.props.withdrawFunds(20)} className="btn btn-warning mr-2">$20</span>
            <button onClick={this.toggle} className="btn btn-danger">Cancel</button>
          </div>
        </Modal>
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
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
