import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/CandidateSignup.module.css';
import LeftPanel from '../components/LeftPanel';
import SignupTopBar from '../components/SignupTopBar';
import {countries, apiFetcher2, API_URL} from "../utils/helpers"

const CandidateSignup = () => {
  const [formData, setFormData] = useState({
    resume: null,
    firstName: '',
    lastName: '',
    email: '',
    jobType: '',
    jobTitle: '',
    country: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      // Clear error if file is valid
      if (errors.resume) {
        setErrors(prev => ({
          ...prev,
          resume: ''
        }));
      }
    } else if (file) {
      setErrors(prev => ({
        ...prev,
        resume: 'Please select a PDF file'
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.jobType) {
      newErrors.jobType = 'Job type is required';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeErrorDialog = () => {
    setShowErrorDialog(false);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Create FormData object for file upload
    const submitData = new FormData();
    
    // Append all form fields to FormData
    if (formData.resume) {
      submitData.append('resume', formData.resume);
    }
    submitData.append('firstName', formData.firstName);
    submitData.append('lastName', formData.lastName);
    submitData.append('email', formData.email);
    submitData.append('jobType', formData.jobType);
    submitData.append('jobTitle', formData.jobTitle);
    submitData.append('country', formData.country);
    submitData.append('password', formData.password);

    // For demonstration, we'll store the non-file data in localStorage
    const storageData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      jobType: formData.jobType,
      jobTitle: formData.jobTitle,
      country: formData.country,
      hasResume: !!formData.resume
    };
    localStorage.setItem('signupData', JSON.stringify(storageData));
    // In a real application, you would send submitData to your API

    try {
      const response = await apiFetcher2(`${API_URL}/candidate/signup`, 
          {method: 'POST', body: submitData}
      );
      
      if(response.statusCode == 200) {
          localStorage.setItem('userID', JSON.stringify(response.data.userID));
          navigate('/add-bio'); // Navigate to the next step
      }
      else {
          setErrorMessage(response.data?.msg || 'An error occurred during signup. Please try again.');
          setShowErrorDialog(true);
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
      setShowErrorDialog(true);
    }
  };

  return (
    <div className={style.container}>
      <LeftPanel type='candidate' />

      <div className={style.rightSection}>
        <SignupTopBar/>
        
        <div className={style.content}>
          <div className={style.formContainer}>
            <h1 className={style.title}>Sign up for Hepdex Hub.</h1>
            
            <p className={style.description}>
              All we need are a few personal details. Then you'll be set up and able to simplify your job search using Hepdex.
            </p>

            <form onSubmit={handleSubmit} className={style.form}>
              <div className={style.formGroup}>
                <label className={style.label}>
                  Resume (PDF)
                </label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className={`${style.fileInput} ${errors.resume ? style.inputError : ''}`}
                />
                {errors.resume ? (
                  <p className={style.errorText}>{errors.resume}</p>
                ) : (
                  <p className={style.helperText}>Optional - Upload your resume as a PDF file.</p>
                )}
              </div>

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
                  className={`${style.input} ${errors.firstName ? style.inputError : ''}`}
                  placeholder="First name"
                  required
                />
                {errors.firstName ? (
                  <p className={style.errorText}>{errors.firstName}</p>
                ) : (
                  <p className={style.helperText}>Required field - As it appears on your identification.</p>
                )}
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
                  className={`${style.input} ${errors.lastName ? style.inputError : ''}`}
                  placeholder="Last name"
                  required
                />
                {errors.lastName ? (
                  <p className={style.errorText}>{errors.lastName}</p>
                ) : (
                  <p className={style.helperText}>Required field - As it appears on your identification.</p>
                )}
              </div>

              <div className={style.formGroup}>
                <label className={style.label}>
                  Email
                  <span className={style.required}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${style.input} ${errors.email ? style.inputError : ''}`}
                  placeholder="Email"
                  required
                />
                {errors.email ? (
                  <p className={style.errorText}>{errors.email}</p>
                ) : (
                  <p className={style.helperText}>For example 'you@example.com'</p>
                )}
              </div>

              <div className={style.formGroup}>
                <label className={style.label}>
                  Job Type
                  <span className={style.required}>*</span>
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className={`${style.select} ${errors.jobType ? style.inputError : ''}`}
                  required
                >
                  <option value="">Select job type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                </select>
                {errors.jobType ? (
                  <p className={style.errorText}>{errors.jobType}</p>
                ) : (
                  <p className={style.helperText}>Choose your preferred job type.</p>
                )}
              </div>

              <div className={style.formGroup}>
                <label className={style.label}>
                  Job Title
                  <span className={style.required}>*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className={`${style.input} ${errors.jobTitle ? style.inputError : ''}`}
                  placeholder="Job title"
                  required
                />
                {errors.jobTitle ? (
                  <p className={style.errorText}>{errors.jobTitle}</p>
                ) : (
                  <p className={style.helperText}>Your desired job title or current profession.</p>
                )}
              </div>

              <div className={style.formGroup}>
                <label className={style.label}>
                  Country
                  <span className={style.required}>*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`${style.select} ${errors.country ? style.inputError : ''}`}
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country ? (
                  <p className={style.errorText}>{errors.country}</p>
                ) : (
                  <p className={style.helperText}>Your country of residence.</p>
                )}
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

      {/* Error Dialog */}
      {showErrorDialog && (
        <div className={style.errorDialogOverlay}>
          <div className={style.errorDialog}>
            <div className={style.errorDialogHeader}>
              <h3 className={style.errorDialogTitle}>Error</h3>
              <button 
                className={style.errorDialogClose}
                onClick={closeErrorDialog}
                aria-label="Close error dialog"
              >
                ×
              </button>
            </div>
            <div className={style.errorDialogContent}>
              <p className={style.errorDialogMessage}>{errorMessage}</p>
            </div>
            <div className={style.errorDialogFooter}>
              <button 
                className={style.errorDialogButton}
                onClick={closeErrorDialog}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSignup;