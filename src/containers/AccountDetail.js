import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAccount }  from '../actions/index';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
//import router Link
import { Link } from 'react-router-dom';



class AccountDetail extends Component {

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
              <Link className="btn btn-danger mr-3" to="/users" >Withdraw funds</Link>
              <Link className="btn btn-primary" to={`/users/${this.props.user._id}`} >Back to user details</Link>
            </div>
          </div>
        </div>
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


/*

You will need to create a mapDispatchToProps function here and
return the action creator selectAccount - HINT: see the UserList
component.

*/

function mapDispatchToProps(dispatch) {
  return {
    selectAccount: function(filter) {
      dispatch(selectAccount(filter));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
