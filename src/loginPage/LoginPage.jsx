import React, { useState } from "react";
import "./LoginPage.style.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  // 로그인 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      navigate("/app"); // 로그인 성공 시 홈 페이지로 이동
    } catch (error) {
      console.error("Login error:", error.message);
      alert("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <img
          className="netflix-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />

        <form className="login-form" onSubmit={handleLogin}>
          <h2>로그인</h2>
          <input
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            로그인
          </button>

          <div className="login-options">
            <button type="button" className="login-code-button">
              로그인 코드 사용하기
            </button>
            <a href="#" className="forgot-password">
              비밀번호를 잊으셨나요?
            </a>
          </div>

          <div className="extra-info">
            <label>
              <input type="checkbox" /> <div />
              로그인 정보 저장
            </label>
            <p>
              Netflix 회원이 아닌가요?{" "}
              <span onClick={goToSignup} className="signup-link">
                지금 가입하세요.
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
