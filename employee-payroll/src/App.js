import Toolbar from './components/header/header.jsx'
import Home from './components/home/home.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
import './App.css';
import PayrollForm from './components/payroll-form/payroll-form.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/payroll-form">
            <PayrollForm />
          </Route>
          <Route exact path="/payroll-form/:id">
            <PayrollForm />
          </Route>
          <Route exact path="">
            <Redirect exact from="/" to="/home" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
