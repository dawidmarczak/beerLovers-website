import React from 'react'
import Lottie from 'react-lottie'
import * as loading from './beerLoader.json'

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const BeerLoader = () => {

    return(

        <div className='width40p  mt-10'>
        <Lottie  options={defaultOptions} height={400} width={300}/>
        </div>
 
    )
}

export default BeerLoader