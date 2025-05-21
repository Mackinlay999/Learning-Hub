import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', onEsc);
    }
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.resume) newErrors.resume = 'Resume is required';
    return newErrors;
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: null }));
    setSubmitStatus(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    // Simulate async submission
    setSubmitStatus('loading');
    setTimeout(() => {
      setSubmitStatus('success');
      // Reset form or keep data as per UX choice
      // setFormData({ name: '', email: '', phone: '', resume: null, coverLetter: '' });
    }, 1500);
  }

  function handleOverlayClick(e) {
    if (e.target.classList.contains('apply-modal-overlay')) {
      onClose();
    }
  }

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
            aria-labelledby="apply-modal-title"
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
              <label className="apply-modal-label" htmlFor="name">
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
                autoComplete="name"
                required
              />
              {errors.name && <p className="apply-modal-error-msg">{errors.name}</p>}

              <label className="apply-modal-label" htmlFor="email">
                Email<span className="apply-modal-required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`apply-modal-input ${errors.email ? 'apply-modal-error-input' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                autoComplete="email"
                required
              />
              {errors.email && <p className="apply-modal-error-msg">{errors.email}</p>}

              <label className="apply-modal-label" htmlFor="phone">
                Phone Number<span className="apply-modal-required">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`apply-modal-input ${errors.phone ? 'apply-modal-error-input' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                autoComplete="tel"
                required
              />
              {errors.phone && <p className="apply-modal-error-msg">{errors.phone}</p>}

              <label className="apply-modal-label" htmlFor="resume">
                Resume (PDF or DOC)<span className="apply-modal-required">*</span>
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className={`apply-modal-input-file ${errors.resume ? 'apply-modal-error-input' : ''}`}
                onChange={handleChange}
                required
              />
              {errors.resume && <p className="apply-modal-error-msg">{errors.resume}</p>}

              <label className="apply-modal-label" htmlFor="coverLetter">
                Cover Letter (optional)
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                className="apply-modal-textarea"
                rows="4"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Tell us why you're a great fit..."
              ></textarea>

              <div className="apply-modal-buttons">
                <motion.button
                  type="submit"
                  className="apply-modal-submit-btn"
                  whileHover={{ scale: 1.05, backgroundColor: '#005b91' }}
                  disabled={submitStatus === 'loading'}
                >
                  {submitStatus === 'loading' ? 'Submitting...' : 'Submit Application'}
                </motion.button>
                <motion.button
                  type="button"
                  className="apply-modal-cancel-btn"
                  onClick={onClose}
                  whileHover={{ scale: 1.05, backgroundColor: '#ccc' }}
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
                  Application submitted successfully!
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
