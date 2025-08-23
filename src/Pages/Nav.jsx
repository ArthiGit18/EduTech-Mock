import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthModal } from '../context/AuthModalContext';
import CircularProgress from '@mui/material/CircularProgress';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Nav = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });



    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingSignup, setLoadingSignup] = useState(false);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });

    const {
        loginOpen,
        signupOpen,
        openLogin,
        closeLogin,
        openSignup,
        closeSignup,
    } = useAuthModal();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoadingLogin(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', loginData);
            const token = res.data.token;
            const userData = res.data.user; // ✅ full user object

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            alert("Login Successful!");
            closeLogin();
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed");
        } finally {
            setLoadingLogin(false);
        }
    };


    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setLoadingSignup(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', signupData);
            const token = res.data.token;
            const userData = res.data.user;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            alert(`Signup Successful! Your Exam ID: ${userData.examId}`);
            closeSignup();
        } catch (err) {
            alert(err.response?.data?.message || "Signup Failed");
        } finally {
            setLoadingSignup(false);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
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
                        <NavLink to='/'><img src='./eduTechB1.png' alt='logo' /></NavLink>
                    </div>

                    <div className='hamburger_icon' onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <CloseIcon style={{ color: 'white', fontSize: 30 }} /> : <MenuIcon style={{ color: 'white', fontSize: 30 }} />}
                    </div>

                    <ul className={`nav_links ${menuOpen ? 'show_menu' : ''}`}>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about-us-our-team'>About</NavLink></li>
                        <li><NavLink to='/service'>Services</NavLink></li>
                        <li><NavLink to='/contact-us-our-team'>Contact</NavLink></li>
                        <li><NavLink to='https://edutechlearners.netlify.app/'>EduTech - Learning Website</NavLink></li>
                    </ul>

                    <div className='nav_buttons'>
                        {user ? (
                            <div className="user_avatar_section" style={{ position: 'relative' }}>
                                <div
                                    className="button-52" role="button"
                                    onClick={toggleDropdown}
                                   
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
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                navigate(`/my-profile-details/${user.id}`);
                                            }}
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
                                            My Profile
                                        </button>

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
                                <button onClick={openLogin}>Login</button>
                                <button onClick={openSignup}>Sign Up</button>
                            </>
                        )}
                    </div>
                </nav>
            </div>

            {/* Login Dialog */}
            <BootstrapDialog
                onClose={closeLogin}
                open={loginOpen}
                aria-labelledby='login-dialog-title'
                PaperProps={{ className: 'dialog_box' }}
            >
                <DialogTitle id='login-dialog-title' className='dialog_title'>Login</DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleLoginSubmit}>

                        <label>Enter Email:</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter Email'
                            value={loginData.email}
                            onChange={handleLoginChange}
                        />

                        <label>Enter Password:</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter Password'
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />

                        <div className='form_actions'>
                            <button onClick={closeLogin}>Close</button>
                            <button type="submit" disabled={loadingLogin}>
                                {loadingLogin ? <CircularProgress size={20} color="inherit" /> : 'Login'}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </BootstrapDialog>

            {/* Sign Up Dialog */}
            <BootstrapDialog
                onClose={closeSignup}
                open={signupOpen}
                aria-labelledby='signup-dialog-title'
                PaperProps={{ className: 'dialog_box' }}
            >
                <DialogTitle id='signup-dialog-title' className='dialog_title'>Sign Up</DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSignupSubmit}>
                        <label>Enter Username:</label>
                        <input
                            type='text'
                            name='username'
                            placeholder='Enter Username'
                            value={signupData.username}
                            onChange={handleSignupChange}
                        />
                        <label>Enter Email:</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter Email'
                            value={signupData.email}
                            onChange={handleSignupChange}
                        />
                        <label>Enter Password:</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter Password'
                            value={signupData.password}
                            onChange={handleSignupChange}
                        />
                        <div className='form_actions'>
                            <button onClick={closeSignup}>Close</button>
                            <button type="submit" disabled={loadingSignup}>
                                {loadingSignup ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </div>

                    </form>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
};

export default Nav;
