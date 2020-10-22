import React from 'react';
import '../Styles/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from './HomePage'
import NavBar from './Navbar'
import FavouritesPage from './FavouritesPage'

class Main extends React.Component {

    state={favourites: [], empty: true}

    add = (beer) => {

        let favouritesNow = this.state.favourites;

        if(!favouritesNow.some(favourite => favourite == beer)) {

            favouritesNow.push(beer);

            this.setState({
                 favourites: favouritesNow,
                 empty: false
             })}
    }

    remove = (beer) => {

        let favouritesNow = this.state.favourites;
        let index = favouritesNow.indexOf(beer);
        let empty = false;

        favouritesNow.splice(index,1);
        
        if(favouritesNow.length == 0) {
            empty = true;
        }

        this.setState({
            favourites: favouritesNow,
            empty: empty
        })
    }

render() {
    return (

        <Router>
            
            <NavBar />

            <Switch>

            <Route exact path='/'> 
                <HomePage remove={this.remove} add={this.add} />
            </Route>

            <Route exact path='/favourites'> 
                <FavouritesPage remove={this.remove} empty={this.state.empty} favouritesBeers={this.state.favourites} />
            </Route>


            </Switch>
        </Router>
    )}
}

export default Main;
