import React from "react";
import { useRoutes } from "react-router-dom";
import SingleMovie from "../pages/SingleMovie";
import Home from "../pages/Home";
import WishList from "../pages/WishList";
import LogIn from "../pages/Login";
import Register from "../pages/Register";
import LogInRoute from "./LogInRoute";
import Protected from "./Protected";
import TopRatedMovies from "../pages/TopRatedMovies";
import PopularMovies from "../pages/PopularMovies";
import NowPlayingMovies from "../pages/NowPlayingMovies";
import UpcomingMovies from "../pages/UpcomingMovies";

export const paths = Object.freeze({
  home: "/",
  id: "/movie/:id",
  wishlist: "/wishlist",
  login: "/login",
  register: "/register",
  topratedmovies: "/topratedmovies",
  popularmovies: "/popularmovies",
  nowplayingmovies: "/nowplayingmovies",
  upcomingmovies: "/upcomingmovies",
});

const Routes = () => {
  return useRoutes([
    {
      path: paths.home,
      element: (
        <Protected>
          <Home />
        </Protected>
      ),
    },
    {
      path: paths.id,
      element: (
        <Protected>
          <SingleMovie />
        </Protected>
      ),
    },
    {
      path: paths.wishlist,
      element: (
        <Protected>
          <WishList />
        </Protected>
      ),
    },
    {
      path: paths.login,
      element: (
        <LogInRoute>
          <LogIn />
        </LogInRoute>
      ),
    },
    {
      path: paths.register,
      element: (
        <LogInRoute>
          <Register />
        </LogInRoute>
      ),
    },
    {
      path: paths.topratedmovies,
      element: (
        <Protected>
          <TopRatedMovies />
        </Protected>
      ),
    },
    {
      path: paths.popularmovies,
      element: (
        <Protected>
          <PopularMovies />
        </Protected>
      ),
    },
    {
      path: paths.nowplayingmovies,
      element: (
        <Protected>
          <NowPlayingMovies />
        </Protected>
      ),
    },
    {
      path: paths.upcomingmovies,
      element: (
        <Protected>
          <UpcomingMovies />
        </Protected>
      ),
    },
  ]);
};

export default Routes;
