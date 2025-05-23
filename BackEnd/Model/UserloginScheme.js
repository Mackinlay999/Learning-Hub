const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    number: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Ensures the number is exactly 10 digits
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    role: {
      type: "String",
      enum: ["user"],
      default: "user",
    },

    filename: { type: String },
    path: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    uploadedAt: { type: Date, default: Date.now },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
    // dripStepsSent: [
    //   {
    //     step: String,
    //     sentAt: Date,
    //   },
    // ],
    lastLogin: { type: Date },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    // resetPasswordExpires: Date.now ,
  },

  { timestamps: true }
);

module.exports = mongoose.model("user", userScheme);
