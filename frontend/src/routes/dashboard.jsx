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
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Logout from "views/Logout/Logout.jsx";
import Connect from "views/Connect/Connect.jsx";
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
  
    {
      path: "/dashboard/connect",
      sidebarName: "Add Subscription",
      navbarName: "Subscribe",
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
