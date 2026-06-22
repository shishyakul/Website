import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import './JobApplicationForm.css';

// The Google Apps Script URL the user deployed
const DRIVE_APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwEXdUjX6-leZ65x2hepEspjn9OVmzEYl2f67tQKFMqd9KtHNlYyRA2t2J-tI8yEZY/exec";

export default function JobApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    dob: '',
    residentialAddress: '',
    emergencyContact: '',
    maritalStatus: '',
    source: '',
    
    subject: '',
    workingType: '',
    slotsOnlineInterview: '',
    
    hasExperience: 'No',
    previousDesignation: '',
    employmentDuration: '',
    presentSalary: '',
    reasonLeaving: '',
    responsibilities: '',
    
    expectedSalary: '',
    joiningDate: '',
    workWeekends: '',
    locationConstraints: '',
    
    disciplinaryActions: '',
    backgroundVerification: '',
    reference: '',
    otherIssues: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.type !== 'application/pdf') {
        alert('Only PDF files are allowed.');
        e.target.value = '';
        return;
      }
      if (selected.size > 1024 * 1024) { // 1MB
        alert('File size exceeds 1MB limit. Please compress your PDF.');
        e.target.value = '';
        return;
      }
      setFile(selected);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload your CV/Resume.");
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Upload CV to Google Drive
      const base64 = await convertBase64(file);
      const driveRes = await fetch(DRIVE_APP_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'upload_cv',
          filename: `${formData.fullName}_CV.pdf`,
          base64: base64
        })
      });
      
      const driveResult = await driveRes.json();
      if (driveResult.status !== 'success') {
        throw new Error('Failed to upload CV to Google Drive.');
      }
      
      const fileUrl = driveResult.fileUrl;
      
      // 2. Submit Data + File URL to Firestore via Vercel Function
      const finalData = {
        ...formData,
        cvUrl: fileUrl
      };
      
      const dbRes = await fetch('/api/submitJobApplication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });
      
      const dbResult = await dbRes.json();
      if (!dbRes.ok) throw new Error(dbResult.error || 'Database error');
      
      setSuccess(true);
      window.scrollTo(0, 0);
      
    } catch (err) {
      console.error(err);
      alert(err.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="application-success">
        <Helmet><title>Application Received | Shishyakul</title></Helmet>
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h1>Application Submitted!</h1>
          <p>Thank you for applying to Shishyakul, {formData.fullName}.</p>
          <p>Our HR department has received your profile and CV. We will review your qualifications and contact you regarding the next steps.</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary" style={{marginTop: 32}}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-application-page">
      <Helmet><title>Teacher Job Application | Shishyakul</title></Helmet>
      
      <div className="app-header">
        <h1>Teacher Job Application</h1>
        <p>Join the Shishyakul family. Please fill out the form below accurately.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="app-form">
        
        {/* SECTION 1: Personal Info */}
        <section className="form-section">
          <h2>1. Personal Information</h2>
          <div className="form-grid">
            <div className="input-group">
              <label>Full Name *</label>
              <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="e.g. John Doe" />
            </div>
            <div className="input-group">
              <label>Email Address *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="e.g. john@example.com" />
            </div>
            <div className="input-group">
              <label>Mobile Number *</label>
              <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} placeholder="e.g. +91 9876543210" />
            </div>
            <div className="input-group">
              <label>Gender *</label>
              <select name="gender" required value={formData.gender} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label>Date of Birth *</label>
              <input type="date" name="dob" required value={formData.dob} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Marital Status *</label>
              <select name="maritalStatus" required value={formData.maritalStatus} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
            <div className="input-group full-width">
              <label>Full Residential Address *</label>
              <textarea name="residentialAddress" required value={formData.residentialAddress} onChange={handleChange} rows="3"></textarea>
            </div>
            <div className="input-group full-width">
              <label>Emergency Contact (Name & Number) *</label>
              <input type="text" name="emergencyContact" required value={formData.emergencyContact} onChange={handleChange} placeholder="e.g. Jane Doe - +91 1234567890" />
            </div>
            <div className="input-group full-width">
              <label>From where did you get to know about us? *</label>
              <input type="text" name="source" required value={formData.source} onChange={handleChange} placeholder="e.g. LinkedIn, Friend, Website..." />
            </div>
          </div>
        </section>

        {/* SECTION 2: Job Preferences */}
        <section className="form-section">
          <h2>2. Job Preferences</h2>
          <div className="form-grid">
            <div className="input-group full-width">
              <label>Specify the Subject * <span style={{fontSize: 12, fontWeight: 400}}>(Selected subjects are mandatory for 8th, 9th, 10th - CBSE/STATE)</span></label>
              <input type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="e.g. Mathematics, Science" />
            </div>
            <div className="input-group">
              <label>Preferred Working Type *</label>
              <select name="workingType" required value={formData.workingType} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Full Time">Full Time</option>
                <option value="Average Time">Average Time</option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>
            <div className="input-group">
              <label>Time Slots for Online Interview *</label>
              <input type="text" name="slotsOnlineInterview" required value={formData.slotsOnlineInterview} onChange={handleChange} placeholder="e.g. Weekdays 4 PM - 6 PM" />
            </div>

          </div>
        </section>

        {/* SECTION 3: Experience */}
        <section className="form-section">
          <h2>3. Experience</h2>
          <div className="form-grid">
            <div className="input-group full-width radio-group">
              <label>Do you have any prior work experience? *</label>
              <div style={{display: 'flex', gap: 16, marginTop: 8}}>
                <label style={{display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500}}>
                  <input type="radio" name="hasExperience" value="Yes" checked={formData.hasExperience === 'Yes'} onChange={handleChange} style={{width: 20, height: 20}} /> Yes
                </label>
                <label style={{display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500}}>
                  <input type="radio" name="hasExperience" value="No" checked={formData.hasExperience === 'No'} onChange={handleChange} style={{width: 20, height: 20}} /> No
                </label>
              </div>
            </div>
            
            {formData.hasExperience === 'Yes' && (
              <>
                <div className="input-group">
                  <label>Previous Job Designation *</label>
                  <input type="text" name="previousDesignation" required value={formData.previousDesignation} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Duration of Employment *</label>
                  <input type="text" name="employmentDuration" required value={formData.employmentDuration} onChange={handleChange} placeholder="e.g. 2 Years" />
                </div>
                <div className="input-group">
                  <label>Present Salary</label>
                  <input type="text" name="presentSalary" value={formData.presentSalary} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Reason of Leaving *</label>
                  <input type="text" name="reasonLeaving" required value={formData.reasonLeaving} onChange={handleChange} />
                </div>
                <div className="input-group full-width">
                  <label>Mention Responsibilities Handled *</label>
                  <textarea name="responsibilities" required value={formData.responsibilities} onChange={handleChange} rows="3"></textarea>
                </div>
              </>
            )}
          </div>
        </section>

        {/* SECTION 4: Expectations */}
        <section className="form-section">
          <h2>4. Expectations & Constraints</h2>
          <div className="form-grid">
            <div className="input-group">
              <label>Expected Salary *</label>
              <input type="text" name="expectedSalary" required value={formData.expectedSalary} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Preferred Joining Date *</label>
              <input type="date" name="joiningDate" required value={formData.joiningDate} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Willing to work on weekends if required? *</label>
              <select name="workWeekends" required value={formData.workWeekends} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="input-group">
              <label>Do you have any location constraints? *</label>
              <input type="text" name="locationConstraints" required value={formData.locationConstraints} onChange={handleChange} placeholder="e.g. None, Max 10km radius" />
            </div>
          </div>
        </section>

        {/* SECTION 5: Background */}
        <section className="form-section">
          <h2>5. Background & Reference</h2>
          <div className="form-grid">
            <div className="input-group full-width">
              <label>Have you been involved in any disciplinary actions in your previous job? *</label>
              <select name="disciplinaryActions" required value={formData.disciplinaryActions} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="input-group full-width">
              <label>Are you willing to undergo a background verification? *</label>
              <select name="backgroundVerification" required value={formData.backgroundVerification} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="input-group full-width">
              <label>Reference (If Any)</label>
              <input type="text" name="reference" value={formData.reference} onChange={handleChange} placeholder="Name, Contact Number, Relationship" />
            </div>
            <div className="input-group full-width">
              <label>Let us know if you have any other issues related to interview</label>
              <textarea name="otherIssues" value={formData.otherIssues} onChange={handleChange} rows="2"></textarea>
            </div>
          </div>
        </section>

        {/* SECTION 6: File Upload */}
        <section className="form-section" style={{ background: 'var(--surface-tint)', borderColor: 'var(--brand-gold)' }}>
          <h2>6. Submit Your CV</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Please upload your resume in PDF format (Max size: 1MB).</p>
          <div className="input-group full-width">
            <input 
              type="file" 
              accept=".pdf,application/pdf" 
              required 
              onChange={handleFileChange}
              style={{
                padding: '24px', 
                border: '2px dashed var(--surface-border)', 
                borderRadius: '12px', 
                background: 'var(--surface-card)',
                width: '100%',
                cursor: 'pointer'
              }}
            />
          </div>
        </section>

        <div className="form-footer">
          <button type="submit" disabled={loading} className="btn-primary submit-btn">
            {loading ? 'Submitting Application... Please wait' : 'Submit Application'}
          </button>
        </div>

      </form>
    </div>
  );
}
