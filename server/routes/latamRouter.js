const latamCtrl = require("../controllers/latamCtrl");
const router = require("express").Router();

// page
router.route("/landing").get(latamCtrl.getLanding);

// data

module.exports = router;
