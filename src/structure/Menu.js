import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {Link} from "react-router-dom";


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
  }
};

class Menu extends React.Component {
  state = {
    sideMenu: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      sideMenu: open,
    });
  };

  render() {
    const {classes} = this.props;

    const menus = [
      {name: 'Overview', icon: <HomeIcon/>, url: '/'},
      {name: 'Transactions', icon: <AttachMoneyIcon/>, url: '/transactions/'},
      {name: 'Budget', icon: <AssessmentIcon/>, url: '/budget/'},
      {name: 'Plan', icon: <AddBoxIcon/>, url: '/plan/'},
      // {name: , icon: , url: }
    ];

    const sideList = (
      <div className={classes.list}>
        <List>
          {menus.map((menu) => (
            <Link key={menu.url} to={menu.url} className={classes.link} cost>
              <ListItem button key={menu.name}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.name}/>
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <MenuIcon onClick={this.toggleDrawer(true)}>Open Left</MenuIcon>
        <Drawer open={this.state.sideMenu} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);