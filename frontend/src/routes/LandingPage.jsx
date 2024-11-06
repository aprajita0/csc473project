import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div className='LandingPage mt-28 flex flex-col flex-grow justify-between min-h-screen'>
      <Navbar />
      LandingPage/Home
      <Footer />
    </div>
  )
}

export default LandingPage