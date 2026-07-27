import type { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/home/page";
import Movies from "@/pages/movies/page";
import MovieDetail from "@/pages/movie-detail/page";
import Watch from "@/pages/watch/page";
import Login from "@/pages/login/page";
import Signup from "@/pages/signup/page";
import Search from "@/pages/search/page";
import Plans from "@/pages/plans/page";
import Admin from "@/pages/admin/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetail />,
  },
  {
    path: "/watch/:id",
    element: <Watch />,
  },
  {
    path: "/plans",
    element: <Plans />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;