import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Account from './Components/Account/Account';
import CreateListing from './Components/CreateListing/CreateListing'
// import Dashboard from './Components/Dashboard/Dashboard';
import Homepage from './Components/Homepage/Homepage';
import Listings from './Components/Listings/Listings';

export default (
    <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/account/:userid" component={Account} />
        <Route path="/createlisting" component={CreateListing}/>
        {/* <Route path="/dashboard" component={Dashboard}/> */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
         <Route path="/listing/:listing_id" component={Listings}/>
        {/* <Route path="/listing/create" component={}/> */}
    </Switch>
)
