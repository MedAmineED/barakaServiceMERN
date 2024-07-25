/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Acceuil from "../views/Accueil/Acceuil";
import ListeArticles from "../views/Articles/ListeArticles";
import ServiceList from "../views/servicesview/ServiceList";
import NavBarCmp from "../components/NavBarCmp";
import { useRoutes, RouteObject } from "react-router-dom";
import EmployeeList from "../views/employee/EmployeeList";

const Router: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <NavBarCmp />,
      children: [
        {
          path: "accueil",
          element: <Acceuil />,
        },
        {
          path: "listearticle",
          element: <ListeArticles />,
        },
        {
          path: "listeservice",
          element: <ServiceList />,
        },
        {
          path: "listeemployee",
          element: <EmployeeList />,
        },
      ],
    },
  ];

  return useRoutes(routes);
};

export default Router;
