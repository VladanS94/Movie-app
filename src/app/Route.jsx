import React from "react";
import { useRoutes } from "react-router-dom";
import SingleMovie from "../pages/SingleMovie";
import Home from "../pages/Home";
import WishList from "../pages/WishList";
import LogIn from "../pages/Login";
import Register from "../pages/Register";
import LogInRoute from "./LogInRoute";
import Protected from "./Protected";

export const paths = Object.freeze({
  home: "/",
  id: "/:id",
  wishlist: "/wishlist",
  login: "/login",
  register: "/register",
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
  ]);
};

export default Routes;
