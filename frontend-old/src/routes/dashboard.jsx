// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AddBox from "@material-ui/icons/AddBox";
import Receipt from "@material-ui/icons/Receipt";

// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Mail from "@material-ui/icons/Mail";

// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Logout from "views/Logout/Logout.jsx";
import Connect from "views/Connect/Connect.jsx";
import Add from "views/Add/Add.jsx";
import Invites from "views/Invites/Invites.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard/home",
    sidebarName: "Dashboard",
    navbarName: "Subscription Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  // {
  //       path: "/dashboard/discover",
  //       sidebarName: "Discover",
  //       navbarName: "Discover Subscriptions",
  //       icon: Dashboard,
  //       component: Discover
  //   },
  {
    path: "/dashboard/invites",
    sidebarName: "Invites",
    navbarName: "Invites",
    icon: Mail,
    component: Invites
  },
  {
    path: "/dashboard/add",
    sidebarName: "Add Account",
    navbarName: "Add Account",
    icon: AddBox,
    component: Add
  },
  {
    path: "/dashboard/connect",
    sidebarName: "Connect",
    navbarName: "Connect",
    icon: AddBox,
    component: Connect
  },
  {
    path: "/dashboard/user",
    sidebarName: "Account",
    navbarName: "Account",
    icon: Person,
    component: UserProfile
  },
  // {
  //   path: "/dashboard/invoices",
  //   sidebarName: "Invoices",
  //   navbarName: "Invoices",
  //   icon: Receipt,
  //   component: InvoiceList
  // },
  {
    path: "/dashboard/logout",
    sidebarName: "Logout",
    navbarName: "Logout",
    icon: ExitToApp,
    component: Logout
  }
];

export default dashboardRoutes;
