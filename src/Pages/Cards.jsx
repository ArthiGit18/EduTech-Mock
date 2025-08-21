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
        path: '/instruction-over-test/HTML',
        img: './assets/icons/html/1.png',
        title: "HTML Mock Test",
        description:
            "Check your knowledge of HTML basics and semantic tags. Perfect for beginners to practice structure and elements.",
    },
    {
        id: 2,
        path: '/instruction-over-test/CSS',
        img: './assets/icons/html/2.png',
        title: "CSS Mock Test",
        description:
            "Test your CSS skills including selectors, layouts, and responsive design. Sharpen your styling knowledge.",
    },
    {
        id: 3,
        path: '/instruction-over-test/JAVASCRIPT',
        img: './assets/icons/html/3.png',
        title: "JavaScript Mock Test",
        description:
            "Challenge yourself with JS concepts like variables, functions, and DOM. Great for improving problem-solving skills.",

    },
   
    {
        id: 4,
        path: '/instruction-over-test/REACT',
        img: './assets/icons/html/4.png',
        title: "React Mock Test",
        description:
            "Evaluate your React skills including hooks, components, and props. Ideal for frontend developers preparing interviews.",

    }
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
                        <div className='card' key={topic.id} onClick={() => handleCardClick(topic.path)}>
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
