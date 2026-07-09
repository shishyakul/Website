import React, { useState } from 'react';
import './BattalionEnrollment.css';

export default function BattalionEnrollment() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    batch: '',
    currentStatus: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/enrollBattalion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Enrollment failed');
      }

      setSuccessData({
        email: formData.email,
        password: data.password
      });

    } catch (err) {
      setError(err.message);
    }
    
    setIsSubmitting(false);
  };

  if (successData) {
    return (
      <div className="battalion-enrollment-page">
        <div className="battalion-card success-card">
          <div className="icon-wrapper">
            <span className="material-symbols-outlined success-icon">check_circle</span>
          </div>
          <h1>Welcome to the Battalion!</h1>
          <p className="success-msg">Your Alumni Profile has been successfully provisioned. You are now part of the Battalion Network.</p>
          
          <div className="credentials-box">
            <h3>Your Portal Credentials</h3>
            <p>Please save these credentials to access the Shishyakul Student Portal.</p>
            <div className="cred-row">
              <span>Email:</span>
              <strong>{successData.email}</strong>
            </div>
            <div className="cred-row">
              <span>Password:</span>
              <strong className="password-highlight">{successData.password}</strong>
            </div>
          </div>
          
          <a href="http://localhost:5174/login" className="btn btn-portal" target="_blank" rel="noreferrer">
            Login to Portal <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="battalion-enrollment-page">
      <div className="battalion-card">
        <div className="battalion-header">
          <h1>Battalion Network</h1>
          <p>Roots Deep, Wings Wide, Hearts United</p>
          <div className="subtitle">Alumni Enrollment Portal</div>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="battalion-form">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              placeholder="Enter your full name" 
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="Enter your email" 
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              placeholder="Enter your mobile number" 
            />
          </div>

          <div className="form-group">
            <label>Passout Batch</label>
            <select name="batch" value={formData.batch} onChange={handleChange} required>
              <option value="" disabled>Select your batch year</option>
              <option value="2022 Passout/Dropout">2022 Passout / Dropout</option>
              <option value="2023 Passout/Dropout">2023 Passout / Dropout</option>
              <option value="2024 Passout/Dropout">2024 Passout / Dropout</option>
              <option value="2025 Passout/Dropout">2025 Passout / Dropout</option>
            </select>
          </div>

          <div className="form-group">
            <label>Current Status</label>
            <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} required>
              <option value="" disabled>What are you doing now?</option>
              <option value="College/University">College / University Student</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Competitive Exams Prep">Preparing for Competitive Exams</option>
              <option value="Startup/Business">Startup / Business</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Provisioning Profile...' : 'Join Battalion Network'}
          </button>
        </form>
      </div>
    </div>
  );
}
