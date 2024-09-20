import React from "react";
import CarouselMovie from "./CarouselMovie";
import useFetch from "../hooks/useFetch";

const NowPlaying = () => {
  const { data } = useFetch(`https://api.themoviedb.org/3/movie/now_playing`);

  return (
    <div className="now-playing">
      <h1 className="title">NOW PLAYING</h1>
      <CarouselMovie data={data} />
    </div>
  );
};

export default NowPlaying;
