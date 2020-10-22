import React from 'react';
import '../Styles/App.css';
import {Menu} from 'semantic-ui-react'
import { Link } from "react-router-dom";

class Navbar extends React.Component {
   
    state = { activeItem: 'Beers' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (

        <Menu fluid pointing secondary className='mb-1 h-4v mr-1 navbar'>
        
        <Link to='/'>
          <Menu.Item
            name='Beers'
            active={activeItem === 'Beers'}
            onClick={this.handleItemClick}
            className='navbar-item up size-2'
          />
          </Link>

          <Link to='/favourites'>
          <Menu.Item
            name='Favourites'
            active={activeItem === 'Favourites'}
            onClick={this.handleItemClick}
            className='navbar-item up size-2'
          />
          </Link>
          
        </Menu>
    )}
}
export default Navbar;
