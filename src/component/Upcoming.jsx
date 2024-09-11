import React from "react";
import CarouselMovie from "./CarouselMovie";
import useFetch from "../hooks/useFetch";

const Upcoming = () => {
  const { data } = useFetch(`https://api.themoviedb.org/3/movie/upcoming`);

  return (
    <div className="upcoming">
      <h1 className="title">UPCOMING</h1>
      <CarouselMovie data={data} />
    </div>
  );
};

export default Upcoming;
