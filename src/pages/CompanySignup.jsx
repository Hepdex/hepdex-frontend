import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CompanySignup.module.css';
import { IoChevronDown, IoClose } from 'react-icons/io5';
import {apiFetcher2, API_URL} from "../utils/helpers"; // Import any helper functions if needed

const CompanySignup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    companySize: '',
    acceptTerms: false,
    receiveMarketing: false
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    country: false,
    companySize: false
  });

  const [signupData, setSignupData] = useState(null);
  const [errorDialog, setErrorDialog] = useState({
    isOpen: false,
    message: ''
  });

  useEffect(() => {
    // Check for signupData in localStorage
    const storedSignupData = localStorage.getItem('signupData');
    
    if (!storedSignupData) {
      // Redirect to /signup if signupData doesn't exist
      navigate('/signup');
      return;
    }

    try {
      const parsedSignupData = JSON.parse(storedSignupData);
      setSignupData(parsedSignupData);
    } catch (error) {
      console.error('Error parsing signupData from localStorage:', error);
      // Redirect if signupData is corrupted
      navigate('/signup');
    }
  }, [navigate]);

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
    'Australia', 'Netherlands', 'Spain', 'Italy', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', 
    '201-1000 employees', '1000+ employees'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleDropdown = (field) => {
    setDropdownOpen(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const selectOption = (field, value) => {
    handleInputChange(field, value);
    setDropdownOpen(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const showErrorDialog = (message) => {
    setErrorDialog({
      isOpen: true,
      message: message
    });
  };

  const closeErrorDialog = () => {
    setErrorDialog({
      isOpen: false,
      message: ''
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    
    // Clean up company size - remove "employees" from the end
    const cleanedCompanySize = formData.companySize.replace(' employees', '');
    
    // Create updated signup data with company information
    const updatedSignupData = {
      ...signupData,
      companyName: formData.companyName,
      companySize: cleanedCompanySize,
      country: formData.country
    };
    
    // Update localStorage with the new data
    localStorage.setItem('signupData', JSON.stringify(updatedSignupData));
    
    // Prepare data for POST request
    const requestBody = JSON.stringify(updatedSignupData);
    
    try {
      // Example POST request - replace with your actual endpoint
      const response = await apiFetcher2(`${API_URL}/employer/signup`, {method: 'POST', body: requestBody, headers: {'Content-Type': 'application/json'}});
      
      if (response.statusCode === 400) {
        showErrorDialog(response.data?.msg || 'Bad request. Please check your input and try again.');
      }
      else if (response.statusCode === 500) { 
        showErrorDialog(response.data?.msg || 'Internal server error. Please try again later.');
      } 
      else if (response.statusCode === 200) {
        localStorage.clear()
        localStorage.setItem('userID', JSON.stringify(response.data.userID));
        // Redirect to email confirmation page
        navigate('/confirm-email');
      }
      else {
        // Handle any other status codes
        showErrorDialog(response.data?.msg || 'An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showErrorDialog('Network error. Please check your connection and try again.');
    }
    
  };

  return (
    <div className={styles.container}>
      {/* Error Dialog */}
      {errorDialog.isOpen && (
        <div className={styles.errorOverlay}>
          <div className={styles.errorDialog}>
            <div className={styles.errorHeader}>
              <h3 className={styles.errorTitle}>Error</h3>
              <button 
                className={styles.closeButton}
                onClick={closeErrorDialog}
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className={styles.errorBody}>
              <p className={styles.errorMessage}>{errorDialog.message}</p>
            </div>
            <div className={styles.errorFooter}>
              <button 
                className={styles.okButton}
                onClick={closeErrorDialog}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Top Bar */}
      <div className={styles.mobileTopBar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>H</div>
          <span className={styles.logoText}>HepDex</span>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          🔒 Logout
        </button>
      </div>

      {/* Left Section - Desktop Only */}
      <div className={styles.leftSection}>
        <div className={styles.leftContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>H</div>
            <span className={styles.logoText}>HepDex</span>
          </div>
          
          <h1 className={styles.title}>
            Create your account in a few clicks
          </h1>
          
          <div className={styles.stepsList}>
            <div className={styles.step}>
              <div className={styles.stepContainer}>
                <div className={`${styles.stepNumber} ${styles.completed}`}>
                  <span>✓</span>
                </div>
                <div className={styles.stepLine}></div>
              </div>
              <span className={styles.stepText}>Sign up</span>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepContainer}>
                <div className={`${styles.stepNumber} ${styles.active}`}>
                  <span>2</span>
                </div>
                <div className={styles.stepLine}></div>
              </div>
              <span className={styles.stepText}>Basic information</span>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepContainer}>
                <div className={styles.stepNumber}>
                  <span>3</span>
                </div>
              </div>
              <span className={styles.stepText}>Confirm email</span>
            </div>
          </div>
          
          <div className={styles.userInfo}>
            <span className={styles.email}>
              {signupData?.email || 'entamarketltd@bello.com'}
            </span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              🔒 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Let's get started</h2>
          
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Basic information</h3>
            <p className={styles.sectionSubtitle}>
              We use this for tax, security, and compliance purposes.
            </p>
            
            <form className={styles.form} onSubmit={handleContinue}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Legal company name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter your legal company name"
                />
                <p className={styles.helpText}>
                  Make sure this name matches your company's legal documentation.
                </p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Country <span className={styles.required}>*</span>
                </label>
                <div className={styles.dropdown}>
                  <button
                    type="button"
                    className={`${styles.dropdownButton} ${dropdownOpen.country ? styles.open : ''}`}
                    onClick={() => toggleDropdown('country')}
                  >
                    <span>{formData.country || 'Select country'}</span>
                    <IoChevronDown size={20} />
                  </button>
                  {dropdownOpen.country && (
                    <div className={styles.dropdownMenu}>
                      {countries.map((country) => (
                        <button
                          key={country}
                          type="button"
                          className={styles.dropdownItem}
                          onClick={() => selectOption('country', country)}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className={styles.helpText}>
                  Where your company is legally based.
                </p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Company size <span className={styles.required}>*</span>
                </label>
                <div className={styles.dropdown}>
                  <button
                    type="button"
                    className={`${styles.dropdownButton} ${dropdownOpen.companySize ? styles.open : ''}`}
                    onClick={() => toggleDropdown('companySize')}
                  >
                    <span>{formData.companySize || 'Select company size'}</span>
                    <IoChevronDown size={20} />
                  </button>
                  {dropdownOpen.companySize && (
                    <div className={styles.dropdownMenu}>
                      {companySizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={styles.dropdownItem}
                          onClick={() => selectOption('companySize', size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>
                    I accept the <a href="#" className={styles.link}>Terms of Service</a> and I'm authorized to accept for my company
                  </span>
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.receiveMarketing}
                    onChange={(e) => handleInputChange('receiveMarketing', e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>
                    I agree to receive marketing updates from HepDex
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className={styles.continueButton}
                disabled={!formData.companyName || !formData.country || !formData.companySize || !formData.acceptTerms}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySignup;