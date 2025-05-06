import { useState } from "react";
import "../style/AdminReport.css"

const  AdminReport = () =>{
  const [reports, setReports] = useState([
    { id: 1, title: "Monthly Revenue", data: "$5000" },
    { id: 2, title: "Student Enrollment", data: "150 Students" },
    { id: 3, title: "Course Completion Rate", data: "85%" },
  ]);

  const handleDownload = (reportTitle) => {
    alert(`Downloading report: ${reportTitle}`);
  };

  return (
    <div className="reports">
      <h1 className="page-title">Reports & Analytics</h1>
      <div className="report-list">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            <h3>{report.title}</h3>
            <p>{report.data}</p>
            <button className="download-btn" onClick={() => handleDownload(report.title)}>
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReport;