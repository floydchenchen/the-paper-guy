import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import AppBar from './structure/AppBar';
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
