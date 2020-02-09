import React, {useContext} from "react";
import ColorContext, {ColorConsumer} from "../contexts/color";

const ColorBox = () => {
    const {state} = useContext(ColorContext); // 함수형 컴포넌트에만 사용 가능

    return (
        <>
            <div style={{
                width: '64px',
                height: '64px',
                background: state.color
            }}
            />
            <div
                style={{
                    width: '32px',
                    height: '32px',
                    background: state.subcolor
                }}
            />
        </>
    );
};

export default ColorBox;