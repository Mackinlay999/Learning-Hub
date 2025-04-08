const LiveSession = require("../Model/LiveSessionsScheme");
const { log } = require("../Utils/logger");

const LiveSessionandWebinars ={

    createSession : async (req, res) => {
        try {
        console.log("create session");

        const {title,platform,date,time,attendees} =req.body
        if(!title || !platform || !date || !time || !attendees){
            res.status(400).json({err:"fill the all deta"})
        }
        
          const session = new LiveSession(req.body);
          await session.save();
          res.status(201).json(session);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },

      getAllSessions : async (req, res) => {
        try {
          const sessions = await LiveSession.find();
          res.json(sessions);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      updateSession : async (req, res) => {
        try {
          const session = await LiveSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
          res.json(session);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
      deleteSession : async (req, res) => {
        try {
          await LiveSession.findByIdAndDelete(req.params.id);
          res.json({ message: 'Session deleted successfully' });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }

    }
}
module.exports = LiveSessionandWebinars