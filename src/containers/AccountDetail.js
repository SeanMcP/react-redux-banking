import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAccount }  from '../actions/index';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
//import router Link
import { Link } from 'react-router-dom';



class AccountDetail extends Component {

  render() {
    if(!this.props.user) {
      return (
        <div>Please select a user...</div>
      )
    }
    console.log('this.props: ', this.props);

    return (
        <div className= "card">
          <div className= "card-block">
            <h4 className= "card-title">Account Information</h4>
            <h6 className= "card-subtitle mb-2 text-muted">{this.props.user.name}</h6>
            <div className= "card-text">
              <div>{this.props.user.email}</div>
              <div>{this.props.user.phone}</div>
              <div>{this.props.user.address}</div>
            </div>

          </div>
          <Link className="btn btn-primary" to="/users" >Back to List of Users</Link>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const userIdx = state.users.findIndex(user => user._id === state.selectedUser);
  const accountIdx = state.users[userIdx].accounts.findIndex(account => account.id === state.selectedAccount);
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
