const abstractCtrl = require("../controllers/abstractCtrl");
const router = require("express").Router();

router.route("/").post(abstractCtrl.submitAbstract);

module.exports = router;
