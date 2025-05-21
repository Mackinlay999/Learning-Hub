import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import '../style/JobList.css';

const allJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    type: 'Full-time',
    posted: '3 days ago',
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Innovatech',
    location: 'New York, NY',
    type: 'Part-time',
    posted: '1 week ago',
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'DataWorks',
    location: 'San Francisco, CA',
    type: 'Contract',
    posted: '2 weeks ago',
  },
  {
    id: 4,
    title: 'UX Designer',
    company: 'Creative Minds',
    location: 'Remote',
    type: 'Internship',
    posted: '4 days ago',
  },
  {
    id: 5,
    title: 'Product Manager',
    company: 'Global Corp',
    location: 'Chicago, IL',
    type: 'Full-time',
    posted: '5 days ago',
  },
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

function JobList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Filter jobs based on search term and selected job types
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(job.type);

      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedTypes]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <motion.div
      className="job-list-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="job-list-title">Available Jobs</h2>

      <div className="job-list-filters">
        <input
          type="text"
          placeholder="Search by job title, company or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="job-list-search-input"
        />

        <div className="job-list-type-filters">
          {jobTypes.map((type) => (
            <button
              key={type}
              className={`job-list-type-btn ${
                selectedTypes.includes(type) ? 'selected' : ''
              }`}
              onClick={() => toggleType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <ul className="job-list-jobs">
        {filteredJobs.length === 0 && (
          <p className="job-list-no-results">No jobs found matching your criteria.</p>
        )}
        {filteredJobs.map((job) => (
          <motion.li
            key={job.id}
            className="job-list-job-card"
            whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <div className="job-list-job-info">
              <h3 className="job-list-job-title">{job.title}</h3>
              <p className="job-list-company">{job.company}</p>
              <p className="job-list-location">{job.location}</p>
              <p className="job-list-type">{job.type}</p>
            </div>
            <div className="job-list-job-meta">
              <p className="job-list-posted">Posted {job.posted}</p>
              <button className="job-list-apply-btn">Apply</button>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default JobList;
