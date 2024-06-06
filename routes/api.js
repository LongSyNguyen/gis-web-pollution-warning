/**
 * @swagger
 * components:
 *   schemas:
 *     AirQuality:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - finished
 *       properties:
 *         location:
 *           type: object
 *           properties:
 *             address:
 *                type: string
 *                description: The name of the measuring station
 *             state:
 *                type: string
 *                description: The name of the state of the measuring station
 *             commune:
 *                type: string
 *                description: The name of the commue of the measuring station
 *             latitude:
 *                type: number
 *                description: This is the latitude of the measuring station
 *             longitude:
 *                type: number
 *                description: This is the longitude of the measuring station
 *         date:
 *           type: object
 *           properties:
 *             date_type:
 *                 type: string
 *                 format: date
 *                 description: Time to record pollution indicators as date type
 *             string_type:
 *                 type: string
 *                 description: The book explanation
 *         tsp:
 *           type: number
 *           description: total dust index
 *         so2:
 *           type: number
 *           description: Sulfur dioxide
 *         no2:
 *           type: number
 *           description: Nito dioxide
 *     
 */
/**
 * @swagger
 * tags:
 *   name: Data AirQuality
 *   description: The books managing API
 * /api/v1/stations/airs:
 *   get:
 *     summary: Lists all the data
 *     tags: [Data AirQuality]
 *     responses:
 *       200:
 *         description: The list of the data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AirQuality'
 *   post:
 *     summary: Create a new data
 *     tags: [Data AirQuality]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AirQuality'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirQuality'
 *       500:
 *         description: Some server error
 * /api/v1/stations/airs/{id}:
 *   get:
 *     summary: Get the data by id
 *     tags: [Data AirQuality]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Data AirQuality id
 *     responses:
 *       200:
 *         description: The Data AirQuality response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirQuality'
 *       404:
 *         description: The Data AirQuality was not found
 *   put:
 *     summary: Update Data AirQuality by ID
 *     description: Updates a Data AirQuality record based on its unique ID.
 *     tags: [Data AirQuality]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId  # Use "objectId" format for MongoDB ObjectId
 *         required: true
 *         description: The ID of the Data AirQuality record to update.
 *     requestBody:
 *         name: body
 *         required: true
 *         description: Updated Data AirQuality object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirQuality'  # Reference your schema here
 *     responses:
 *       200:
 *         description: The Data AirQuality record was successfully updated.
 *       400:
 *         description: Bad request. The request body is not valid.
 *       404:
 *         description: The Data AirQuality record with the specified ID was not found.
 *       500:
 *         description: An error occurred while processing the request.
 *   delete:
 *     summary: Remove the Data AirQuality by ID
 *     description: Deletes a Data AirQuality record based on its unique ID.
 *     tags: [Data AirQuality]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId  # Use "objectId" format for MongoDB ObjectId
 *         required: true
 *         description: The ID of the Data AirQuality record to delete.
 *     responses:
 *       204:
 *         description: The Data AirQuality record was successfully deleted.
 *       404:
 *         description: The Data AirQuality record with the specified ID was not found.
 *       500:
 *         description: An error occurred while processing the request.
 * /api/v1/stations/airs/filter:
 *     get:
 *       summary: Retrieve filtered air quality data
 *       description: Retrieve air quality data based on specified filter criteria, including date range.
 *       tags:
 *         - Air Quality Data
 *       parameters:
 *         - in: query
 *           name: address
 *           schema:
 *             type: string
 *           description: Filter by address (optional)
 *           required: false
 *         - in: query
 *           name: state
 *           schema:
 *             type: string
 *           description: Filter by state (optional)
 *           required: false
 *         - in: query
 *           name: lat
 *           schema:
 *             type: number
 *           description: Filter by latitude (optional)
 *           required: false
 *         - in: query
 *           name: long
 *           schema:
 *             type: number
 *           description: Filter by longitude (optional)
 *           required: false
 *         - in: query
 *           name: commune
 *           schema:
 *             type: string
 *           description: Filter by commune (optional)
 *           required: false
 *         - in: query
 *           name: fromdate
 *           schema:
 *             type: string
 *             format: date  # Use the appropriate date format
 *           description: Filter by start date (optional)
 *           required: false
 *         - in: query
 *           name: todate
 *           schema:
 *             type: string
 *             format: date  # Use the appropriate date format
 *           description: Filter by end date (optional)
 *           required: false
 *       responses:
 *         200:
 *           description: Successful response with filtered air quality data
 *           content:
 *             application/json:
 *               schema:
 *                 # Define the schema for the response data here based on your data model
 *         400:
 *           description: Bad request. Invalid filter criteria provided.
 *         500:
 *           description: An error occurred while processing the request.
 */
const router = require("express").Router();
const airController = require("../controllers/APIcontroller/air");
const openweathermapController = require("../controllers/APIcontroller/openweathermap");
const deleteDuplicatates = require("../helpers/deleteDuplicatates");
const dataTrainController = require("../controllers/APIcontroller/dataTrain");

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
  router.get("/open-api/openweathermap/airs",openweathermapController.getAllAirInfor);
  // filter
  router.get("/open-api/openweathermap/airs/filter",openweathermapController.filterAirInfor);

  router.get("/data-train/filter",dataTrainController.filterDataInfor);
  router.get("/data-train/",dataTrainController.getAllDataInfor);
  /**
   * 
   * 
   * @description CLEAN TEMP DATA
   */
  router.delete("/delete-duplicates/collection/air",deleteDuplicatates.airCollection);

  return app.use("/api/v1", router);
};

module.exports = initAPIRoute;
