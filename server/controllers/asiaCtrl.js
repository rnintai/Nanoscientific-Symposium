const connection = require('../dbConfig')
const path = require("path");

const asiaCtrl = {
    getExhibit: async (req, res) => {
        console.log(path.join(__dirname,'..','public/asia/exhibit_hall/exhibit.html'))
        res.sendFile(path.join(__dirname,'..','public/asia/exhibit_hall/exhibit.html'))
    }
}

module.exports = asiaCtrl