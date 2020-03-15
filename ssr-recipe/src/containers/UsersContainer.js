import React, {useEffect} from 'react';
import Users from "../components/Users";
import {connect} from 'react-redux';
import {getUsers} from "../modules/users";

const UsersContainer = ({users, getUsers}) => {
    // 컴포넌트가 마운트 되고 호출
    useEffect(() => {
        if (users) return;
        getUsers();
    }, [getUsers, users]);

    return (
        <Users users={users}/>
    );
};

export default connect(
    state => ({
        users: state.users.users
    }),
    {
        getUsers
    }
)(UsersContainer);