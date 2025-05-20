import React, { useEffect, useMemo, useState } from "react";
import axios from "./axios";
import { useNavigate } from "react-router-dom";
import "../style/AdminMentor.css"; // Adjust the path as necessary

const AdminMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [newMentor, setNewMentor] = useState({
    name: "",
    expertise: "",
    status: "Active",
    photo: null, // For handling file input
    email: "",
    mobile: "",
  });
  const [editId, setEditId] = useState(null);
  const [editedMentor, setEditedMentor] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch mentors on component mount
  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/mentors");
      setMentors(data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete mentor
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/mentors/${id}`);
      setMentors((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Error deleting mentor:", error);
    }
  };

  // Add mentor
  const handleAddMentor = async () => {
    const formData = new FormData();
    Object.entries(newMentor).forEach(([key, value]) =>
      formData.append(key, value)
    );

    try {
      setLoading(true);
      const { data } = await axios.post("/mentors", formData);
      setMentors([...mentors, data]);
      setNewMentor({
        name: "",
        expertise: "",
        status: "Active",
        photo: null,
        email: "",
        mobile: "",
      });
    } catch (error) {
      console.error("Error adding mentor:", error);
    } finally {
      setLoading(false);
    }
  };

  // Edit mentor
  const handleEdit = (mentor) => {
    setEditId(mentor._id);
    setEditedMentor({ ...mentor });
  };

  // Save edited mentor
  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/mentors/${editId}`, editedMentor);
      setMentors((prev) =>
        prev.map((mentor) => (mentor._id === editId ? data : mentor))
      );
      setEditId(null);
      setEditedMentor({});
    } catch (error) {
      console.error("Error updating mentor:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get badge class for mentor status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Retired":
        return "warning";
      default:
        return "light";
    }
  };

  // Filter mentors based on search, expertise, and status filters
  const filteredMentors = useMemo(() => {
    return mentors.filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) &&
        (expertiseFilter ? m.expertise === expertiseFilter : true) &&
        (statusFilter ? m.status === statusFilter : true)
    );
  }, [mentors, search, expertiseFilter, statusFilter]);

  return (
    <div className="admin-mentors-container mt-4">
      <h3 className="admin-mentors-title mb-4">Mentor Management</h3>

      {/* Filters */}
      <div className="admin-mentors-filters row mb-3 g-2">
        <div className="col-md-4">
          <input
            className="admin-mentors-search form-control"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="admin-mentors-expertise-filter form-select"
            value={expertiseFilter}
            onChange={(e) => setExpertiseFilter(e.target.value)}
          >
            <option value="">Filter by Expertise</option>
            <option value="Human-resource">Human-resource</option>
            <option value="Marketing">Marketing</option>
            <option value="Business-Analytics">Business Analytics</option>
            <option value="Finances">Finances</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="admin-mentors-status-filter form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filter by Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Retired">Retired</option>
          </select>
        </div>
      </div>

      {/* Add Mentor */}
      <div className="admin-mentors-card mb-4 p-3">
        <h5 className="admin-mentors-card-title">Add New Mentor</h5>
        <div className="admin-mentors-form row g-2">
          <input
            className="admin-mentors-input form-control col"
            placeholder="Name"
            value={newMentor.name}
            onChange={(e) =>
              setNewMentor({ ...newMentor, name: e.target.value })
            }
          />
          <input
            className="admin-mentors-input form-control col"
            placeholder="Expertise"
            value={newMentor.expertise}
            onChange={(e) =>
              setNewMentor({ ...newMentor, expertise: e.target.value })
            }
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) =>
              setNewMentor({ ...newMentor, photo: e.target.files[0] })
            }
          />

          <input
            className="admin-mentors-input form-control col"
            placeholder="Email"
            value={newMentor.email}
            onChange={(e) =>
              setNewMentor({ ...newMentor, email: e.target.value })
            }
          />
          <input
            className="admin-mentors-input form-control col"
            placeholder="Mobile"
            value={newMentor.mobile}
            onChange={(e) =>
              setNewMentor({ ...newMentor, mobile: e.target.value })
            }
          />
          <select
            className="admin-mentors-input form-control col"
            value={newMentor.status}
            onChange={(e) =>
              setNewMentor({ ...newMentor, status: e.target.value })
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Retired">Retired</option>
          </select>
          <button
            className="admin-mentors-add-btn btn btn-primary col"
            onClick={handleAddMentor}
            disabled={loading}
          >
            Add
          </button>
        </div>
      </div>

      {/* Table View */}
      <table className="admin-mentors-table table table-striped table-hover table-bordered shadow-sm">
        <thead className="admin-mentors-table-head table-dark">
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Expertise</th>
            <th>Status</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMentors.map((mentor) => (
            <tr key={mentor._id}>
              <td>
                <img
                  src={
                    mentor.photo
                      ? `https://learning-hub-p2yq.onrender.com${mentor.photo}`
                      : "https://via.placeholder.com/40" // Or your custom default image
                  }
                  alt="mentor"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </td>
              <td>
                {editId === mentor._id ? (
                  <input
                    value={editedMentor.name}
                    onChange={(e) =>
                      setEditedMentor({
                        ...editedMentor,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span
                    onClick={() => navigate(`/admin/mentors/${mentor._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {mentor.name}
                  </span>
                )}
              </td>
              <td>
                {editId === mentor._id ? (
                  <input
                    value={editedMentor.expertise}
                    onChange={(e) =>
                      setEditedMentor({
                        ...editedMentor,
                        expertise: e.target.value,
                      })
                    }
                  />
                ) : (
                  mentor.expertise
                )}
              </td>
              <td>
                {editId === mentor._id ? (
                  <select
                    value={editedMentor.status}
                    onChange={(e) =>
                      setEditedMentor({
                        ...editedMentor,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Retired">Retired</option>
                  </select>
                ) : (
                  <span
                    className={`badge bg-${getStatusBadgeClass(mentor.status)}`}
                  >
                    {mentor.status}
                  </span>
                )}
              </td>
              <td>
                {editId === mentor._id ? (
                  <input
                    value={editedMentor.email}
                    onChange={(e) =>
                      setEditedMentor({
                        ...editedMentor,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  mentor.email
                )}
              </td>
              <td>
                {editId === mentor._id ? (
                  <input
                    value={editedMentor.mobile}
                    onChange={(e) =>
                      setEditedMentor({
                        ...editedMentor,
                        mobile: e.target.value,
                      })
                    }
                  />
                ) : (
                  mentor.mobile
                )}
              </td>
              <td>
                {editId === mentor._id ? (
                  <button
                    className="admin-mentors-save-btn btn btn-sm btn-success me-2"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="admin-mentors-edit-btn btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(mentor)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="admin-mentors-delete-btn btn btn-sm btn-danger"
                  onClick={() => handleDelete(mentor._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMentors;
