import React from 'react';
import logo from './logo.svg';
import SignIn from './components/SignIn.js';
import AdminSignIn from './components/adminSignIn.js';
import SignUp from './components/SignUp.js';
import ResetPassword from './components/resetPassword.js';
import SignUpForm from './components/SignUpForm.js';
import ApprovalApp from './components/adminApproval.js';
import ProductList from './components/ProductList/ProductList.js'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



export default function App() {
  React.useEffect(() => {
    document.title = 'HeathBlocks'
  });
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/adminDashboard">
            <ApprovalApp/>
          </Route>
          <Route path="/admin">
            <AdminSignIn/>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signupform">
            <SignUpForm />
          </Route>
          <Route path="/dashboard">
            <SignIn />
          </Route>
          <Route path="/resetPassword">
            <ResetPassword />
          </Route>
          <Route path="/">
          <ProductList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}





