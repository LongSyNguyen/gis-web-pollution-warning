const router = require("express").Router();
const airController = require("../controllers/APIcontroller/air");
const recordCleanup = require("../middlewares/recordCleanup");

const initAPIRoute = (app) => {
  /**
   * @description ACCOUNTS
   */
  router.post("/register", airController.addAirInfo);
  // router.post("/login", authController.loginUser);
  // router.post("/logout", verifyToken, authController.logOut);

  /**
   * @description AIR ROUTES
   */
  router.post("/airs", airController.addAirInfo);
  router.post("/airs/bulk",airController.addManyAirInfo);
  router.get("/airs", airController.getAllAirInfor);
  router.get("/airs/:id", airController.getAirInforById);
  router.put("/airs/:id", airController.updateAirInforById);
  router.delete("/airs/:id", airController.deleteAirInforById);

  /**
   * @description CLEAN TEMP DATA
   */
  router.delete("/delete-temps/collection/air", recordCleanup.airCollection);

  return app.use("/api/v1", router);
};

module.exports = initAPIRoute;
