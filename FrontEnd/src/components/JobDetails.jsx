import React from 'react';
import { motion } from 'framer-motion';
import '../style/JobDetails.css';

const jobData = {
  id: 1,
  title: 'Senior Frontend Developer',
  company: {
    name: 'Tech Solutions Inc.',
    logoUrl: 'https://via.placeholder.com/80', // Replace with real company logo URL
    website: 'https://techsolutions.example.com',
    about:
      'Tech Solutions Inc. is a leading technology company specializing in web and mobile solutions, dedicated to innovation and customer satisfaction.',
  },
  location: 'Remote',
  type: 'Full-time',
  posted: '3 days ago',
  description:
    `We are seeking a highly skilled Senior Frontend Developer to join our dynamic team. You will work on cutting-edge web applications using React and modern JavaScript technologies.`,
  responsibilities: [
    'Develop and maintain scalable web applications.',
    'Collaborate with UX/UI designers to implement designs.',
    'Write clean, efficient, and well-documented code.',
    'Participate in code reviews and agile ceremonies.',
  ],
  qualifications: [
    '5+ years experience in frontend development.',
    'Expertise in React.js and Redux.',
    'Strong knowledge of HTML5, CSS3, JavaScript (ES6+).',
    'Experience with RESTful APIs and modern build tools.',
  ],
  benefits: [
    'Competitive salary and benefits package.',
    'Flexible working hours and remote work options.',
    'Professional development and training opportunities.',
    'Inclusive and collaborative company culture.',
  ],
};

function JobDetails() {
  return (
    <motion.div
      className="job-details-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <header className="job-details-header">
        <motion.img
          src={jobData.company.logoUrl}
          alt={`${jobData.company.name} logo`}
          className="job-details-company-logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <div className="job-details-title-info">
          <h1 className="job-details-title">{jobData.title}</h1>
          <a
            href={jobData.company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="job-details-company-name"
          >
            {jobData.company.name}
          </a>
          <p className="job-details-location">{jobData.location}</p>
          <p className="job-details-type-posted">
            <span className="job-details-type">{jobData.type}</span> &middot;{' '}
            <span className="job-details-posted">Posted {jobData.posted}</span>
          </p>
        </div>
        <motion.button
          className="job-details-apply-btn"
          whileHover={{ scale: 1.05, backgroundColor: '#005b91' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Apply Now
        </motion.button>
      </header>

      <main className="job-details-main">
        <section className="job-details-section">
          <h2 className="job-details-section-title">Job Description</h2>
          <p className="job-details-description">{jobData.description}</p>
        </section>

        <section className="job-details-section">
          <h2 className="job-details-section-title">Responsibilities</h2>
          <ul className="job-details-list">
            {jobData.responsibilities.map((item, i) => (
              <li key={i} className="job-details-list-item">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="job-details-section">
          <h2 className="job-details-section-title">Qualifications</h2>
          <ul className="job-details-list">
            {jobData.qualifications.map((item, i) => (
              <li key={i} className="job-details-list-item">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="job-details-section">
          <h2 className="job-details-section-title">Benefits</h2>
          <ul className="job-details-list">
            {jobData.benefits.map((item, i) => (
              <li key={i} className="job-details-list-item">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="job-details-section job-details-company-overview">
          <h2 className="job-details-section-title">About {jobData.company.name}</h2>
          <p>{jobData.company.about}</p>
        </section>
      </main>
    </motion.div>
  );
}

export default JobDetails;
