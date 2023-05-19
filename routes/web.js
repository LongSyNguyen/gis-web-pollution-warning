const router = require("express").Router();

const loginRender = require("../controllers/webController/login");
const airStationStatsRender = require("../controllers/webController/stats_air_station");
const openweathermapStatsRender = require("../controllers/webController/stats_openweathermap");

const airRender = require("../controllers/webController/air");
const openweathermapRender = require("../controllers/webController/openweathermap");

const profileRender = require("../controllers/webController/profile");

const initAPIRoute = (app) => {
  /**
   * @description ACCOUNT ROUTES
   */
  router.get("/login", loginRender.getLoginPage);
  /**
   * @description DASHBOARD ROUTES
   */
  router.get("/dashboard/stats/stations/air", airStationStatsRender.getStatsPage);
  router.get("/dashboard/stats/open-api/openweathermap", openweathermapStatsRender.getStatsPage);
  /**
   * @description MANAGEMENT ROUTES
   */
  // Air
  router.get("/management/env-data/stations/air", airRender.getAirPage);
  router.post("/management/env-data/stations/air/datatables", airRender.fetchDataTables);
  // Open weather map
  router.get("/management/env-data/open-api/openweathermap", openweathermapRender.getAirPage);
  router.post(
    "/management/env-data/open-api/openweathermap/datatables",
    openweathermapRender.fetchDataTables
  );
  /**
   * @description CONFIG ROUTES
   */
  router.get("/config/profile", profileRender.getProfilePage);
  /**
   * @description SUPPORT ROUTES
   */

  return app.use("/admin", router);
};

module.exports = initAPIRoute;
