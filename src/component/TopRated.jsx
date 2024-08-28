import React, { useEffect, useState } from "react";

const TopRated = () => {
  const [movie, setMovie] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;

  console.log(process.env);

  const fetchMovies = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data.results))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return <div></div>;
};

export default TopRated;
