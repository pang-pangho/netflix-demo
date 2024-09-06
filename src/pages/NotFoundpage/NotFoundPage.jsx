import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.style.css";
const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/app");
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">
        죄송합니다. 해당 페이지를 찾을 수 없습니다.
      </h1>
      <p className="not-found-text">
        메인 페이지에서 다양한 콘텐츠를 찾아보세요.
      </p>
      <button className="go-home-button" onClick={goToMain}>
        메인으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;
