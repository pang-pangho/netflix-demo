import React, { useState } from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovie";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";
import { useMovieTrailer } from "../../../../hooks/useMovieTrailer";
import Modal from "react-bootstrap/Modal";
const Banner = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { data: trailerData, isLoading: isTrailerLoading } = useMovieTrailer({
    movie_id: selectedMovieId,
  });
  const navigate = useNavigate();

  // 상세 정보 페이지로 이동
  const goToDetail = (id) => {
    navigate(`/movies/${id}`);
  };
  const trailer = trailerData?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const goToTrailer = (id) => {
    setSelectedMovieId(id);
  };

  React.useEffect(() => {
    if (!isTrailerLoading && trailerData) {
      const trailer = trailerData?.find(
        (trailer) => trailer.type === "Trailer" && trailer.site === "YouTube"
      );

      if (trailer) {
        setShow(true);
      } else if (selectedMovieId) {
        alert("트레일러를 찾을 수 없습니다.");
      }
    }
  }, [isTrailerLoading, trailerData, selectedMovieId]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {data?.results.slice(1, 5).map((movie, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
              className="banner"
            >
              <div className="banner-text-area">
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <div>
                  <button
                    onClick={() => goToTrailer(movie.id)}
                    className="play-btn"
                  >
                    재생
                  </button>
                  <button
                    onClick={() => goToDetail(movie.id)}
                    className="info-btn"
                  >
                    상세정보
                  </button>
                </div>
              </div>
            </div>
            <Modal
              show={show}
              fullscreen={fullscreen}
              onHide={() => setShow(false)}
              centered
              backdrop="true"
              dialogClassName="custom-modal"
            >
              <Modal.Header closeButton>
                {" "}
                <Modal.Title>예고편</Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-0 d-flex justify-content-center align-items-center">
                {trailer ? (
                  <iframe
                    width="80%"
                    height="80%"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p className="text-white">No Trailer Available</p>
                )}
              </Modal.Body>
            </Modal>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
