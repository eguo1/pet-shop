'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { createLocalOrderServer } from '../store/order';

import { logout } from '../store/user'
import { Menu } from 'semantic-ui-react'

class Navbar extends Component {
  state = {}

  handleItemClick = (event, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const isLoggedIn = Object.keys(this.props.user).length > 0

    return (
      <Menu>
        <Menu.Item
          as={Link}
          name="nav-to-home"
          to="/"
          active={activeItem === 'home'}
          content="Pet Shop"
        />
        {
          (this.props.user.isAdmin) ?
            <Menu.Item
              as={Link}
              name="nav-to-newproduct"
              to="/newproduct"
              active={activeItem === 'newproduct'}
              content="New Product"
            /> : null
        }
        <Menu.Menu position="right">
          {
            isLoggedIn ? null :
              <Menu.Item
                as={Link}
                name="nav-to-login"
                to="/login"
                active={activeItem === 'login'}
                content="Login"
              />
          }
          {
            isLoggedIn ?
              <Menu.Item
                name="logout"
                active={activeItem === 'logout'}
                content="Logout"
                onClick={this.props.logout}
              />
              : <Menu.Item
                as={Link}
                name="nav-to-signup"
                to="/signup"
                active={activeItem === 'signup'}
                content="Sign Up"
              />
          }
          {
            isLoggedIn && (
              <Menu.Item
                as={Link}
                name="nav-to-profile"
                to="/profile"
                active={activeItem === 'profile'}
                content="My Profile"
              />
            )}
          <Menu.Item
            as={Link}
            name="nav-to-cart"
            to="/order"
            active={activeItem === 'home'}
            content={`Cart (${this.props.itemNum})`}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    itemNum: state.order.line_items.length,
    orderId: state.order.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout() {
      dispatch(logout())
      dispatch(createLocalOrderServer())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
