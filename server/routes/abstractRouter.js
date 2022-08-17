const abstractCtrl = require("../controllers/abstractCtrl");
const router = require("express").Router();

// /api/abstract
router
  .route("/")
  .get(abstractCtrl.getSubmissions)
  .post(abstractCtrl.submitAbstract);

module.exports = router;
