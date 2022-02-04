const {asiaConnection, koreaConnection} = require('../dbConfig')
const path = require("path");

const asiaCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/asia/landing.html'))
  },
  getExhibitParkSystems: async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/asia/exhibitParkSystems.html'))
  },

  getNanoScientific: async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/asia/exhibitNanoScientific.html'))
  },

  getSponsors : async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/asia/sponsors.html'))
  },

  // 프로그램과 세션 조인시켜서 가져오는것보다 따로가져오는게 프론트에서 랜더링하기 편함
  getPrograms: async (req, res) => {
    const sql = `SELECT * FROM programs`
    asiaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    })
  },

  getSessions: async (req, res) => {
    const sql = `SELECT * FROM program_sessions`
    asiaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    })
  },

}

module.exports = asiaCtrl