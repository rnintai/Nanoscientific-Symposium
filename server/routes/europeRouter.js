const europeCtrl = require("../controllers/europeCtrl");
const router = require("express").Router();

// page
router.route("/landing").get(europeCtrl.getLanding);

// data

module.exports = router;
