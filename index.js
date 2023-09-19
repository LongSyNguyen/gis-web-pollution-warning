// LIBARIES
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require('morgan');
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

// MODULES
const connectDB = require("./configs/database");
const initWebRoute = require("./routes/web");
const initAPIRoute = require("./routes/api");
const getWeather = require("./helpers/getWeather");
const app = express();
const PORT = process.env.PORT || 8080;

// PORT
dotenv.config({ path: "config.env" });

// MONGODB CONNECTION
connectDB();

// USE MIDDLEWARE LIBARIES
app.use(cookieParser());
app.use(morgan("dev")); // log requests in terminal
app.use(bodyparser.json()); // converts the request into an object which is called 'body.req'
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet()); // Defender HTTP headers
app.use(cors()); // allow sharing of resources between websites

// SETUP VIEW ENGINE
app.use(expressLayouts); // using express-ejs-layouts libary
app.set("view engine", "ejs"); // using ejs template engine
app.set("views", path.resolve(__dirname, "views")); // Set views foler path
app.use(express.static(path.resolve(__dirname, "assets"))); // load assets

// LOAD ROUTES
initWebRoute(app); // web routes
initAPIRoute(app); // api routes
// 404 route
app.get("/", (req, res) => {
  res.render("pages/404-error.ejs", { layout: false });
})


// SERVER RUNNING
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// AUTO UPDATE DATA FROM OPEN WEATHER MAP
// LONG
cron.schedule("20 00 * * *",() => {
    console.log("UPDATE DATA FROM OPEN WEATHER MAP");
    // getWeather();
  },
  {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh",
  }
);

cron.schedule("26 9 * * *",() => {
    console.log("UPDATE DATA FROM OPEN WEATHER MAP");
    getWeather();
  },
  {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh",
  }
);
// const deleteDuplicates = require("./helpers/deleteDuplicatates")
// deleteDuplicates.airCollection()

// Swagger API
const options = {
  definition:{
    openapi:"3.0.0",
    info:{
      title:"API-Doc",
      version:"0.1",
      description:"This is the document describing the environment api ",
      contact:{
        name:"Nguyen Sy Long",
        url:"https://www.facebook.com/sunssunnn/",
        email:"longcanh2k3@gmail.com"
      }
    },
    servers:[{
      url:"https://environment-admin.onrender.com/"
    }]
  },
  apis:["./routes/*.js"]
}
const specs = swaggerjsdoc(options)
app.use("/api-docs",
  swaggerui.serve,
  swaggerui.setup(specs),)


// // Connect Firebase

// var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKeys.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// const fb = admin.firestore()

// let User = fb.collection("User")

// User.get().then((querySnapshot)=>{
//   querySnapshot.forEach(document=>{
//     console.log(document.data())
//   })
// })