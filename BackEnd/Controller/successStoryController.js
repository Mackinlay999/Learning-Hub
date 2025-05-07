const SuccessStory = require("../Model/successStoryScheme");

const SuccessStroyController ={
getAllStories : async (req, res) => {
  try {
    const stories = await SuccessStory.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

// Add a story
createStory : async (req, res) => {
  try {

    const { name, company,LinkedinUrl } = req.body;

    if (!name || !company || !LinkedinUrl) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const uploadedPhoto = req.file ? `/uploads/${req.file.filename}` : null;
    const story = new SuccessStory({
      name,
      company,
      photo: uploadedPhoto,
      LinkedinUrl: req.body.LinkedinUrl, 
    });
    console.log("Uploaded file path:", req.file.path);


    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},

// Update a story
updateStory : async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company,  LinkedinUrl  } = req.body;

    const updatedFields = { name, company,  LinkedinUrl  };

    if (req.file) {
      updatedFields.photo = `/uploads/${req.file.filename}`; // publicly accessible path
    }

    const story = await SuccessStory.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    res.json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},

// Delete a story
deleteStory : async (req, res) => {
  try {
    const { id } = req.params;
    const story = await SuccessStory.findByIdAndDelete(id);
    if (!story) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

// Toggle visibility
toggleVisibility : async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Not found" });

    story.visible = !story.visible;
    await story.save();
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
}
module.exports=SuccessStroyController;
