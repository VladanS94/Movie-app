import React from "react";
import CarouselMovie from "./CarouselMovie";
import useFetch from "../hooks/useFetch";

const Popular = () => {
  const { data } = useFetch(`https://api.themoviedb.org/3/movie/popular`);

  return (
    <div className="popular">
      <h1 className="title">POPULAR</h1>
      <CarouselMovie data={data} />
    </div>
  );
};

export default Popular;
