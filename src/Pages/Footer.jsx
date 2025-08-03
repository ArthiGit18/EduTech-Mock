import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="edu-footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <img src="./eduTechB1.png" alt="Logo-image" />
                    <h2>Edu<span>Tech</span></h2>
                    <p>Empowering learners with technology-driven education.</p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><NavLink to="/service">Courses</NavLink></li>
                        <li><NavLink to="/about-us-our-team">About Us</NavLink></li>
                        <li><NavLink to="/service">Blogs</NavLink></li>
                        <li><NavLink to="/contact-us-our-team">Contact</NavLink></li>
                    </ul>
                </div>

                <div className='footer-links'>
                    <h3>Our Course</h3>
                    <ul>
                        <li><NavLink to="/service">HTML</NavLink></li>
                        <li><NavLink to="/service">CSS</NavLink></li>
                        <li><NavLink to="/service">JAVASCRIPT</NavLink></li>
                        <li><NavLink to="/service">FAQS</NavLink></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p>📧 arthiar180.com</p>
                    <p>📍 Chennai, Tamil Nadu</p>
                    <p>📞 +91 6379424101</p>
                </div>

                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <NavLink to="/"><i className="fab fa-facebook-f"></i></NavLink>
                        <NavLink to="/"><i className="fab fa-instagram"></i></NavLink>
                        <NavLink to="/"><i className="fab fa-linkedin-in"></i></NavLink>
                        <NavLink to="/"><i className="fab fa-twitter"></i></NavLink>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 EduTech. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer