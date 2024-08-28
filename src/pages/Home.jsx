import React from "react";
import TopRated from "../component/TopRated";
import Popular from "../component/Popular";
import NowPlaying from "../component/NowPlaying";
import Upcoming from "../component/Upcoming";

const Home = () => {
  return (
    <div>
      <TopRated />
      <Popular />
      <NowPlaying />
      <Upcoming />
    </div>
  );
};

export default Home;
