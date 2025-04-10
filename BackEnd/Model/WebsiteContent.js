const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
  title: String,
  description: String,
  keywords: String
}, { _id: false });

const websiteContentSchema = new mongoose.Schema({
  homepage: String,
  programs: String,
  blog: String,
  successStories: String,
  seo: seoSchema
}, { timestamps: true });

module.exports = mongoose.model("WebsiteContent", websiteContentSchema);
