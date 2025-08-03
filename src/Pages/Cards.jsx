import React, {useRef, useEffect} from 'react';
import { NavLink } from 'react-router-dom';

const topics = [
    {
        id: 1,
        title: 'Common Interview Questions',
        path: '/common-interview',
        img: './assets/icons/html/3.png',
        description:
            'Frequently asked questions across technical interviews including HR, aptitude, and behavioral rounds.'
    },
    {
        id: 2,
        title: 'React - JavaScript Library',
        path: '/react-questions',
        img: './assets/icons/html/2.png',
        description:
            'React is a JavaScript library for building user interfaces using components and managing application state efficiently.'
    },
    {
        id: 3,
        title: 'Node.js - Backend JavaScript',
        path: '/node-questions',
        img: './assets/icons/html/1.png',
        description:
            'Node.js is a runtime environment that allows you to run JavaScript on the server, build APIs, and create scalable backend systems.'
    },
    {
        id: 4,
        title: 'HTML - HyperText Markup Language',
        path: '/html-tags',
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

    useEffect(() => {
        const paragraphs = faqContainerRef.current.querySelectorAll('p');
        paragraphs.forEach(p => {
            if (p.textContent.length > MAX_LENGTH) {
                p.textContent = p.textContent.slice(0, MAX_LENGTH) + '...';
            }
        });
    }, []);
    return (
        <div className='cards_wrapper'>
            <div className='container'>
                <h2>Our service</h2>
                <div className='cards' ref={faqContainerRef}>
                    {topics.map((topic) => (
                        <div className='card' key={topic.id}>
                            <NavLink to={topic.path}>
                                <div className='card_img'>
                                    <img src={topic.img} alt={`${topic.title} Icon`} />
                                </div>
                            </NavLink>
                            <h2>{topic.title}</h2>
                            <p>{topic.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default TopicCards;
