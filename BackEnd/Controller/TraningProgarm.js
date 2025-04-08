const TraningProgram = require("../Model/TraningProgramScheme");
const { log } = require("../Utils/logger");


const Course =
{ 
    
    createProgram :async(req,res)=>{

        console.log("create progaem");
        
        const { name, instructor, duration,price } = req.body;

        if( !name || !instructor || !duration || !price ){
          return res.status(400).json({err  :"fill the all the data"})
        }
        const newTraningProgram = new TraningProgram({name, instructor, duration,price })
        await newTraningProgram.save();
        res.status(201).json({message : "successfully created"});
},

    updateProgram : async (req, res) => {
        console.log("update");
        
        const { id } = req.params;
        const { name, instructor, duration,price } = req.body;
      
        const course = await TraningProgram.findByIdAndUpdate(
          id,
          { name, instructor, duration,price },
          { new: true }
        );
      
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
      },

      getProgram : async (req, res) => {
        console.log("allprogra,");
        
        const courses = await TraningProgram.find();
        res.json(courses);
      },


      deleteProgram : async (req, res) => {
        console.log("deleteprogram");
        
        const { id } = req.params;
        const course = await TraningProgram.findByIdAndDelete(id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json({ message: "Course deleted successfully" });
      }
}






module.exports = Course;