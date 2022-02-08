const path = require("path");

const commonCtrl = {
  getLanding:async (req,res) => {
    res.sendFile(path.join(__dirname,'..','public/common/landing.html'))
  },
}

module.exports = commonCtrl