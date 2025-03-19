import React from "react";
import { useSelector } from "react-redux";

const TestMain = () => {
    const { nickname } = useSelector((state) => state.user);

    return (
        <div className="test-main-container">
            <h1>환영합니다 {nickname}님!</h1>
        </div>
    );
};

export default TestMain;