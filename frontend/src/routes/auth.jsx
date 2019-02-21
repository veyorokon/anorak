// @material-ui/icons
import ArrowForward from "@material-ui/icons/ArrowForward";
import Login from "views/Login/Login.jsx";

const authRoutes = [
  
  {
    path: "/auth/login",
    sidebarName: "Login",
    icon: ArrowForward,
    component: Login
  },  
  { redirect: true, path: "/auth", to: "/auth/login", navbarName: "Anorak" },

];

export default authRoutes;
