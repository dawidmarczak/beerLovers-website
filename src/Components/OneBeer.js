import React from 'react';
import {Grid,Modal, Header, Button, Icon, Divider} from 'semantic-ui-react';
import '../Styles/App.css';

class OneBeer extends React.Component {

    state={openDetails: false}

    addToFavourites = () => {

        this.props.beer.favourite = true;
        this.props.add(this.props.beer);
        this.props.resetIterator();

        this.setState({
            openDetails: false
        })
    }

    removeFromFavourites = () => {

        this.props.beer.favourite = false;
        this.props.remove(this.props.beer);
        this.props.resetIterator();

        this.setState({
            openDetails: false
        })
    }
 
render() {
    return (
        <>

        <Grid.Row columns='4' textAlign='center' verticalAlign='top' >
            <Grid.Column width='6'>
                <p onClick={() => this.setState({openDetails: true})} className='beerColor detailsP'>{this.props.iterator}.{this.props.beer.name}</p>
            </Grid.Column>

            <Grid.Column width='6'>
                <p>{this.props.beer.tagline}</p>
            </Grid.Column>

             <Grid.Column width='2'>
                <p>{this.props.beer.abv}%</p>
            </Grid.Column>
        </Grid.Row>
        
        <Modal
        className='borderBeer'
        closeIcon
        open={this.state.openDetails}
        onClose={() => this.setState({openDetails: false})}
        onOpen={() => this.setState({openDetails: true})}
        >
       <Header as='h2'>
            <Icon name='beer' />
            <Header.Content>{this.props.beer.name}</Header.Content>
        </Header>

        <Modal.Content>
           
            <Grid>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                         <Divider className='beerColor width40 centerMargin' horizontal>Description</Divider>
                         <p className='black mt-1'>{this.props.beer.description}</p>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column textAlign='center'>
                         <Divider className='beerColor width40 centerMargin' horizontal>First brewed</Divider>
                         <p className='black mt-1'>{this.props.beer.first_brewed}</p>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Divider className='beerColor width40 centerMargin' horizontal>Hungry? Matching food </Divider>

                        {this.props.beer.food_pairing.map(food => {
                            return <p className='black mt-1'>{food}</p>
                        })}
                         
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Modal.Content>
        <Modal.Actions>

            {this.props.beer.favourite == true ? (

                    <Button color='red' onClick={this.removeFromFavourites}>
                        <Icon name='remove' /> Remove from favourites
                    </Button>

            ) : (
                    <Button color='yellow' onClick={this.addToFavourites}>
                          <Icon name='checkmark' /> Add to favourites
                    </Button>
            )}

      </Modal.Actions>
      </Modal>
        
        </>
    )}

}

export default OneBeer;
