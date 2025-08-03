import React from 'react'
import Nav from '../Pages/Nav'
import Banner from '../Pages/Banner'
import About from '../Pages/About'
import TopicCards from '../Pages/Cards'
import Count from '../Pages/Count'
import Keys from '../Pages/Keys'
import Contact from '../Pages/Contact'
import Footer from '../Pages/Footer'

const Home = () => {
  return (
    <div>
        <Nav />
        <Banner />
        <About />
        <TopicCards />
        <Count />
        <Keys />
        <Contact />
        <Footer />
    </div>
  )
}

export default Home