import React from 'react';
import Header from './Components/Header/Header';
import routes from './routes';
import { connect } from 'react-redux';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <Header />
      <div className="routes">
        {routes}
      </div>
    </div>
  );
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(App);
