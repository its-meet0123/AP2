import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/Button";
import { Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
//import { moiveslist } from "./Popcrondata.js";

const KEY = "828b1959";

export default function MovieList({ movies, wacthed, select, onSelection }) {
  const [inMovie, setInMovie] = useState(null);

  //console.log(selectedId);
  return (
    <>
      <Container className=" mt-4 text-light">
        <Row>
          {/* // List view */}
          <Col className=" m-1 p-2 ">
            {movies?.map((movie) => (
              <Movies
                list={movie}
                key={movie.imdbID}
                onSelection={onSelection}
              />
            ))}
          </Col>
          {/* // detail view */}
          <Col className="m-1 p-2 ">
            <WatchMovieDetail wacthed={wacthed} selectedID={select} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

function Movies({ list, onSelection }) {
  return (
    <>
      <Row
        className="mt-3 p-2  bg-secondary "
        onClick={() => onSelection(list.imdbID)}
      >
        <Col sm={4}>
          <Image src={list.Poster} thumbnail />
        </Col>

        <Col sm={5}>
          <span>{list.Year} </span>
          <h3>{list.Title}</h3>
          <span>{list.starcast}</span>
          <h6> {list.Director}</h6>
        </Col>

        <Col sm={3} style={{ textAlign: "right" }} className="bg-secondary ">
          <Button variant="secondary" size="lg">
            -
          </Button>
        </Col>
      </Row>
    </>
  );
}

function WatchMovieDetail({ watched, selectedID }) {
  console.log("movie detail:", selectedID);
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMovieDetails() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();
        if (data.Response === "False") {
          setError(data.Error);
          setMovieData(null);
        } else {
          setMovieData(data);
          setError(null);
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
        setMovieData(null);
      }
      setLoading(false);
    }
    if (selectedID) {
      getMovieDetails();
    }
  }, [selectedID]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-3">{error}</Alert>;
  }

  if (!movieData) {
    return null;
  }

  return (
    <Row className="m-3 justify-content-center">
      <Col>
        <Card className="shadow-lg">
          <Card.Img variant="top" src={movieData.Poster} alt={movieData.Title} />
          <Card.Body>
            <Card.Title className="text-primary">{movieData.Title}</Card.Title>
            <Card.Text>
              <strong>Plot:</strong> {movieData.Plot}
            </Card.Text>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Director:</strong> {movieData.Director}</li>
              <li className="list-group-item"><strong>Year:</strong> {movieData.Year}</li>
              <li className="list-group-item"><strong>Genre:</strong> {movieData.Genre}</li>
              <li className="list-group-item"><strong>Actors:</strong> {movieData.Actors}</li>
              <li className="list-group-item"><strong>Language:</strong> {movieData.Language}</li>
              <li className="list-group-item"><strong>Country:</strong> {movieData.Country}</li>
              <li className="list-group-item"><strong>Runtime:</strong> {movieData.Runtime}</li>
              <li className="list-group-item">
                <strong>IMDB Rating:</strong> {movieData.imdbRating}&nbsp;
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < Math.round(movieData.imdbRating / 2) ? "gold" : "gray"} />
                ))}
              </li><li className="list-group-item"><strong>Awards:</strong> {movieData.Awards}</li>
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
