import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useAuthModal } from '../context/AuthModalContext';

const topics = [
    {
        id: 1,
        title: 'Common Interview Questions',
        path: '/instruction-over-test',
        img: './assets/icons/html/3.png',
        description:
            'Frequently asked questions across technical interviews including HR, aptitude, and behavioral rounds.'
    },
    {
        id: 2,
        title: 'React - JavaScript Library',
        path: '/instruction-over-test',
        img: './assets/icons/html/2.png',
        description:
            'React is a JavaScript library for building user interfaces using components and managing application state efficiently.'
    },
    {
        id: 3,
        title: 'Node.js - Backend JavaScript',
        path: '/instruction-over-test',
        img: './assets/icons/html/1.png',
        description:
            'Node.js is a runtime environment that allows you to run JavaScript on the server, build APIs, and create scalable backend systems.'
    },
    {
        id: 4,
        title: 'HTML - HyperText Markup Language',
        path: '/instruction-over-test',
        img: './assets/icons/html/4.png',
        description:
            'HTML is the standard markup language used to create the structure of web pages. It defines elements like headings, paragraphs, images, and links.'
    },
    // {
    //     id: 5,
    //     title: 'CSS - Cascading Style Sheets',
    //     path: '/css-questions',
    //     img: './assets/icons/css/1.png',
    //     description:
    //         'CSS is used to style HTML elements, control layout, colors, fonts, responsiveness, and overall appearance of a website.'
    // }
];
const MAX_LENGTH = 60;
const TopicCards = () => {
    const faqContainerRef = useRef(null);
    const navigate = useNavigate();
    const [loginPromptOpen, setLoginPromptOpen] = useState(false);
    const { openSignup } = useAuthModal();

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
            setLoginPromptOpen(true);
            openSignup();
        }
    };

    const handleLoginRedirect = () => {
        setLoginPromptOpen(false);
        // Redirect or open login dialog based on your Nav component
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    return (
        <div className='cards_wrapper'>
            <div className='container'>
                <h2>Our service</h2>
                <div className='cards' ref={faqContainerRef}>
                    {topics.map((topic) => (
                        <div className='card' key={topic.id} onClick={() => handleCardClick(`{topic.path}`)}>
                            {/* <NavLink to={topic.path}> */}
                                <div className='card_img'>
                                    <img src={topic.img} alt={`${topic.title} Icon`} />
                                </div>
                            {/* </NavLink> */}
                            <h2>{topic.title}</h2>
                            <p>{topic.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog
                open={loginPromptOpen}
                onClose={() => setLoginPromptOpen(false)}
                className="custom_dialog"
                PaperProps={{
                    style: {
                        borderRadius: '16px',
                        padding: '20px',
                        maxWidth: '90%',
                        width: '400px',
                    },
                }}
            >
                <DialogTitle>Please login or sign up to continue</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setLoginPromptOpen(false)}>Cancel</Button>
                    <Button onClick={handleLoginRedirect} autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default TopicCards;
