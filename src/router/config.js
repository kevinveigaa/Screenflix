import { jsx as _jsx } from "react/jsx-runtime";
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
const routes = [
    {
        path: "/",
        element: _jsx(Home, {}),
    },
    {
        path: "/movies",
        element: _jsx(Movies, {}),
    },
    {
        path: "/movie/:id",
        element: _jsx(MovieDetail, {}),
    },
    {
        path: "/watch/:id",
        element: _jsx(Watch, {}),
    },
    {
        path: "/plans",
        element: _jsx(Plans, {}),
    },
    {
        path: "/admin",
        element: _jsx(Admin, {}),
    },
    {
        path: "/login",
        element: _jsx(Login, {}),
    },
    {
        path: "/signup",
        element: _jsx(Signup, {}),
    },
    {
        path: "/search",
        element: _jsx(Search, {}),
    },
    {
        path: "*",
        element: _jsx(NotFound, {}),
    },
];
export default routes;
