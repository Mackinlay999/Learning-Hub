import React from "react";
import { useTable } from "react-table";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "../style/AttendenceTracking.css"


const studentData = [
  { id: 1, name: "John Doe", attendance: "Present", progress: 85 },
  { id: 2, name: "Jane Smith", attendance: "Absent", progress: 60 },
  { id: 3, name: "Mark Wilson", attendance: "Late", progress: 40 },
];

const AttendanceTracking = () => {
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Attendance", accessor: "attendance" },
      {
        Header: "Progress",
        accessor: "progress",
        Cell: ({ value }) => (
          <div className="progress-bar">
            <CircularProgressbar
              value={value}
              text={`${value}%`}
              styles={buildStyles({
                textSize: "14px",
                pathColor: value > 70 ? "green" : value > 40 ? "orange" : "red",
              })}
            />
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: studentData });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="at-container">
      <h2 className="at-title">Attendance & Progress Tracking</h2>
      <table {...getTableProps()} className="at-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTracking;
