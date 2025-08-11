import React, { createContext, useContext, useState } from 'react';

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);

    const openLogin = () => setLoginOpen(true);
    const closeLogin = () => setLoginOpen(false);

    const openSignup = () => setSignupOpen(true);
    const closeSignup = () => setSignupOpen(false);

    return (
        <AuthModalContext.Provider
            value={{
                loginOpen,
                signupOpen,
                openLogin,
                closeLogin,
                openSignup,
                closeSignup
            }}
        >
            {children}
        </AuthModalContext.Provider>
    );
};

// Custom hook for consuming the modal context
export const useAuthModal = () => useContext(AuthModalContext);
