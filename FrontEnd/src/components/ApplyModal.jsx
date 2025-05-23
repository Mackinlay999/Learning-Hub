import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/ApplyModal.css';

function ApplyModal({ isOpen, onClose, jobTitle }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  // Close modal on Escape key
  useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', onEsc);
    }
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  // Focus trap for accessibility
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    } else if (
      !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(
        formData.resume.type
      )
    ) {
      newErrors.resume = 'Only PDF, DOC, or DOCX files are allowed';
    } else if (formData.resume.size > 5 * 1024 * 1024) {
      newErrors.resume = 'Resume must be less than 5MB';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: null }));
    setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitStatus('loading');

    // Prepare data
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('resume', formData.resume);
    data.append('coverLetter', formData.coverLetter);
    data.append('jobTitle', jobTitle);

    try {
      // Uncomment below and adjust for actual backend
      // const response = await fetch('/api/apply', {
      //   method: 'POST',
      //   body: data,
      // });
      // const result = await response.json();
      // if (!response.ok) throw new Error(result.message || 'Error submitting application');

      // Simulated success
      setTimeout(() => {
        setSubmitStatus('success');
        // Optional reset
        // setFormData({ name: '', email: '', phone: '', resume: null, coverLetter: '' });
        // fileInputRef.current.value = '';
      }, 1000);
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('apply-modal-overlay')) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="apply-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="apply-modal-container"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            role="dialog"
            aria-modal="true"
            ref={modalRef}
            tabIndex={-1}
          >
            <header className="apply-modal-header">
              <h2 id="apply-modal-title" className="apply-modal-title">
                Apply for <span className="apply-modal-job-title">{jobTitle}</span>
              </h2>
              <button
                className="apply-modal-close-btn"
                aria-label="Close modal"
                onClick={onClose}
              >
                &times;
              </button>
            </header>

            <form className="apply-modal-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="name" className="apply-modal-label">
                Full Name<span className="apply-modal-required">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`apply-modal-input ${errors.name ? 'apply-modal-error-input' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              {errors.name && <p className="apply-modal-error-msg">{errors.name}</p>}

              <label htmlFor="email" className="apply-modal-label">
                Email<span className="apply-modal-required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`apply-modal-input ${errors.email ? 'apply-modal-error-input' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              {errors.email && <p className="apply-modal-error-msg">{errors.email}</p>}

              <label htmlFor="phone" className="apply-modal-label">
                Phone Number<span className="apply-modal-required">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`apply-modal-input ${errors.phone ? 'apply-modal-error-input' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 555 555 5555"
              />
              {errors.phone && <p className="apply-modal-error-msg">{errors.phone}</p>}

              <label htmlFor="resume" className="apply-modal-label">
                Resume<span className="apply-modal-required">*</span>
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                ref={fileInputRef}
                accept=".pdf,.doc,.docx"
                className={`apply-modal-input-file ${errors.resume ? 'apply-modal-error-input' : ''}`}
                onChange={handleChange}
              />
              {formData.resume && (
                <p className="apply-modal-file-name">Selected: {formData.resume.name}</p>
              )}
              {errors.resume && <p className="apply-modal-error-msg">{errors.resume}</p>}

              <label htmlFor="coverLetter" className="apply-modal-label">
                Cover Letter (optional)
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                className="apply-modal-textarea"
                rows="4"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Tell us more..."
              />

              <div className="apply-modal-buttons">
                <motion.button
                  type="submit"
                  className="apply-modal-submit-btn"
                  whileHover={{ scale: 1.05 }}
                  disabled={submitStatus === 'loading' || submitStatus === 'success'}
                >
                  {submitStatus === 'loading'
                    ? 'Submitting...'
                    : submitStatus === 'success'
                    ? 'Submitted ✓'
                    : 'Submit Application'}
                </motion.button>
                <motion.button
                  type="button"
                  className="apply-modal-cancel-btn"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                >
                  Cancel
                </motion.button>
              </div>

              {submitStatus === 'success' && (
                <motion.p
                  className="apply-modal-success-msg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ✅ Your application has been submitted!
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  className="apply-modal-error-msg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ❌ Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ApplyModal;
