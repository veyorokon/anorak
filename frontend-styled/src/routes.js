// @material-ui/icons
import BubbleChart from "@material-ui/icons/BubbleChart";

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
    icon: BubbleChart,
    component: Home,
    layout: "/"
  }
];

export default homeRoutes;
