import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ConfirmEmail.module.css';
import { IoClose } from 'react-icons/io5';
import { apiFetcher2, API_URL } from "../utils/helpers";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [errorDialog, setErrorDialog] = useState({
    isOpen: false,
    message: ''
  });

  const inputRefs = useRef([]);

  useEffect(() => {
    // Check for userID in localStorage
    const storedUserID = localStorage.getItem('userID');
    
    if (!storedUserID) {
    //   Redirect to /signup if userID doesn't exist
      navigate('/signup');
      return;
    }

    try {
      const parsedUserID = JSON.parse(storedUserID);
      setUserID(parsedUserID);
      
      // You might want to fetch user email from API using userID
      // For now, we'll use a placeholder or stored email
      const storedSignupData = localStorage.getItem('signupData');
      if (storedSignupData) {
        const parsedSignupData = JSON.parse(storedSignupData);
        setUserEmail(parsedSignupData.email || 'user@example.com');
      }
    } catch (error) {
      console.error('Error parsing userID from localStorage:', error);
      navigate('/signup');
    }
  }, [navigate]);

  const handleOtpChange = (index, value) => {
    // Only allow single character
    if (value.length > 1) return;
    
    // Allow alphanumeric characters (numbers and letters)
    if (value !== '' && !/^[a-zA-Z0-9]$/.test(value)) return;

    const newOtp = [...otp];
    // Keep the original case (both uppercase and lowercase allowed)
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
    // Handle arrow keys
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    // Extract alphanumeric characters only and limit to 6
    const alphanumeric = pastedText.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);
    
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      // Keep the original case (both uppercase and lowercase allowed)
      newOtp[i] = alphanumeric[i] || '';
    }
    setOtp(newOtp);
    
    // Focus on the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(char => char === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
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

  const handleVerify = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      showErrorDialog('Please enter the complete 6-character code.');
      return;
    }

    setIsLoading(true);
    
    try {
      const requestBody = JSON.stringify({
        userID: userID,
        otp: otpString
      });

      const response = await apiFetcher2(`${API_URL}/verify-otp`, {
        method: 'PUT',
        body: requestBody,
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.statusCode === 400) {
        showErrorDialog(response.data?.msg || 'Invalid verification code. Please try again.');
      }
      else if (response.statusCode === 500) {
        showErrorDialog(response.data?.msg || 'Internal server error. Please try again later.');
      }
      else if (response.statusCode === 200) {
        // Success - redirect to dashboard or next step
        localStorage.clear();
        navigate('/login'); // Adjust this route as needed
      }
      else {
        showErrorDialog(response.data?.msg || 'An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      showErrorDialog('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestAgain = async () => {
    setIsLoading(true);
    
    try {
      const requestBody = JSON.stringify({
        userID: userID
      });

      const response = await apiFetcher2(`${API_URL}/employer/resend-verification`, {
        method: 'POST',
        body: requestBody,
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.statusCode === 200) {
        // Clear current OTP and show success message
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        // You might want to show a success toast here
      } else {
        showErrorDialog(response.data?.msg || 'Failed to resend verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error resending verification code:', error);
      showErrorDialog('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signup');
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

      {/* Top Bar - Only visible on mobile */}
      <div className={styles.topBar}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <div className={styles.logoIcon}>H</div>
          <span className={styles.logoText}>HepDex</span>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          🔒 Logout
        </button>
      </div>

      {/* Left Section - Hidden on mobile */}
      <div className={styles.leftSection}>
        <div className={styles.leftContent}>
          <div className={styles.logo} onClick={() => navigate('/')}>
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
                <div className={`${styles.stepNumber} ${styles.completed}`}>
                  <span>✓</span>
                </div>
                <div className={styles.stepLine}></div>
              </div>
              <span className={styles.stepText}>Basic information</span>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepContainer}>
                <div className={`${styles.stepNumber} ${styles.active}`}>
                  <span>3</span>
                </div>
              </div>
              <span className={styles.stepText}>Confirm email</span>
            </div>
          </div>
          
          <div className={styles.userInfo}>
            <span className={styles.email}>
              {userEmail}
            </span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              🔒 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div className={styles.verifyContainer}>
          <h2 className={styles.verifyTitle}>Verify</h2>
          <p className={styles.verifySubtitle}>
            Your code was sent to you via email
          </p>
          
          <div className={styles.otpContainer}>
            {otp.map((char, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                className={styles.otpInput}
                value={char}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                maxLength={1}
                autoComplete="off"
                placeholder=""
              />
            ))}
          </div>

          <button
            className={styles.verifyButton}
            onClick={handleVerify}
            disabled={isLoading || otp.join('').length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>

          <div className={styles.resendSection}>
            <span className={styles.resendText}>Didn't receive code? </span>
            <button 
              className={styles.resendLink}
              onClick={handleRequestAgain}
              disabled={isLoading}
            >
              Request again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;