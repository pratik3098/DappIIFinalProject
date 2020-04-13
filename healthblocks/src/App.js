import React from 'react';
import logo from './logo.svg';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import SignUpForm from './components/SignUpForm.js';
import ApprovalApp from './components/adminApproval.js'
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
            <ApprovalApp/>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/submit">
            <SignIn />
          </Route>
          <Route path="/">
            <SignUpForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}





