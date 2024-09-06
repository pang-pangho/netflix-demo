// src/pages/LoginPage/LoginPage.js
import React from "react";
import "./LoginPage.style.css";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    console.log("!");
    navigate("./app");
  };
  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Netflix 로고 */}
        <img
          className="netflix-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />

        {/* 로그인 폼 */}
        <div className="login-form">
          <h2>로그인</h2>
          <input type="text" placeholder="이메일 주소 또는 휴대폰 번호" />
          <input type="password" placeholder="비밀번호" />
          <button className="login-button" onClick={() => goToHome()}>
            로그인
          </button>

          {/* 기타 옵션들 */}
          <div className="login-options">
            <button className="login-code-button">로그인 코드 사용하기</button>
            <a href="#" className="forgot-password">
              비밀번호를 잊으셨나요?
            </a>
          </div>

          {/* 부가 요소 */}
          <div className="extra-info">
            <label>
              <input type="checkbox" /> 로그인 정보 저장
            </label>
            <p>
              Netflix 회원이 아닌가요? <a href="#">지금 가입하세요.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
