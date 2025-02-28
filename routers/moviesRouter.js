const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

//index
router.get("/", movieController.index);

//show
router.get("/:id", movieController.show);

//Store
router.post("/:id/reviews", movieController.storeReview);

//destroy
router.delete("/:id", movieController.destroy);

module.exports = router;
