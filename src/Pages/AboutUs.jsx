import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

const AboutUs = () => {
    return (
        <>
            <Nav />
            <div className='AboutUs_wrapper'>
                <div className='About_myself'>
                    <div className='aboutus_img'>
                        <img src="./assets/aboutUs/5.png" alt="My-image-as- anime" />
                    </div>
                    <div className='abutous_my_content'>
                        <h2>Welcome to EduTech!</h2>
                        <p>I'm Arthi A, a passionate web developer and tech enthusiast who believes that web technology is one of the most important and exciting fields to explore. From building dynamic websites to understanding how the internet works, every part of this journey has inspired me.<br></br> <br></br>

                            I created EduTech as a space to make learning web development simpler, clearer, and more fun. Whether you're just getting started or brushing up on your skills, my goal is to provide resources, tips, and explanations that actually help.<br></br>

                            Learning doesn't have to be overwhelming. With the right guidance and examples, anyone can master the web.<br></br>
                            Let’s explore, build, and grow together—one line of code at a time.</p>
                    </div>
                </div>

                <h2>Our Team</h2>
                <div className='aboutus_content'>
                    <div className='card1'>
                        <img src="./assets/aboutUs/2.png" alt="partner1" />
                        <div className='partner_content'>
                            <h2>Hellen</h2>
                            <p>Frontend Developer with a passion for UI/UX and modern web technologies.<br></br>
                                Built EduTech to make learning web development fun and accessible for everyone.

                            </p>
                        </div>
                    </div>
                    <div className='card1'>
                        <img src="./assets/aboutUs/3.png" alt="partner1" />
                        <div className='partner_content'>
                            <h2>Miller</h2>
                            <p>Full Stack Developer skilled in MERN stack and API integration.<br></br>
                                Always exploring smarter ways to build scalable web applications.</p>
                        </div>
                    </div>
                    <div className='card1'>
                        <img src="./assets/aboutUs/4.png" alt="partner1" />
                        <div className='partner_content'>
                            <h2>ARon</h2>
                            <p>Creative Designer focused on intuitive layouts and responsive design.<br></br>
                                Brings life to ideas with clean visuals and engaging user interfaces.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs