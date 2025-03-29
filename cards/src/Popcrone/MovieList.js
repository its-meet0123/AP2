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
          <Col className=" m-1 p-2 ">
            {movies?.map((movie) => (
              <Movies
                list={movie}
                key={movie.imdbID}
                onSelection={onSelection}
              />
            ))}
          </Col>
          <Col className="m-1 p-2 ">
            <WatchMovieList wacthed={wacthed} selectedID={select} />
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

function WatchMovieList({ wacthed, selectedID }) {
  console.log(selectedID);

  useEffect(function () {
    async function getMovieDitails() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
      );
      const data = await res.json();
      console.log(data);
    }
    getMovieDitails();
  }, []);

  return (
    <>
      <Row className="m-3 p-2  bg-secondary">hlo my movie id {selectedID}</Row>
    </>
  );
}
