import React from "react";

const MyComponent = (props) => {
    return (
        <div>
            <div>안녕하세연, 제 이름은 {props.name}</div>
        </div>
    );

    MyComponent.defaultProps = {
        name: '기본 이름'
    }
};

export default MyComponent;