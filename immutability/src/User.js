import React, {Component} from "react";

class User extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.user !== this.props.user;
    }

    render() {
        const { username }  = this.props.user.toJS();
        console.log("%s is rendering", username);

        return (
            <div>
                {username}
            </div>
        );
    }
}

export default User;