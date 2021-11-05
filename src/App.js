import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Appointment from './Pages/Appointment/Appointment';
import Login from '../src/Pages/Login/Login/Login'
import SiggnUp from './Pages/Login/SignUp/SiggnUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route  path="/appointment">
             <Appointment></Appointment>
          </Route>
          <Route exact path="/">
              <Home></Home>
          </Route>
          <Route  path="/home">
              <Home></Home>
          </Route>
          <Route  path="/login">
            <Login></Login>
          </Route>
          <Route  path="/signup">
           <SiggnUp></SiggnUp>
          </Route>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
