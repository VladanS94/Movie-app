import React from "react";
import TopRated from "./../component/TopRated";
import Popular from "./../component/Popular";
import NowPlaying from "./../component/NowPlaying";
import Upcoming from "./../component/Upcoming";
import { Link } from "react-router-dom";
import { paths } from "../app/Route";

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-title-movies">
        <h1 className="home-title-more-movies">See More Movies</h1>
        <ul>
          <Link to={paths.topratedmovies}>TOP RATED</Link>
          <Link to={paths.popularmovies}>POPULAR</Link>
          <Link to={paths.nowplayingmovies}>NOW PLAYING</Link>
          <Link to={paths.upcomingmovies}>UPCOMING</Link>
        </ul>
      </div>
      <TopRated />
      <Popular />
      <NowPlaying />
      <Upcoming />
    </div>
  );
};

export default Home;
