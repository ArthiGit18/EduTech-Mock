import React, { useRef, useEffect } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Service = () => {
    const MAX_LENGTH = 60;
    const faqContainerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const paragraphs = faqContainerRef.current.querySelectorAll('p');
        paragraphs.forEach(p => {
            if (p.textContent.length > MAX_LENGTH) {
                p.textContent = p.textContent.slice(0, MAX_LENGTH) + '...';
            }
        });
    }, []);

    const handleCardClick = (path) => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate(path);
        } else {
            alert("Please login or sign up to continue");
            // Optionally, scroll to top or open a login modal
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <Nav />
            <div className='service_wrapper'>
                <div className='container'>
                    <h2>Our Services</h2>
                    <div className='cards' ref={faqContainerRef}>

                        <div className='card' onClick={() => handleCardClick("/instruction-over-test")}>
                            <div className='card_img'>
                                <img src='./assets/icons/html/1.png' alt='HTML Icon' />
                            </div>
                            <h2>HTML - HyperText Markup Language</h2>
                            <p>
                                HTML is the standard markup language used to create the structure of web pages. It defines elements like headings, paragraphs, images, and links.
                            </p>
                        </div>

                        <div className='card' onClick={() => handleCardClick("/instruction-over-test")}>
                            <div className='card_img'>
                                <img src='./assets/icons/html/2.png' alt='CSS Icon' />
                            </div>
                            <h2>CSS - Cascading Style Sheets</h2>
                            <p>
                                CSS is used to style and layout web pages — for example, to change fonts, colors, spacing, and responsiveness.
                            </p>
                        </div>

                        <div className='card' onClick={() => handleCardClick("/instruction-over-test")}>
                            <div className='card_img'>
                                <img src='./assets/icons/html/3.png' alt='JavaScript Icon' />
                            </div>
                            <h2>JavaScript</h2>
                            <p>
                                JavaScript is a programming language that adds interactivity to websites, such as form validations, button clicks, animations, and dynamic content.
                            </p>
                        </div>

                        <div className='card' onClick={() => handleCardClick("/instruction-over-test")}>
                            <div className='card_img'>
                                <img src='./assets/icons/html/5.png' alt='FAQs Icon' />
                            </div>
                            <h2>FAQs</h2>
                            <p>
                                Important FAQs for HTML, CSS, JAVASCRIPT, React JS
                            </p>
                        </div>

                        <div className='card' onClick={() => handleCardClick("/instruction-over-test")}>
                            <div className='card_img'>
                                <img src='./assets/icons/html/6.png' alt='Number Programming Icon' />
                            </div>
                            <h2>Number Programming</h2>
                            <p>
                                Important Concepts on Number Programming for Javascript and Java
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Service;
