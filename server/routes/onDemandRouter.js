const router = require("express").Router();
const onDemandCtrl = require("../controllers/onDemandCtrl");

router
  .route("/")
  .get(onDemandCtrl.getOnDemandList)
  .post(onDemandCtrl.editOnDemandList)
  .delete(onDemandCtrl.deleteOnDemandList);

module.exports = router;
