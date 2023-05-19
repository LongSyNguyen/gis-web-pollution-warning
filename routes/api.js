const router = require("express").Router();
const airController = require("../controllers/APIcontroller/air");
const openweathermapController = require("../controllers/APIcontroller/openweathermap");
const deleteDuplicatates = require("../helpers/deleteDuplicatates");

const initAPIRoute = (app) => {
  /**
   * @description ACCOUNTS
   */
  router.post("/register", airController.addAirInfo);
  // router.post("/login", authController.loginUser);
  // router.post("/logout", verifyToken, authController.logOut);

  /**
   * @description AIR STATIONS ROUTES
   */
  router.get("/stations/airs/filter", airController.filterAirInfor);
  router.get("/stations/airs", airController.getAllAirInfor);
  router.post("/stations/airs", airController.addAirInfo);
  router.post("/stations/airs/bulk", airController.addManyAirInfo);
  router.get("/stations/airs/:id", airController.getAirInforById);
  router.put("/stations/airs/:id", airController.updateAirInforById);
  router.delete("/stations/airs/:id", airController.deleteAirInforById);

  /**
   * @description AIR OPEN WEATHER ROUTES
   */
  // get all
  router.get(
    "/open-api/openweathermap/airs",
    openweathermapController.getAllAirInfor
  );
  // filter
  router.get(
    "/open-api/openweathermap/airs/filter",
    openweathermapController.filterAirInfor
  );
  /**
   * @description CLEAN TEMP DATA
   */
  router.delete(
    "/delete-duplicates/collection/air",
    deleteDuplicatates.airCollection
  );

  return app.use("/api/v1", router);
};

module.exports = initAPIRoute;
