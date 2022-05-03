import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-circular-progressbar/dist/styles.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/coreui/dist/js/coreui.min.js';
import './App.css';
import Login from "./pages/Login";

import Customer from "./pages/Customer";
import Engineer from "./pages/Engineer";
import Admin from "./pages/Admin";

import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import Notfound from './components/Notfound';

const ROLES = {
  'CUSTOMER': 'CUSTOMER',
  'ADMIN': 'ADMIN',
  'ENGINEER': 'ENGINEER'
}


function App() {
  return (
      <Router>
        <Routes>
          
          <Route path="" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin" exact element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
            <Route path="/customer" element={<Customer />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
            <Route path="/engineer" element={<Engineer />} />
          </Route>
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </Router>
    
  );
}

export default App;
