import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import AppBar from './structure/AppBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Redirect} from 'react-router';
import OverviewPage from './overview/OverviewPage';
import PlanPage from './plan/PlanPage';
import TransactionPage from './transactions/TransactionPage';
import BudgetPage from './budget/BudgetPage';
import Login from './overview/Login';
import {withStyles} from "@material-ui/core/styles/index";

const PUBLIC_URL = process.env.PUBLIC_URL || "";


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatarDiv: {
    height: '6vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: '100%',
    paddingRight: '3%'
  }
};

class App extends Component {


  render() {
    return (
        <div className="App">
          <AppBar />
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App);
