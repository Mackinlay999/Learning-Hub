const File = require("../Model/FileScheme");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const FileUplode = {
  uploadFile: async (req, res) => {
    console.log("plese  fill the form");

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    try {
      // Save file details to MongoDB
      const newFile = new File({
        program: req.body.learningDomain,
        experience: req.body.workExperience,
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });

      await newFile.save();

      // Send Email with Attachment
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: "harikrishg44@gmail.com",
        subject: "File Uploaded Successfully",
        text: `A new file has been uploaded:\n\nProgram: ${req.body.learningDomain}\nExperience: ${req.body.workExperience}\nFilename: ${req.file.filename}`,
        attachments: [
          {
            filename: req.file.filename,
            path: req.file.path,
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email error:", error);
          return res
            .status(500)
            .json({ message: "File saved, but email failed" });
        }
        res
          .status(201)
          .json({
            message: "File uploaded, saved, and emailed successfully!",
            file: newFile,
          });
      });
    } catch (error) {
      res.status(500).json({ message: "Error saving file", error });
    }
  },
};

module.exports = FileUplode;
