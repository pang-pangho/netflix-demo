import React from "react";
import styles from "./Signup.module.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../firebase";

const Signup = () => {
  const navigate = useNavigate();

  async function register(email, password) {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      navigate("/"); // 회원가입 성공 시 홈으로 이동
    } catch (error) {
      console.error("Error during registration:", error.message);
      alert("회원가입 실패: 이메일 또는 비밀번호를 확인해주세요.");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    register(email, password);
  };

  return (
    <div className={styles.signupBody}>
      <div className={styles.container}>
        <header className={styles.header}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            className={styles.logo}
          />
        </header>
        <div className={styles.content}>
          <h1>영화, 시리즈 등을 무제한으로</h1>
          <p>5,500원으로 시작하세요. 멤버십은 언제든지 해지 가능합니다.</p>
          <p>
            시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일
            주소를 입력하세요.
          </p>
          <form className={styles.form} onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              placeholder="이메일 주소"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="6자리 이상의 비밀번호"
              minLength="6"
              required
            />
            <button type="submit" className={styles.submitButton}>
              시작하기 &gt;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
