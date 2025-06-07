import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/EmployerSignup.module.css';
import LeftPanel from '../components/LeftPanel';
import SignupTopBar from '../components/SignupTopBar'; // Import the SignupTopBar component

const EmployerSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Store form data in local storage
    localStorage.setItem('signupData', JSON.stringify(formData));

    navigate('/company/signup'); // Navigate to the next step
  };

  return (
    <div className={style.container}>
        <LeftPanel type='employer' />

      <div className={style.rightSection}>
        <SignupTopBar/>
        
        <div className={style.content}>
          <div className={style.formContainer}>
            <h1 className={style.title}>Sign up your company.</h1>
            <h2 className={style.subtitle}>Grow your global team.</h2>
            
            <p className={style.description}>
              All we need is a few company details. Then you'll be set up and able to simplify your global HR using Hepdex.
            </p>

            <div className={style.infoBox}>
              <div className={style.infoIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
              </div>
              <div className={style.infoContent}>
                <p className={style.infoTitle}>This sign up is for companies using Hepdex's HR platform</p>
                <p className={style.infoText}>
                  If you're an <span className={style.linkText}>employee, keep an eye on your inbox!</span> If your company uses Hepdex to manage your employment, you'll receive an email with sign up instructions.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={style.form}>
              <div className={style.formGroup}>
                <label className={style.label}>
                  First name
                  <span className={style.required}>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={style.input}
                  placeholder="First name"
                  required
                />
                <p className={style.helperText}>Required field - As it appears on your identification.</p>
              </div>

              <div className={style.formGroup}>
                <label className={style.label}>
                  Last name
                  <span className={style.required}>*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={style.input}
                  placeholder="Last name"
                  required
                />
                <p className={style.helperText}>Required field - As it appears on your identification.</p>
              </div>

              <div className={style.formGroup}>
                <label className={style.label}>Company email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={style.input}
                  placeholder="Company email"
                />
                <p className={style.helperText}>For example 'you@companyname.com'</p>
              </div>

              <div className={style.formGroup}>
                <label className={style.label}>
                  Password
                  <span className={style.required}>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${style.input} ${errors.password ? style.inputError : ''}`}
                  placeholder="Password"
                  required
                />
                {errors.password ? (
                  <p className={style.errorText}>{errors.password}</p>
                ) : (
                  <p className={style.helperText}>Must be at least 8 characters long.</p>
                )}
              </div>

              <button type="submit" className={style.submitButton}>
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignup;