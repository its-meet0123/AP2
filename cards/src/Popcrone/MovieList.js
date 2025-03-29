import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/Button";
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

function WatchMovieDetail({ wacthed, selectedID }) {
  console.log('movie detail:', selectedID);
  const [movieData, setMovieData] = useState(null); // Initialize as null
  const [error, setError] = useState(null); // State to handle errors

  useEffect(function () {
    async function getMovieDetails() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();
        setMovieData(data);
        // if (data.Response === "False") {
        //   setError(data.Error); // Handle API error
        //   setMovieData(null);
        // } else {
        //   setMovieData(data);
        //   setError(null);
        // }
      } catch (err) {
        setError("Failed to fetch movie details.");
        setMovieData(null);
      }
    }
    if (selectedID != null && selectedID !== "") {
      getMovieDetails();
    }
  }, [selectedID]);

  // if (error) {
  //   return <Row className="m-3 p-2 bg-danger text-light">{error}</Row>;
  // }

  // if (!movieData) {
  //   return;
  // }

  return (
    <>
      {movieData && (
        <Row className="m-3 p-2 bg-secondary text-light">
          <Col>
            <h3>{movieData.Title}</h3>
            <p>
              <strong>Plot:</strong> {movieData.Plot}
            </p>
            <p>
              <strong>Director:</strong> {movieData.Director}
            </p>
            <p>
              <strong>Year:</strong> {movieData.Year}
            </p>
            <p>
              <strong>Genre:</strong> {movieData.Genre}
            </p>
            <p>
              <strong>Actors:</strong> {movieData.Actors}
            </p>
            <p>
              <strong>Language:</strong> {movieData.Language}
            </p>
            <p>
              <strong>Country:</strong> {movieData.Country}
            </p>
            <p>
              <strong>Runtime:</strong> {movieData.Runtime}
            </p>
            <p>
              <strong>IMDB Rating:</strong> {movieData.imdbRating}
            </p>
            <p>
              <strong>Awards:</strong> {movieData.Awards}
            </p>
          </Col>
        </Row>
      )}
    </>
  );
}
