import { useState, useRef } from "react";
import "../style/AssessmentsCertifications.css";

const AssessmentsCertifications = () => {
  const [assessments, setAssessments] = useState([
    { id: 1, title: "React Quiz", type: "Quiz", status: "Active", issuedCertificate: false },
    { id: 2, title: "Node.js Assignment", type: "Assignment", status: "Pending", issuedCertificate: false },
  ]);
  const [newAssessment, setNewAssessment] = useState({ title: "", type: "Quiz", status: "Pending" });
  const [editAssessment, setEditAssessment] = useState(null);
  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    setNewAssessment({ ...newAssessment, [e.target.name]: e.target.value });
  };

  const addAssessment = () => {
    if (!newAssessment.title) return;
    setAssessments([...assessments, { id: assessments.length + 1, ...newAssessment, issuedCertificate: false }]);
    setNewAssessment({ title: "", type: "Quiz", status: "Pending" });
  };

  const deleteAssessment = (id) => {
    setAssessments(assessments.filter((assessment) => assessment.id !== id));
  };

  const startEdit = (assessment) => {
    setEditAssessment(assessment);
  };

  const saveEdit = () => {
    setAssessments(assessments.map((a) => (a.id === editAssessment.id ? editAssessment : a)));
    setEditAssessment(null);
  };

  const issueCertificate = (id) => {
    setAssessments(assessments.map((a) => (a.id === id ? { ...a, issuedCertificate: true } : a)));
    generateCertificate(id);
  };

  const generateCertificate = (id) => {
    const assessment = assessments.find((a) => a.id === id);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = "#333";
    ctx.font = "20px Arial";
    ctx.fillText("Certificate of Completion", 100, 50);

    // Recipient Name
    ctx.font = "16px Arial";
    ctx.fillText(`This certifies that you have completed`, 80, 100);
    ctx.fillText(`"${assessment.title}" successfully`, 80, 130);

    // Footer
    ctx.font = "14px Arial";
    ctx.fillText("Issued by: Your Platform", 80, 180);
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "certificate.png";
    link.click();
  };

  return (
    <div className="assessments">
      <h2 className="title">Assessments & Certifications</h2>
      <div className="assessment-form">
        <input type="text" name="title" placeholder="Assessment Title" value={newAssessment.title} onChange={handleInputChange} />
        <select name="type" value={newAssessment.type} onChange={handleInputChange}>
          <option value="Quiz">Quiz</option>
          <option value="Assignment">Assignment</option>
          <option value="Exam">Exam</option>
        </select>
        <button className="add-assessment" onClick={addAssessment}>Add Assessment</button>
      </div>
      <table className="assessment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Certificate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((assessment) => (
            <tr key={assessment.id}>
              <td>{assessment.id}</td>
              <td>
                {editAssessment && editAssessment.id === assessment.id ? (
                  <input type="text" value={editAssessment.title} onChange={(e) => setEditAssessment({ ...editAssessment, title: e.target.value })} />
                ) : (
                  assessment.title
                )}
              </td>
              <td>{assessment.type}</td>
              <td>{assessment.status}</td>
              <td>{assessment.issuedCertificate ? "Issued" : "Not Issued"}</td>
              <td>
                {editAssessment && editAssessment.id === assessment.id ? (
                  <button className="save" onClick={saveEdit}>Save</button>
                ) : (
                  <>
                    <button className="edit" onClick={() => startEdit(assessment)}>Edit</button>
                    <button className="delete" onClick={() => deleteAssessment(assessment.id)}>Delete</button>
                    {!assessment.issuedCertificate ? (
                      <button className="certificate" onClick={() => issueCertificate(assessment.id)}>Issue Certificate</button>
                    ) : (
                      <button className="download" onClick={downloadCertificate}>Download Certificate</button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <canvas ref={canvasRef} width={400} height={250} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default AssessmentsCertifications;
