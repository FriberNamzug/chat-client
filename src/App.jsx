import { Routes, Route } from "react-router-dom";

import axios from 'axios';

import { Fragment } from "react";

import {Toast} from './components/Toast'
import { RoutesDashboard } from "./components/RoutesDashboard";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";

import { PrivateRoute, PublicRoute } from "./components/PrivateRoutes";
import Mensaje from "./pages/Mensaje";

axios.defaults.baseURL = import.meta.env.VITE_RUTA_API;

function App() {

  return (
    <Fragment>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route index element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<RoutesDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="chat" element={<Chat />} />
            <Route path="mensaje/:idChat" element={<Mensaje />} />
          </Route>
        </Route>




      </Routes>
      <Toast />
    </Fragment>
  )
}

export default App
