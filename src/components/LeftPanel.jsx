import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/LeftPanel.module.css'; // Adjust the path as necessary

const LeftPanel = ({ type = 'employer' }) => {
  const navigate = useNavigate();

  // Dynamic content based on type prop
  const getContent = () => {
    if (type === 'employer') {
      return {
        title: "Sign up and come on in.",
        description: "Signing up as an employer is simple, free, and fast. One place to manage everything your global team needs."
      };
    } else if (type === 'candidate') {
      return {
        title: "Join our community today.",
        description: "Signing up as a candidate is simple, free, and fast. Discover amazing opportunities and connect with top employers."
      };
    } else {
      // Default fallback
      return {
        title: "Sign up and come on in.",
        description: "Signing up is simple, free, and fast. Join our platform and unlock new possibilities."
      };
    }
  };

  const content = getContent();

  const handleLogoNavigation = () => {
    navigate('/home');
  };

  return (
    <div className={style.leftSection}>
      <div className={style.logoSection}>
        <div className={style.logo} onClick={handleLogoNavigation}>
          <span className={style.logoText}>HepDex</span>
        </div>
      </div>
      
      <div className={style.contentSection}>
        <div className={style.icon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h1 className={style.leftTitle}>{content.title}</h1>
        <p className={style.leftDescription}>
          {content.description}
        </p>
      </div>

      <div className={style.decorativePattern}>
        {[...Array(12)].map((_, row) => (
          <div key={row} className={style.patternRow}>
            {[...Array(8)].map((_, col) => (
              <div
                key={col}
                className={style.circle}
                style={{
                  animationDelay: `${(row + col) * 0.1}s`
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;