import React from 'react'
import { useParams } from 'react-router'

const SingleDetails = () => {

 const {id} = useParams()
 console.log('params',id);
 
  return (
    <div>SingleDetails</div>
  )
}

export default SingleDetails