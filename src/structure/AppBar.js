import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from './Menu';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from '../Firebase';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BudgetPage from "../budget/BudgetPage";
import TransactionPage from "../transactions/TransactionPage";
import TransactionDetail from "../transactions/TransactionDetail";
import OverviewPage from "../overview/OverviewPage";
import PlanPage from "../plan/PlanPage";
import {Redirect} from 'react-router';
import Login from "../overview/Login";
import { createBrowserHistory } from "history";


const PUBLIC_URL = process.env.PUBLIC_URL || "";
const history = createBrowserHistory();

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

class ButtonAppBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user});
      console.log("user", user)
    })
  };

  onSignOut = () => {
    firebase.auth().signOut().then(history.push("/login"));
  };



  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false,
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.querySelector('span.firebaseui-idp-text').innerText = 'Log in';
      }
    },
  };

  render() {
    return (
      <Router history={history} basename={PUBLIC_URL}>
        <div className={this.props.classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
                <Menu/>
              </IconButton>
              <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
                The Paper Guy
              </Typography>
              {this.state.isSignedIn ?
                <div className={this.props.classes.avatarDiv}>
                  <img alt="avatar" className={this.props.classes.avatar} src={firebase.auth().currentUser.photoURL}/>
                  <Button color="inherit" onClick={this.onSignOut}>Logout</Button>
                </div>
                :
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
              }
            </Toolbar>
          </AppBar>
        </div>
        <div className="App">
          <Route exact path="/" render={() => (this.state.isSignedIn ? <Redirect to='/overview'/> : <Redirect to='/login'/>)}/>
          <Route exact path="/transactions" component={TransactionPage}/>
          <Route exact path="/budget" component={BudgetPage}/>
          <Route exact path="/plan" component={PlanPage}/>
          <Route exact path="/overview" component={OverviewPage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/transactions/:id" component={TransactionDetail}/>
        </div>
      </Router>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
