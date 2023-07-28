const router = require("express").Router();

// userAuth
const loginRender = require("../controllers/webController/login");
const logoutRender = require("../controllers/webController/logout");
const userAuth = require("../middlewares/userAuth");


const airStationStatsRender = require("../controllers/webController/stats_air_station");
const openweathermapStatsRender = require("../controllers/webController/stats_openweathermap");

const airRender = require("../controllers/webController/air");
const openweathermapRender = require("../controllers/webController/openweathermap");
const webcrawlRender = require("../controllers/webController/web_crawl");

const profileRender = require("../controllers/webController/profile");

const initAPIRoute = (app) => {
  /**
   * @description ACCOUNT ROUTES
   */
  router.get("/login", loginRender.getLoginPage);
  router.post("/login/auth", loginRender.checkLogin);
  router.get("/logout", logoutRender.logoutRender);
  /**
   * @description DASHBOARD ROUTES
   */
  router.get(
    "/dashboard/stats/stations/air",
    userAuth.requireAuth,
    airStationStatsRender.getStatsPage
  );
  router.get(
    "/dashboard/stats/open-api/openweathermap",
    userAuth.requireAuth,
    openweathermapStatsRender.getStatsPage
  );
  /** userAuth.requireAuth,
   * @description MANAGEMENT ROUTES
   */
  // Air
  router.get(
    "/management/env-data/stations/air",
    userAuth.requireAuth,
    airRender.getAirPage
  );
  router.post(
    "/management/env-data/stations/air/datatables",
    userAuth.requireAuth,
    airRender.fetchDataTables
  );
  // Open weather map
  router.get(
    "/management/env-data/open-api/openweathermap",
    userAuth.requireAuth,
    openweathermapRender.getAirPage
  );
  router.post(
    "/management/env-data/open-api/openweathermap/datatables",
    userAuth.requireAuth,
    openweathermapRender.fetchDataTables
  );

  
  // Web crawl
  router.get(
    "/management/env-data/web-crawl/baotainguyenmoitruong",
    userAuth.requireAuth,
    webcrawlRender.getWebCrawlPage
  );
  router.post(
    "/management/env-data/web-crawl/baotainguyenmoitruong/datatables",
    userAuth.requireAuth,
    webcrawlRender.fetchDataTables
  );


  /**
   * @description CONFIG ROUTES
   */
  router.get(
    "/config/profile",
    userAuth.requireAuth,
    profileRender.getProfilePage
  );
  router.put(
    "/config/profile-update",
    userAuth.requireAuth,
    profileRender.updateProfile
  );
  /**
   * @description SUPPORT ROUTES
   */

  return app.use("/admin", router);
};

module.exports = initAPIRoute;
