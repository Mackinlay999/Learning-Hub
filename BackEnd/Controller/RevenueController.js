const Revenue = require("../Model/RevenueScheme")

const RevenueController ={


// Add a Revenue
addRevenue : async (req, res) => {
  try {
    const { username, email, amount, paymentMode, status } = req.body;

    const newRevenue = new Revenue({
      username,
      email,
      amount,
      paymentMode,
      status,
      date: new Date()
    });

    await newRevenue.save();

    res.status(201).json({ message: "Revenue entry added successfully", data: newRevenue });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
},
getRevenue : async (req, res) => {
  const Revenues = await Revenue.find().sort({ date: -1 });
  res.status(201).json(Revenues);
},

// Update a Revenue
 updateRevenue : async (req, res) => {
  const { id } = req.params;
  const {date, username, amount, paymentMode, status } = req.body;
  const updated = await Revenue.findByIdAndUpdate(
    id,
    { amount, paymentMode, status ,date, username,},
    { new: true }
  );
  res.json(updated);
},

// Delete a Revenue
 deleteRevenue : async (req, res) => {
  try
  {
  const { id } = req.params;
  await Revenue.findByIdAndDelete(id);
  res.status(201).json({message:"delete successfully"});
  }
  catch(err){
    res.status(401).json({err:"not delete"  ,err });
  }
}






}
module.exports =RevenueController;
