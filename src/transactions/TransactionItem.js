import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Link} from "react-router-dom";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

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
                  {this.props.credit ? this.props.price : "+" + this.props.price}
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