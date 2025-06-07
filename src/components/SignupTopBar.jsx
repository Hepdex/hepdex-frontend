import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/SignupTopBar.module.css'; // Adjust the path as necessary

const SignupTopBar = () => {
  
  const navigate = useNavigate();

  const handlePreviousNavigation = () => {
    navigate(-1); // Go back to previous page in history
  };

  const handleLoginNavigation = () => {
    navigate('/login');
  };


  return (
    
    <div className={style.header}>
        <button className={style.backButton} onClick={handlePreviousNavigation}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5"/>
                <path d="m12 19-7-7 7-7"/>
            </svg>
                Previous
        </button>
        <div className={style.loginLink}>
            Already have an account? <button onClick={handleLoginNavigation} className={style.link}>Log in</button>
        </div>
    </div>     
    
  );
};

export default SignupTopBar;