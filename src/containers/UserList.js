//React imports
import React, {Component} from 'react';
//Redux imports
import {connect} from 'react-redux';
import { selectUser } from '../actions/index.js'
import { bindActionCreators } from 'redux';
//react router imports
import { Link } from 'react-router-dom';

class UserList extends Component {
    render() {
      // console.log('this.props: ', this.props);

        let users = this.props.users.map((user) => {
            return (
                <li key={user._id} className="list-group-item" onClick={() => this.props.selectUser(user._id)}>
                  <Link to={`/users/${user._id}`}>{user.name}</Link>
                </li>
            );
        });
        return (
            <div className="m-3">
              <h5>Users with open accounts:</h5>
              <ul className="mt-3">
                {users}
              </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
  let selectedUser;
  console.log('state on UserList: ', state);
  // if(state.filter === 'selectedUser') {
  //   selectedUser = state.users.filter(user => user._id === this.props.match.params._id);
  // }
    return {users: state.users, selectedUser: state.selectedUser};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectUser: selectUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
