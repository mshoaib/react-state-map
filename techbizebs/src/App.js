import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './screens/Login';
import './App.css';
import 'react-table-6/react-table.css';
import API from './baseURL.js';
import Header from './screens/Header';
import MainContent from './screens/MainContent';
import POForm from './components/pms/PurchaseOrders/POForm';


import LandingPG from './screens/LandingPG';

import ProtectedRoute from './ProtectedRoute';
import { useSelector, useDispatch } from 'react-redux';
import { user_logout } from './actions/userActions.js';


function App() {
	const dispatch = useDispatch();
	 const { isLoggedIn } = useSelector(state => state.user);

	
  return (
    <div className="App">
      <Header />
      {/* <MainContent/> */}
      <Router>
        <Switch>
        	<Route path="/login" component={Login} />
          <ProtectedRoute authed={isLoggedIn} path="/landingPG" component={LandingPG} />
        	<ProtectedRoute authed={isLoggedIn} path="/maincontent" component={MainContent} />
          <ProtectedRoute authed={isLoggedIn} path="/purchaseOrder/:edit/:headerID" component={POForm} />
        
        	
          <Redirect exact to="login" from="/"/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
