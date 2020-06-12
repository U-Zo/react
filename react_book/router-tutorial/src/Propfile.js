import React from "react";
import WithRouterSample from "./WithRouterSample";

const data = {
    woojo: {
        name: '김우조',
        description: '리액트를 배우는 개발자'
    },
    woozya: {
        name: '우쟈',
        description: '종합 게임 방송 스트리머'
    }
};

const Profile = ({match}) => {
    const {username} = match.params;
    const profile = data[username];
    if (!profile) {
        return <div>존재하지 않는 사용자입니다.</div>;
    }

    return (
        <div>
            <h3>
                {username} ({profile.name})
            </h3>
            <p>{profile.description}</p>
            <WithRouterSample/>
        </div>
    );
};

export default Profile;