import React, {Component} from "react";
import User from "./User";

class UserList extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.users !== this.props.users;
    }

    renderUsers = () => {
        const { users } = this.props;
        return users.map((user) => (
            <User key={user.get('id')} user={user}/>
        ));
    };

    render() {
        console.log('UserList is rendering');
        const { renderUsers } = this;
        return (
            <div>
                {renderUsers}
            </div>
        );
    }
}

export default UserList;