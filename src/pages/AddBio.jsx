import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AddBio.module.css';
import { IoChevronDown, IoClose } from 'react-icons/io5';
import {apiFetcher2, API_URL} from "../utils/helpers"; // Import any helper functions if needed

const AddBio = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    about: '',
    skills: [],
    languages: [],
    acceptTerms: false,
    receiveMarketing: false
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [userID, setUserID] = useState(null);

  const [dropdownOpen, setDropdownOpen] = useState({
    country: false,
    companySize: false
  });

  const [signupData, setSignupData] = useState(null);
  const [errorDialog, setErrorDialog] = useState({
    isOpen: false,
    message: ''
  });

  // Updated useEffect
    useEffect(() => {
        // Check for userID in localStorage
        const storedUserID = localStorage.getItem('userID');
        const storedSignupData = localStorage.getItem('signupData');

        if( !storedSignupData) {
            // Redirect to /signup if signupData doesn't exist
            navigate('/signup');
            return;
        }
  
        if (!storedUserID) {
            // Redirect to /login if userID doesn't exist
            navigate('/login');
            return;
        }

        try {
            const parsedUserID = JSON.parse(storedUserID);
            const parsedSignupData = JSON.parse(storedSignupData);
            setSignupData(parsedSignupData);
            setUserID(parsedUserID);
            console.log('User ID:', parsedUserID); // For debugging
        } catch (error) {
            console.error('Error parsing userID from localStorage:', error);
            // Redirect if userID is corrupted
            navigate('/login');
        }     
    }, [navigate]);

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (languageToRemove) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToRemove)
    }));
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'skill') {
        addSkill();
      } else if (type === 'language') {
        addLanguage();
      }
    }
  };

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
    
    // Create updated signup data with bio information
    const updatedSignupData = {
      about: formData.about,
      skills: formData.skills,
      languages: formData.languages
    };
    
    // Prepare data for POST request
    const requestBody = JSON.stringify(updatedSignupData);
    
    try {
      // Example POST request - replace with your actual endpoint
      const response = await apiFetcher2(`${API_URL}/update-candidate-bio?userID=${userID}`, {method: 'PUT', body: requestBody, headers: {'Content-Type': 'application/json'}});
      
      if (response.statusCode === 200) {
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
        <div className={styles.mobileTopBarContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>H</div>
            <span className={styles.logoText}>HepDex</span>
          </div>
          <button className={styles.mobileLogoutBtn} onClick={handleLogout}>
            🔒 Logout
          </button>
        </div>
      </div>

      {/* Left Section */}
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
              <span className={styles.stepText}>Add bio</span>
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
              {signupData?.email || 'info@hepdex.com'}
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
            <h3 className={styles.sectionTitle}>Add bio</h3>
            <p className={styles.sectionSubtitle}>
              Tell us about yourself, your skills, and languages you speak.
            </p>
            
            <form className={styles.form} onSubmit={handleContinue}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  About <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.textarea}
                  value={formData.about}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  placeholder="Tell us about yourself..."
                  maxLength={260}
                  rows={4}
                />
                <p className={styles.helpText}>
                  {formData.about.length}/260 characters
                </p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Skills <span className={styles.required}>*</span>
                </label>
                <div className={styles.skillsContainer}>
                  <div className={styles.inputWithButton}>
                    <input
                      type="text"
                      className={styles.input}
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, 'skill')}
                      placeholder="Add a skill"
                    />
                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={addSkill}
                      disabled={!newSkill.trim()}
                    >
                      Add
                    </button>
                  </div>
                  {formData.skills.length > 0 && (
                    <div className={styles.tagsList}>
                      {formData.skills.map((skill, index) => (
                        <div key={index} className={styles.tag}>
                          <span>{skill}</span>
                          <button
                            type="button"
                            className={styles.removeTag}
                            onClick={() => removeSkill(skill)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className={styles.helpText}>
                  Add skills that are relevant to your work or interests.
                </p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Languages <span className={styles.required}>*</span>
                </label>
                <div className={styles.languagesContainer}>
                  <div className={styles.inputWithButton}>
                    <input
                      type="text"
                      className={styles.input}
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, 'language')}
                      placeholder="Add a language"
                    />
                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={addLanguage}
                      disabled={!newLanguage.trim()}
                    >
                      Add
                    </button>
                  </div>
                  {formData.languages.length > 0 && (
                    <div className={styles.tagsList}>
                      {formData.languages.map((language, index) => (
                        <div key={index} className={styles.tag}>
                          <span>{language}</span>
                          <button
                            type="button"
                            className={styles.removeTag}
                            onClick={() => removeLanguage(language)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className={styles.helpText}>
                  Add languages you can speak or write in.
                </p>
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
                disabled={!formData.about.trim() || formData.skills.length === 0 || formData.languages.length === 0 || !formData.acceptTerms}
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

export default AddBio;