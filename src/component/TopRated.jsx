import React from "react";
import "react-multi-carousel/lib/styles.css";
import CarouselMovie from "./CarouselMovie";
import useFetch from "../hooks/useFetch";

const TopRated = () => {
  const { data, error, loading } = useFetch(
    `https://api.themoviedb.org/3/movie/top_rated`
  );

  return (
    <div className="top-rated">
      <h1 className="title">TOP RATED MOVIES</h1>

      <CarouselMovie data={data} />
      {loading ? <div className="text-white">LOADING</div> : null}
      {error ? <div className="text-red-600">{error}</div> : null}
    </div>
  );
};

export default TopRated;
