const connection = require('../dbConfig')
const path = require("path");

const asiaCtrl = {
    getLanding:async (req,res) => {
        res.sendFile(path.join(__dirname,'..','public/asia/landing.html'))
    },
    getExhibit: async (req, res) => {
        res.sendFile(path.join(__dirname,'..','public/asia/exhibit.html'))
    }
}

module.exports = asiaCtrl