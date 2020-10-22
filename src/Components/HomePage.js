import React from 'react';
import {Grid, Header, Segment, Divider, Button} from 'semantic-ui-react';
import '../Styles/App.css';
import axios from 'axios'
import OneBeer from './OneBeer'

class HomePage extends React.Component {

    state = {beers: [], iterator: 0, pagesUsed: [], successApi: false, noMore: <></>}

    componentDidMount = () => {

        // Pobierając 10 elementów mozemy wyszukiwac piwa na 33 stronach (5 z ostatniej)
        let page = Math.floor((Math.random() * 33) +1)
        let pages = this.state.pagesUsed;
        pages.push(page);
        
        axios.get('https://api.punkapi.com/v2/beers?per_page=10&page='+page)
        .then(response => {

            this.setState({
                beers:response.data,
                pagesUsed: pages,
                successApi: true
            })
        })

        .catch(error => {
            
            this.setState({
                successApi: false
            })
            console.log(error.response);
            return error.response;
        }) 
    }

    showMore = () => {
       
        let founded = false;

        do {
        //Pobranie kolejnych elementów z innej strony
        let newPage = Math.floor((Math.random() * 33) +1).toString();
        let pages = this.state.pagesUsed;

        if(!pages.some(page => page==newPage)) {

        founded = true;
        pages.push(newPage);

        axios.get('https://api.punkapi.com/v2/beers?per_page=10&page='+newPage)
        .then(response => {

            let beersNow = this.state.beers;
            let beersNew = response.data;
            let newBeers = beersNow.concat(beersNew);

            this.setState({
                beers: newBeers,
                iterator: 0,
                pagesUsed:pages
            })
        })
        .catch(error => {

            let messageNoMore = <Header className='beerColor'>There was an unexpected problem with the server. The data could not be retrieved. Please try again later.</Header> 

            this.setState({
                noMore: messageNoMore
            })

        })  

    }} while(founded!=true)

}

    resetIterator = () => {
        this.setState({
            iterator:0
        })}


render() {
    return (

          <Segment className='ml-1 transparent'>

            <Grid className='width40'>

                <Grid.Row className='mt-1'>
                    <Grid.Column textAlign='center'>
                        <Header horizontal className='white size-15 up'> Discover beers from all over the world</Header>
                        <Divider></Divider>
                   </Grid.Column>
                 </Grid.Row>

                {this.state.successApi == true ? (

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

                         {this.state.beers.map(beer => {
                          this.state.iterator++;
                          return <OneBeer resetIterator={this.resetIterator} add={this.props.add} remove={this.props.remove} iterator={this.state.iterator} beer={beer} />
                         })}

                          <Divider></Divider>

                        <Grid.Row>
                           <Grid.Column textAlign='center'>
                              <Header className='up white'>Click on name for more details and add to your favourites</Header>
                           </Grid.Column>
                        </Grid.Row>

                         <Grid.Row>
                           <Grid.Column textAlign='center' className='width60p centerMargin'>
                             <Button onClick={this.showMore} className='up buttonMore' color='yellow' basic circular fluid>Show more beers</Button>
                                 </Grid.Column>
                        </Grid.Row>
                        
                        {/* Jeśli blad przy pobieraniu kolejnych piw */}
                        <Grid.Row>
                           <Grid.Column textAlign='center'>
                              {this.state.noMore}
                           </Grid.Column>
                        </Grid.Row>

                     </>

                      ) : (
                         <>
                    
                            <Grid.Row textAlign='center'>
                                 <Grid.Column>
                                     <Header className='beerColor'>There was an unexpected problem with the server. The data could not be retrieved. Please try again later.</Header> 
                                  </Grid.Column>
                            </Grid.Row>

                         </>
                      )} 

                
            </Grid>    
          </Segment>
    )
}}

export default HomePage;
