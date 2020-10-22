import React from 'react';
import {Grid, Header, Segment, Divider} from 'semantic-ui-react';
import '../Styles/App.css';
import OneBeer from './OneBeer'
import BeerLoader from '../Loaders/BeerLoader'

class FavouritesPage extends React.Component {

    state = {iterator: 0, loading: true}

    resetIterator = () => {
        this.setState({
            iterator:0
        })
    }

    componentDidMount = () => {

        setTimeout(()=> {
            this.setState({
                loading: false
            })
        },2000)
    }

render() {
    return (

        <>
            {this.state.loading == true ? (

                    <BeerLoader />
            ) : (
        
          <Segment className='width40 ml-1 transparent'>
              
                <Grid className='width40'>

                <Grid.Row className='mt-1'>
                    <Grid.Column textAlign='center'>
                        <Header horizontal className='white size-15 up'> Here are your favourites beers</Header>
                        <Divider></Divider>
                   </Grid.Column>
                 </Grid.Row>


              {this.props.empty == true ? (
             
            <Grid.Row>
                <Grid.Column textAlign='center'>
                     <Header className='beerColor'>You didn't pick any favorite beer. Go to the home page and find your loved one!</Header>
                 </Grid.Column>
            </Grid.Row>

              ): (

                <>
               <Grid.Row columns='4' textAlign='center'>
                            <Grid.Column width='6'>
                               <Header className='up beerColor'>Name</Header> 
                             </Grid.Column>

                             <Grid.Column width='6'>
                                 <Header className='up beerColor'>Tagline</Header>
                              </Grid.Column>

                             <Grid.Column width='2'>
                                 <Header className='up beerColor'>%</Header>
                             </Grid.Column>
                        </Grid.Row>
                <Divider className='mt-0'></Divider>

                {this.props.favouritesBeers.map(beer => {
                    this.state.iterator++;
                    return <OneBeer resetIterator={this.resetIterator} remove={this.props.remove} iterator={this.state.iterator} beer={beer} />
                 })}

                 </>
              )}

                 <Divider></Divider>  
            </Grid>  
          </Segment>
          )}
        </>
    )
}}

export default FavouritesPage;
