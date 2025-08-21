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

                        <div className='card' onClick={() => handleCardClick("/instruction-over-test/HTML")}>
                            <div className='card_img'>
                                <img src='./assets/icons/html/1.png' alt='HTML Icon' />
                            </div>
                            <h2>HTML Mock Test</h2>
                            <p>
                                Check your knowledge of HTML basics and semantic tags. Perfect for beginners to practice structure and elements.
                            </p>
                        </div>

                        <div className='card' onClick={() => handleCardClick("/instruction-over-test/CSS")}>
                            <div className='card_img'>
                                <img src='./assets/icons/html/2.png' alt='CSS Icon' />
                            </div>
                            <h2>CSS Mock Test</h2>
                            <p>
                                Test your CSS skills including selectors, layouts, and responsive design. Sharpen your styling knowledge.
                            </p>
                        </div>

                        <div className='card' onClick={() => handleCardClick("/instruction-over-test/JAVASCRIPT")}>
                            <div className='card_img'>
                                <img src='./assets/icons/html/3.png' alt='JavaScript Icon' />
                            </div>
                            <h2>JavaScript Mock Test</h2>
                            <p>
                                Challenge yourself with JS concepts like variables, functions, and DOM. Great for improving problem-solving skills.
                            </p>
                        </div>

                        <div className='card' onClick={() => handleCardClick("/instruction-over-test/REACT")}>
                            <div className='card_img'>
                                <img src='./assets/icons/html/4.png' alt='FAQs Icon' />
                            </div>
                            <h2>React Mock Test</h2>
                            <p>
                                Evaluate your React skills including hooks, components, and props. Ideal for frontend developers preparing interviews.
                            </p>
                        </div>

                        <div className='card' onClick={() => handleCardClick("/instruction-over-test/NODE JS")}>
                            <div className='card_img'>
                                <img src='./assets/icons/html/5.png' alt='Number Programming Icon' />
                            </div>
                            <h2>Node.js Mock Test</h2>
                            <p>
                                Test your backend knowledge with Node.js concepts like APIs, middleware, and modules. Strengthen your server-side skills.
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
