import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Link} from "react-router-dom";
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = {
  link: {
    textDecoration: 'none',
  },
  firstDiv: {
    width: '25%',
  },
  secondDiv: {
    width: '60%',
  },
  thirdDiv: {
    width: '15%',
  },
  listItem: {
    background: '#eeeeee',
    marginBottom: '-1%'
  },
  debit: {
    color: "#4caf50"
  },
  credit: {
    color: "#ff3d00"
  }
};

class TransactionItem extends Component {


  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {classes} = this.props;

    return (
      <List>
        <Link key={this.props.itemId} to={"/transactions/" + this.props.itemId} className={classes.link}>
          <ListItem className={classes.listItem}>
            <ListItemText className={classes.firstDiv}
                          primary={this.props.date}
            />
            <ListItemText className={classes.secondDiv}
                          primary={this.props.title}
                          secondary={this.props.category}
            />
            <ListItemText
              className={classes.thirdDiv}
              primary={
                <Typography
                  className={this.props.credit ? classes.credit : classes.debit}>
                  {this.props.credit ? "-" + this.props.price : "+" + this.props.price}
                </Typography>}
            />
          </ListItem>
        </Link>
      </List>
    );
  }
}

TransactionItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionItem);