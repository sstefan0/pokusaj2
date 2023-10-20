import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";

import SignIn from "./pages/Autentifikacija/Login/login";
import SignUp from "./pages/Autentifikacija/Register/register";
import SwipeableTextMobileStepper from "./pages/Home/homepage";
import Home from "./pages/Home/homepage";
import Products from "./pages/Products/products-page";
import Profil from "./pages/Profil/profil";
import Mapa from "./pages/Mapa/map-page";
export const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/products",
        element: <Products />,
      },{
        path: "/maps",
        element: <Mapa />,
      },
      {
        path: "/profile",
        element: <Profil />,
      },
    ],
  },
]);
