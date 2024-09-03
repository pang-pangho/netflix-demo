import React, { useMemo, useRef, useState } from "react";
import "./MovieReview.style.css";

const MovieReview = ({ reviewData }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const textLimit = useRef(170);

  const commenter = useMemo(() => {
    const shortReview = reviewData.content.slice(0, textLimit.current);
    if (reviewData.content.length > textLimit.current) {
      if (isShowMore) {
        return reviewData.content;
      }
      return shortReview;
    }
    return reviewData.content;
  }, [isShowMore, reviewData.content]);

  return (
    <div>
      <div className="review-container">
        <div className="review-author">{reviewData.author}</div>
        <div className="review-content">{commenter}</div>
        {reviewData.content.length > textLimit.current && (
          <div
            className="more-container"
            onClick={() => setIsShowMore(!isShowMore)}
          >
            {isShowMore ? "[닫기]" : "[더보기]"}
          </div>
        )}
        <div className="review-create-at">{reviewData.created_at}</div>
      </div>
    </div>
  );
};

export default MovieReview;
