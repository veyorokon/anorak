// @material-ui/icons

import LibraryBooks from "@material-ui/icons/LibraryBooks";

import Discover from "views/Discover/Discover.jsx";

const discoverRoutes = [

  {
        path: "/discover",
        sidebarName: "Discover",
        navbarName: "Discover Subscriptions",
        icon: LibraryBooks,
        component: Discover
    }, 
  
  
];

export default discoverRoutes;
