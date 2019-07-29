// @material-ui/icons

import Home from "views/Home/Home";

// {
//   path: "/dashboard",
//   name: "Dashboard",
//   rtlName: "لوحة القيادة",
//   icon: Dashboard,
//   component: DashboardPage,
//   layout: "/admin"
// },
//
const homeRoutes = [
  {
    path: "/",
    name: "Landing",
    rtlName: "Landing",
    icon: null,
    component: Home,
    layout: "/"
  }
];

export default homeRoutes;
