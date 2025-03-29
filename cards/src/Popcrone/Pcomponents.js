import React, { useState, useEffect } from "react";

import NavBar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import MovieList from "./MovieList";

const KEY = "828b1959";

export default function PopCron() {
  const [movies, setMovies] = useState([]);
  const [wachthed, setWachted] = useState([]);
  const [inLoading, setInLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  //const custemquery = "interstellar";

  //fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`) // Api ko console mai print krvaa ke // dekhe ge data fecth kaise hota hai
  // .then((res) => res.json())
  //.then((data) => setMovies(data.Search));
  // .then((data) => console.log(data));

  //setWacted([]);  // Too many re-renders; not use like thise

  useEffect(
    function () {
      // useEffect saves us from a lot of netwrok requests
      async function fecthMovies() {
        try {
          setInLoading(true); // not working can't understand
          setError(""); // for search bar seraching movie and find results without this cannot take result.
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error("Something wants worng please try again...");

          //.then((res) => res.json())
          //.then((data) => setMovies(data.Search)); // dirct
          const data = await res.json();
          if (data.Response === "False")
            throw new Error("Movie not found Inter more than 3 letters");

          setMovies(data.Search);

          //console.log(data.Search);
          //console.log(movies); // empty arry because state still empty on useState.
          // setInLoading(false); // can't understand
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setInLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fecthMovies();
    },
    [query]
  ); // [] = is a dependency arry for component first mount.

  /* useEffect(function () {
    console.log("A (After initial render)");
  }, []);

  useEffect(function () {
    console.log("B (After every render");
  });

  useEffect(
    function () {
      console.log("D");
    },
    [query]
  );

  console.log("C (during renders)"); */

  function selectedMovies(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  return (
    <Container className="p-5 bg-dark">
      <NavBar query={query} setQuery={setQuery} />

      {/* {inLoading ? (
          <Loader />
        ) : (
          <MovieCheckList movies={movies} wacthed={wacthed} message={error} />
        )} */}

      {inLoading && <Loader />}
      {!inLoading && !error && (
        <MovieList
          movies={movies}
          wachthed={wachthed}
          key={movies.imbdID}
          select={selectedId}
          onSelection={selectedMovies}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </Container>
  );
}

function Loader() {
  return (
    <>
      <p className="text-info">Loading...</p>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <>
      <p className="text-danger">
        {message}
        <span>🚫</span>
      </p>
    </>
  );
}
