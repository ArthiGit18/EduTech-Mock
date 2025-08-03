import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Nav = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLoginOpen = () => setLoginOpen(true);
    const handleLoginClose = () => setLoginOpen(false);

    const handleSignupOpen = () => setSignupOpen(true);
    const handleSignupClose = () => setSignupOpen(false);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://edutech-backend-znpm.onrender.com/api/auth/login', loginData);
            const token = res.data.token;
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userData = { username: payload.username };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            alert(res.data.message || "Login Successful!");
            handleLoginClose();
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed");
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://edutech-backend-znpm.onrender.com/api/auth/signup', signupData);
            const token = res.data.token;
            const userData = res.data.user;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            alert("Signup Successful!");
            handleSignupClose();
        } catch (err) {
            alert(err.response?.data?.message || "Signup Failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className='nav_wrapper'>
            <div className='container'>
                <nav className='nav_items'>
                    <div className='nav_logo'>
                        <NavLink to='/'><img src="./eduTechB1.png" alt="logo" /></NavLink>
                    </div>

                    {/* Hamburger Icon (only visible under 700px) */}
                    <div className="hamburger_icon" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <CloseIcon style={{ color: 'white', fontSize: 30 }} /> : <MenuIcon style={{ color: 'white', fontSize: 30 }} />}
                    </div>

                    <ul className={`nav_links ${menuOpen ? 'show_menu' : ''}`}>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about-us-our-team'>About</NavLink></li>
                        <li><NavLink to='/service'>Services</NavLink></li>
                        <li><NavLink to='/contact-us-our-team'>Contact</NavLink></li>
                    </ul>

                    {/* <ul className='nav_links'>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about-us-our-team'>About</NavLink></li>
                        <li><NavLink to='/service'>Services</NavLink></li>
                        <li><NavLink to='/contact-us-our-team'>Contact</NavLink></li>
                    </ul> */}

                    <div className='nav_buttons'>
                        {user ? (
                            <div className="user_avatar_section" style={{ position: 'relative' }}>
                                <div
                                    className="user_avatar"
                                    onClick={toggleDropdown}
                                    style={{
                                        backgroundColor: '#1976d2',
                                        color: '#fff',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {user.username.charAt(0).toUpperCase()}
                                </div>

                                {dropdownOpen && (
                                    <div className="dropdown_menu" style={{
                                        position: 'absolute',
                                        top: '50px',
                                        right: '0',
                                        backgroundColor: '#fff',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        width: '150px',
                                        zIndex: 10
                                    }}>
                                        <a
                                            href="/"
                                            style={{
                                                display: 'block',
                                                padding: '10px 20px',
                                                textDecoration: 'none',
                                                color: '#333',
                                                borderBottom: '1px solid #eee'
                                            }}
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Home
                                        </a>
                                        <button
                                            className='Logout_btn'
                                            onClick={handleLogout}
                                            style={{
                                                width: '100%',
                                                padding: '10px 20px',
                                                border: 'none',
                                                backgroundColor: 'transparent',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                color: '#333'
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button onClick={handleLoginOpen}>Login</button>
                                <button onClick={handleSignupOpen}>Sign Up</button>
                            </>
                        )}
                    </div>
                </nav>
            </div>

            {/* Login Dialog */}
            <BootstrapDialog
                onClose={handleLoginClose}
                aria-labelledby="login-dialog-title"
                open={loginOpen}
                PaperProps={{ className: 'dialog_box' }}
            >
                <DialogTitle id="login-dialog-title" className='dialog_title'>Login</DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleLoginSubmit}>
                        <label>Enter Username:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            value={loginData.username}
                            onChange={handleLoginChange}
                        />
                        <label>Enter Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />
                        <button type="submit">Login</button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoginClose}>Close</Button>
                </DialogActions>
            </BootstrapDialog>

            {/* Sign Up Dialog */}
            <BootstrapDialog
                onClose={handleSignupClose}
                aria-labelledby="signup-dialog-title"
                open={signupOpen}
                PaperProps={{ className: 'dialog_box' }}
            >
                <DialogTitle id="signup-dialog-title" className='dialog_title'>Sign Up</DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSignupSubmit}>
                        <label>Enter Username:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            value={signupData.username}
                            onChange={handleSignupChange}
                        />
                        <label>Enter Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={signupData.email}
                            onChange={handleSignupChange}
                        />
                        <label>Enter Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={signupData.password}
                            onChange={handleSignupChange}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSignupClose}>Close</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default Nav;
