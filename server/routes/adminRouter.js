const adminCtrl = require("../controllers/adminCtrl");
const router = require("express").Router();

// page

router
  .route("/session")
  .post(adminCtrl.addSession)
  .put(adminCtrl.modifySession);

router
  .route("/program")
  .post(adminCtrl.addProgram)
  .put(adminCtrl.modifyProgram);

router.route("/hideProgram").get(adminCtrl.getHideProgram);
router.route("/hideSession").get(adminCtrl.getHideSession);

router.route("/showProgram").put(adminCtrl.showProgram);
router.route("/showSession").put(adminCtrl.showSession);
module.exports = router;
