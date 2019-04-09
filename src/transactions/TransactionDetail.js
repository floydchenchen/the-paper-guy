import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import firebase from '../Firebase';

const styles = {
  firstDiv: {
    width: '20%',
  },
  secondDiv: {
    width: '80%',
  },
  listItem: {
    paddingLeft: '10vw'
  },
  mainItemDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

class TransactionDetail extends Component {


  constructor(props) {
    super(props);
    this.state = {transaction: null};
    this.db = firebase.firestore().collection("react");
  }

  getPathId = (path) => path.split('/')[2];

  componentDidMount() {
    this.db.doc(this.getPathId(this.props.location.pathname)).onSnapshot((doc) => {
      const data = doc.data();
      this.setState({
        transaction: {
          amount: data.amount,
          category: data.category,
          date: data.date,
          title: data.title
        }
      });
    })
  }

  render() {
    const {classes} = this.props;

    return (
      (!this.state.transaction ? <div>loading</div> :
          (<div>
            <List>
              <div className={classes.mainItemDiv}>
                <Typography variant={"h6"}>{this.state.transaction.amount}</Typography>
                <Typography variant={"caption"}>{this.state.transaction.title}</Typography>
                <Typography variant={"caption"}>{this.state.transaction.date}</Typography>
              </div>
            </List>
            <List>
              <ListItem className={classes.listItem}>
                <ListItemText secondary={"Merchant"} className={classes.firstDiv}/>
                <ListItemText primary={this.state.transaction.title} className={classes.secondDiv}/>
              </ListItem>
            </List>
            <List>
              <ListItem className={classes.listItem}>
                <ListItemText secondary={"Date"} className={classes.firstDiv}/>
                <ListItemText primary={this.state.transaction.date} className={classes.secondDiv}/>
              </ListItem>
            </List>
            <List>
              <ListItem className={classes.listItem}>
                <ListItemText secondary={"Category"} className={classes.firstDiv}/>
                <ListItemText primary={this.state.transaction.category} className={classes.secondDiv}/>
              </ListItem>
            </List>
          </div>)
      )
    )
      ;
  }
}

TransactionDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionDetail);