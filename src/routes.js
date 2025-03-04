// routes.js
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import About from "./Pages/About";
import Contact from "./Pages/Contact";


const routes = [
  {
    path: "/",
    element: Layout,
    children: [
      { path: "", element: Home },
      { path: "*", element: NotFound },
      { path: "about", element: About },
      { path: "contact", element: Contact },


    ],
  },
];

export default routes;
