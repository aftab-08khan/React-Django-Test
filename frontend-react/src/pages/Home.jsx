import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div className=' h-screen bg-gray-200 flex items-center justify-center'>
    <Link to={'/dashboard'}>Dashboard</Link>
    </div>
  )
}

export default Home