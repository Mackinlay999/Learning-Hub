const Webinar = require("../Model/webinarModel");
const ExcelJS = require("exceljs"); // You'll need to install this: npm i exceljs



// Create a new webinar
const createWebinar = async (req, res) => {
  try {
    const { title, dateTime, description, link, typeofProgram } = req.body;
    const newWebinar = new Webinar({ title, dateTime, description, link, typeofProgram });
    await newWebinar.save();
    res.status(201).json({ message: "Webinar created successfully", webinar: newWebinar });
  } catch (error) {
    res.status(400).json({ message: "Error creating webinar", error: error.message });
  }
};

// Get all webinars
const getAllWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find();
    res.status(200).json(webinars);
  } catch (error) {
    res.status(400).json({ message: "Error fetching webinars", error: error.message });
  }
};

// Existing create/getAll functions...

// ✅ View Registrants
const getRegistrants = async (req, res) => {
  try {
    const webinars = await Webinar.find().populate("registrants", "name email phone");
    const registrants = webinars.flatMap((webinar) =>
      webinar.registrants.map((user) => ({
        webinarTitle: webinar.title,
        name: user.name,
        email: user.email,
        phone: user.phone || "N/A",
      }))
    );
    res.status(200).json(registrants);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch registrants", error: error.message });
  }
};

// ✅ Export Attendance (Excel)
const exportAttendance = async (req, res) => {
  try {
    const webinars = await Webinar.find().populate("registrants", "name email phone");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Webinar Attendance");

    worksheet.columns = [
      { header: "Webinar Title", key: "webinarTitle", width: 30 },
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 15 },
    ];

    webinars.forEach((webinar) => {
      webinar.registrants.forEach((user) => {
        worksheet.addRow({
          webinarTitle: webinar.title,
          name: user.name,
          email: user.email,
          phone: user.phone || "N/A",
        });
      });
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=attendance.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Failed to export attendance", error: error.message });
  }
};


module.exports = { createWebinar, getAllWebinars, getRegistrants, exportAttendance };