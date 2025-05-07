import { useState, useRef, useEffect } from "react";
import axios from "./axios";
import "../style/AdminAssessmentsCertifications.css";

const AdminAssessmentsCertifications = () => {
  const [assessments, setAssessments] = useState([]);
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    type: "",
    status: "",
  });
  const [editAssessment, setEditAssessment] = useState(null);
  const [lastIssued, setLastIssued] = useState(null);
  const [loadingId, setLoadingId] = useState(null); // Per-button loading
  const canvasRef = useRef(null);

  useEffect(() => {
    axios
      .get("/getAssessments")
      .then((res) => setAssessments(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addAssessment = () => {
    const { title, type, status } = newAssessment;
    if (!title || !type || !status) {
      alert("Please enter all fields before adding.");
      return;
    }

    axios
      .post("/createAssessment", newAssessment)
      .then((res) => {
        setAssessments([...assessments, res.data]);
        setNewAssessment({ title: "", type: "", status: "" });
      })
      .catch((err) => console.error("Add error:", err));
  };

  const deleteAssessment = (id) => {
    axios
      .delete(`/deleteAssessment/${id}`)
      .then(() => {
        setAssessments(assessments.filter((a) => a._id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const startEdit = (assessment) => {
    setEditAssessment({ ...assessment });
  };

  const saveEdit = () => {
    const { title, type, status } = editAssessment;
    if (!title || !type || !status) {
      alert("Please fill all fields before saving.");
      return;
    }

    axios
      .put(`/updateAssessment/${editAssessment._id}`, editAssessment)
      .then((res) => {
        setAssessments(
          assessments.map((a) => (a._id === res.data._id ? res.data : a))
        );
        setEditAssessment(null);
      })
      .catch((err) => console.error("Update error:", err));
  };

  const issueCertificate = async (id) => {
    setLoadingId(id);

    try {
      const res = await axios.patch(`/issueCertificate/${id}`);
      const updated = assessments.map((a) =>
        a._id === id ? res.data : a
      );
      setAssessments(updated);
      setLastIssued(res.data);
      generateCertificate(res.data);
    } catch (err) {
      console.error("Issue certificate error:", err);
      alert("Failed to issue certificate.");
    } finally {
      setLoadingId(null);
    }
  };

  const generateCertificate = (assessment) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#333";
    ctx.font = "22px Arial";
    ctx.fillText("🎓 Certificate of Completion", 60, 50);

    ctx.font = "16px Arial";
    ctx.fillText("This certifies that you have completed", 60, 100);
    ctx.fillText(`"${assessment.title}" successfully.`, 60, 130);

    ctx.font = "14px Arial";
    ctx.fillText("Issued by: Your Platform", 60, 180);
  };

  const downloadCertificate = () => {
    if (!lastIssued) return alert("Please issue a certificate first!");
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${lastIssued.title}_certificate.png`;
    link.click();
  };

  const handleInputChange = (e) => {
    setNewAssessment({ ...newAssessment, [e.target.name]: e.target.value });
  };

  return (
    <div className="assessments-certifications">
      <h2 className="assessments-certifications-title">Assessments & Certifications</h2>

      <div className="assessments-certifications-form">
        <input
          type="text"
          name="title"
          placeholder="Assessment Title"
          value={newAssessment.title}
          onChange={handleInputChange}
          className="assessments-certifications-input"
        />
        <select
          name="type"
          value={newAssessment.type}
          onChange={handleInputChange}
          className="assessments-certifications-select"
        >
          <option value="">Select Type</option>
          <option value="Quiz">Quiz</option>
          <option value="Assignment">Assignment</option>
          <option value="Exam">Exam</option>
        </select>
        <select
          name="status"
          value={newAssessment.status}
          onChange={handleInputChange}
          className="assessments-certifications-select"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <button className="assessments-certifications-add" onClick={addAssessment}>
          Add Assessment
        </button>
      </div>

      <table className="assessments-certifications-table">
        <thead>
          <tr className="assessments-certifications-tr">
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Certificate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assessments.length === 0 ? (
            <tr>
              <td colSpan="6">No assessments available.</td>
            </tr>
          ) : (
            assessments.map((assessment, index) => (
              <tr key={assessment._id}>
                <td>{index + 1}</td>
                <td>
                  {editAssessment && editAssessment._id === assessment._id ? (
                    <input
                      type="text"
                      value={editAssessment.title}
                      onChange={(e) =>
                        setEditAssessment({
                          ...editAssessment,
                          title: e.target.value,
                        })
                      }
                      className="assessments-certifications-input"
                    />
                  ) : (
                    assessment.title
                  )}
                </td>
                <td>
                  {editAssessment && editAssessment._id === assessment._id ? (
                    <select
                      value={editAssessment.type}
                      onChange={(e) =>
                        setEditAssessment({
                          ...editAssessment,
                          type: e.target.value,
                        })
                      }
                      className="assessments-certifications-select"
                    >
                      <option value="Quiz">Quiz</option>
                      <option value="Assignment">Assignment</option>
                      <option value="Exam">Exam</option>
                    </select>
                  ) : (
                    assessment.type
                  )}
                </td>
                <td>
                  {editAssessment && editAssessment._id === assessment._id ? (
                    <select
                      value={editAssessment.status}
                      onChange={(e) =>
                        setEditAssessment({
                          ...editAssessment,
                          status: e.target.value,
                        })
                      }
                      className="assessments-certifications-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    assessment.status
                  )}
                </td>
                <td>
                  {assessment.issuedCertificate ? "Issued" : "Not Issued"}
                </td>
                <td>
                  {editAssessment && editAssessment._id === assessment._id ? (
                    <button className="assessments-certifications-save" onClick={saveEdit}>
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="assessments-certifications-edit"
                        onClick={() => startEdit(assessment)}
                      >
                        Edit
                      </button>
                      <button
                        className="assessments-certifications-delete"
                        onClick={() => deleteAssessment(assessment._id)}
                      >
                        Delete
                      </button>
                      {!assessment.issuedCertificate ? (
                        <button
                          className="assessments-certifications-certificate"
                          onClick={() => issueCertificate(assessment._id)}
                          disabled={loadingId === assessment._id}
                        >
                          {loadingId === assessment._id
                            ? "Issuing..."
                            : "Issue Certificate"}
                        </button>
                      ) : (
                        <button
                          className="assessments-certifications-download"
                          onClick={() => {
                            setLastIssued(assessment);
                            generateCertificate(assessment);
                          }}
                        >
                          Download Certificate
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {lastIssued && (
        <canvas
          ref={canvasRef}
          width={400}
          height={250}
          className="assessments-certifications-canvas"
        ></canvas>
      )}

      {lastIssued && (
        <button
          className="assessments-certifications-download-btn"
          onClick={downloadCertificate}
        >
          Download Certificate as Image
        </button>
      )}
    </div>
  );
};

export default AdminAssessmentsCertifications;
