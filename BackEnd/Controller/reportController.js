const Report = require("../Model/Report.js");
const ExcelJS = require("exceljs"); // for Excel downloads

// Create a new report
const createReport = async (req, res, next) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
};

// Get all reports
const getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};

// Update a report
const updateReport = async (req, res, next) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

// Delete a report
const deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    next(error);
  }
};


// Download report by ID
const downloadReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const { type, title, prediction } = report;

    if (type === "Excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Report");

      worksheet.columns = [
        { header: "Title", key: "title", width: 30 },
        { header: "Prediction", key: "prediction", width: 50 },
      ];

      worksheet.addRow({ title, prediction });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", `attachment; filename=${title}.xlsx`);
      await workbook.xlsx.write(res);
      res.end();
    } else if (type === "CSV") {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=${title}.csv`);
      res.write(`Title,Prediction\n"${title}","${prediction}"`);
      res.end();
    } else if (type === "PDF") {
      const PDFDocument = require("pdfkit");
      const doc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${title}.pdf`);

      doc.pipe(res);
      doc.fontSize(18).text("Report Title: " + title);
      doc.moveDown();
      doc.fontSize(14).text("AI Prediction:");
      doc.fontSize(12).text(prediction);
      doc.end();
    } else {
      res.status(400).json({ message: "Unsupported file type" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReport,
  getAllReports,
  updateReport,
  deleteReport,
  downloadReport,
};