const europeCtrl = require("../controllers/europeCtrl");
const router = require("express").Router();

// page
router.route("/landing").get(europeCtrl.getLanding);

router.route("/register").post(europeCtrl.register);

router
  .route("/transaction")
  .post(europeCtrl.saveTransaction)
  .delete(europeCtrl.deleteTransaction);
// data

module.exports = router;
