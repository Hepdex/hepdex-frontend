import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/Signup.module.css'; // Adjust the path as necessary

const SignupPage = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    if (type === 'company') {
      navigate('/employer/signup');
    }
    else if (type === 'individual') {
      navigate('/candidate/signup');
    }
    
  };

  const handleLoginNavigation = () => {
    navigate('/login');
  };

  const handleLogoNavigation = () => {
    navigate('/home');
  };

  const handlePreviousNavigation = () => {
    navigate(-1); // Go back to previous page in history
  };

  return (
    <div className={style.container}>
      <div className={style.leftSection}>
        <div className={style.logoSection}>
          <div className={style.logo} onClick={handleLogoNavigation}>
            <span className={style.logoText}>HepDex</span>
          </div>
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

      <div className={style.rightSection}>
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

        <div className={style.content}>
          <h1 className={style.title}>How would you be using Hepdex?</h1>
          
          <div className={style.optionsContainer}>
            <div 
              className={`${style.option} ${userType === 'company' ? style.selected : ''}`}
              onClick={() => handleUserTypeSelection('company')}
            >
              <div className={style.optionContent}>
                <div className={style.optionText}>
                  <h3 className={style.optionTitle}>I'm a company</h3>
                  <p className={style.optionDescription}>I want to manage my team or recruit new talent.</p>
                </div>
                <div className={style.optionIcon}>
                  <div className={style.iconCompany}>
                    <div className={`${style.iconElement} ${style.screen}`}></div>
                    <div className={`${style.iconElement} ${style.person}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className={`${style.option} ${userType === 'individual' ? style.selected : ''}`}
              onClick={() => handleUserTypeSelection('individual')}
            >
              <div className={style.optionContent}>
                <div className={style.optionText}>
                  <h3 className={style.optionTitle}>I'm an individual</h3>
                  <p className={style.optionDescription}>I'm a freelancer, job seeker, or employee.</p>
                </div>
                <div className={style.optionIcon}>
                  <div className={style.iconIndividual}>
                    <div className={`${style.iconElement} ${style.chart}`}></div>
                    <div className={`${style.iconElement} ${style.folders}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      
    </div>
  );
};

export default SignupPage;