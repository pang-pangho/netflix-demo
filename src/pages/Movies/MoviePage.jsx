import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
import { usePopularMoviesQuery } from "../../hooks/usePopularMovie";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

// MoviePage 컴포넌트
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const { data: popularData } = usePopularMoviesQuery();
  const { data: genreData } = useMovieGenreQuery();
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    genreData,
  });
  const [filteredData, setFilteredData] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    if (keyword) {
      if (data?.results?.length === 0) {
        setFilteredData(data);
      } else {
        setFilteredData(data);
      }
    } else {
      setFilteredData(data);
    }
  }, [data, popularData, keyword]);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 인기순 정렬 함수
  const doPopularFilter = () => {
    if (filteredData) {
      const sortedMovies = [...(filteredData.results || [])].sort(
        (a, b) => b.popularity - a.popularity
      );
      setFilteredData({ ...filteredData, results: sortedMovies });
    }
  };

  // 장르별 필터링
  const handleGenreFilter = () => {
    if (selectedGenre && filteredData) {
      const filteredMovies = (filteredData.results || []).filter((movie) =>
        movie.genre_ids.includes(selectedGenre)
      );
      setFilteredData({ ...filteredData, results: filteredMovies });
    }
    setShowModal(false);
  };

  const handlePageClick = ({ selected }) => {
    setSelectedGenre(null);
    setPage(selected + 1);
  };

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <div className="filter-button" onClick={doPopularFilter}>
            인기순
          </div>
          <div className="filter-button" onClick={() => setShowModal(true)}>
            장르별
          </div>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {filteredData?.results?.length > 0 ? (
              filteredData.results.map((movie, index) => (
                <Col key={index}>
                  <MovieCard movie={movie}></MovieCard>
                </Col>
              ))
            ) : (
              <Col>
                <p className="no-results">검색 결과가 없습니다.</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Col>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          marginPagesDisplayed={0}
          pageCount={filteredData?.total_pages || 0}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={page - 1}
        />
      </Col>

      {/* 장르 선택 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>장르별 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {genreData?.map((genre) => (
              <Col xs={6} key={genre.id}>
                <Button
                  variant={
                    selectedGenre === genre.id ? "primary" : "outline-primary"
                  }
                  onClick={() => setSelectedGenre(genre.id)}
                  style={{ marginBottom: "10px", width: "100%" }}
                >
                  {genre.name}
                </Button>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            취소
          </Button>
          <Button variant="primary" onClick={handleGenreFilter}>
            필터링
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MoviePage;
