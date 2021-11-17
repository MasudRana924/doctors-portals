import './App.css';
import * as React from "react";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Routes } from "react-router-dom"
import Home from './Pages/Home/Home';
import Appointment from './Pages/Appointment/Appointment';
import Login from '../src/Pages/Login/Login/Login'
import SiggnUp from './Pages/Login/SignUp/SiggnUp';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Payment from './Pages/DashBoard/Payment/Payment';
import MakeAdmin from './Pages/DashBoard/MakeAdmin/MakeAdmin';
import AdminRoute from './Pages/Login/AdminRoute/AdminRoute';
import AddDoctor from './Pages/DashBoard/AddDoctor/AddDoctor';
import DashBoardHome from './Pages/DashBoard/DashBoardHome/DashBoardHome';
import DashBoard from './Pages/DashBoard/DashBoard/DashBoard';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>

            <Route path="/home" element={<Home />}>
            </Route>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/register" element={<SiggnUp />}>
            </Route>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route path="/appointment" element={<PrivateRoute>
              <Appointment />
            </PrivateRoute>}>
            </Route>
            <Route path="/dashboard" element={<PrivateRoute>
              <DashBoard />
            </PrivateRoute>}>
              <Route exact path="/dashboard">
              
              </Route>
              <Route path={`/dashboard/payment/:appointmentId`} element={<Payment></Payment>}>

              </Route>
              <Route path={`/dashboard/makeAdmin`} element={<AdminRoute>
                <MakeAdmin></MakeAdmin>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/addDoctor`} element={<AdminRoute>
                <AddDoctor></AddDoctor>
              </AdminRoute>}>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
