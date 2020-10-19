import React from 'react';
// import Nav from './Components/Nav/Nav';
import routes from './routes';
import { connect } from 'react-redux';
import './App.css';

function App(props) {
  return (
    <div className="App">
      {/* <Nav /> */}
      {routes}
    </div>
  );
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(App);
