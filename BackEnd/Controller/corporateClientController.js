const CorporateClient = require("../Model/CorporateClient.js");

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await CorporateClient.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};

// Add a new client
exports.createClient = async (req, res) => {
  try {
    const newClient = new CorporateClient(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ error: "Failed to add client" });
  }
};

// Update a client
exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await CorporateClient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ error: "Failed to update client" });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    await CorporateClient.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete client" });
  }
};
