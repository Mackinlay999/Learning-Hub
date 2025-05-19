const Contact = require("../Model/ContactScheme");
const transporter = require("../Utils/Nodemailerconfig");

 const Contactfrom = { 
    
    submitContactForm : async (req, res) => {
  const { name, email, phone, learningDomain } = req.body;

  console.log("contact form ");
  

  if (!name || !email || !phone || !learningDomain) {
    return res.status(400).json({ err: "All fields are required" });
  }

  try {
    // Save data to the database
    const newContact = new Contact({ name, email, phone, learningDomain });
    await newContact.save();

    // Send Email
    const mailOptions = {
      from: process.env.EMAIL,
      to: "harikrishg44@gmail.com", // Replace with recipient email
      subject: "New Contact Form Submission",
      text: `You received a new contact submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLearning Domain: ${learningDomain}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Form submitted and email sent successfully!" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
 }

 module.exports = Contactfrom
