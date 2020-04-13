import React from 'react';
import logo from './logo.svg';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import ApprovalTable from './components/adminApproval.js'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/admin">
            <ApprovalTable/>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/submit">
            <SignIn />
          </Route>
          <Route path="/">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}





