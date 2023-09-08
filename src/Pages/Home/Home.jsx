import React from 'react'
import "./Home.css"
import { Hero, Demo, Footer } from '../../Components'

const Home = () => {
  return (
    <div className="home_main_container">
      <Hero />
      <Demo />
      <Footer/>
    </div>
  )
}

export default Home
