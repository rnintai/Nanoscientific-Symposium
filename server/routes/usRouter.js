const router = require("express").Router();
const usCtrl = require("../controllers/koreaCtrl");

// page
router.route("/landing").get(usCtrl.getLanding);

// data

module.exports = router;
