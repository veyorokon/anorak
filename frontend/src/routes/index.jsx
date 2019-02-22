import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Landing from "layouts/Landing/Landing.jsx";
import Auth from "layouts/Auth/Auth.jsx";


const indexRoutes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/auth", component: Auth },
    { path: "/", component: Landing },
];

export default indexRoutes;
