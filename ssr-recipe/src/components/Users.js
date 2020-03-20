import React from 'react';
import {Link} from 'react-router-dom';

const Users = ({users}) => {
    if (!users) return null; // users가 유효하지 않으면 보여주지 않음

    return (
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;