// src/pages/Applicants.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Container, Table, Button, Alert, Spinner } from 'react-bootstrap';
import '../style/Applicants.css'; // Don't forget the CSS import

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);
  const [shortlistingId, setShortlistingId] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get('/recruiters/applicants');
        setApplicants(res.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
        setMessage({ type: 'danger', text: 'Failed to load applicants.' });
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const handleShortlist = async (id) => {
    setShortlistingId(id);
    try {
      await axios.put(`/recruiters/applicants/${id}/shortlist`);
      setApplicants((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, shortlisted: true } : app
        )
      );
      setMessage({ type: 'success', text: 'Applicant shortlisted!' });
    } catch (error) {
      console.error('Shortlist error:', error);
      setMessage({ type: 'danger', text: 'Error shortlisting applicant.' });
    } finally {
      setShortlistingId(null);
    }
  };

  return (
    <Container className="Applicant-container py-5">
      <h3 className="Applicant-title mb-4">Applicants</h3>

      {message.text && (
        <Alert
          variant={message.type}
          dismissible
          onClose={() => setMessage({ type: '', text: '' })}
          className="Applicant-alert"
        >
          {message.text}
        </Alert>
      )}

      {loading ? (
        <div className="Applicant-loader">
          <Spinner animation="border" role="status" />
        </div>
      ) : applicants.length === 0 ? (
        <p className="Applicant-empty">No applicants found.</p>
      ) : (
        <Table bordered responsive className="Applicant-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => (
              <tr key={app._id} className={app.shortlisted ? 'Applicant-row-shortlisted' : ''}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>
                  <a href={app.resumeUrl} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>
                <td>
                  {app.shortlisted ? (
                    <span className="text-success fw-semibold">Shortlisted</span>
                  ) : (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleShortlist(app._id)}
                      disabled={shortlistingId === app._id}
                      className="Applicant-shortlist-btn"
                    >
                      {shortlistingId === app._id ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-1" />
                          Shortlisting...
                        </>
                      ) : (
                        'Shortlist'
                      )}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Applicants;
