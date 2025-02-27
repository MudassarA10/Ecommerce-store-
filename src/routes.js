// routes.js
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";

const routes = [
  {
    path: "/",
    element: Layout,
    children: [
      { path: "", element: Home },
      { path: "*", element: NotFound },
    ],
  },
];

export default routes;
