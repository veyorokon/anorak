import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Manage from "layouts/Dashboard/Manage.jsx";
import Landing from "layouts/Landing/Landing.jsx";
import Auth from "layouts/Auth/Auth.jsx";

const indexRoutes = [
  { path: "/dashboard/manage", component: Manage },
  { path: "/dashboard", component: Dashboard },
  // { path: "/discover", component: Discover },
  { path: "/logout", component: Dashboard },
  { path: "/auth", component: Auth },
  { path: "/login", component: Auth },
  { path: "/", component: Landing }
];

export default indexRoutes;
