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

// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Logout from "views/Logout/Logout.jsx";
import Connect from "views/Connect/Connect.jsx";
import Create from "views/Create/Create.jsx";
import Discover from "views/Discover/Discover.jsx";
import Manage from "views/Manage/Manage.jsx";
import InvoiceList from "views/Invoice/Invoice.jsx";

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
      path: "/dashboard/create",
      sidebarName: "Subscribe",
      navbarName: "Subscribe",
      icon: AddBox,
      component: Create
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
