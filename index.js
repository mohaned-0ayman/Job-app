// Import needed modules
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const MySQLStore = require("express-mysql-session")(expressSession);
const mysql = require("mysql");

// Pages routes
const RegisterRoute = require("./src/routes/register");
const LoginRoute = require("./src/routes/login");
const JobListingsRoute = require("./src/routes/jobListings");
const JobRoute = require("./src/routes/job");
const EmployerRoute = require("./src/routes/employer");
const SeekerRoute = require("./src/routes/seeker");
const Job = require("./src/models/Job");
const JobAppsRoute = require("./src/routes/jobApps");
const LogoutRoute = require("./src/routes/logout");

// API route
const APIRouter = require("./src/routes/API/main");

// Importing DB model middleware function
const { HandleDBModel } = require("./src/helpers/HandleDBModel");

// Initializing express
const app = express();
const port = process.env.PORT || 3000;

// Set up MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "job_board",
});

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Setting the public folder
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(HandleDBModel);
app.use(multer().array());

// Set up session store
const sessionStore = new MySQLStore(
  {
    expiration: 86400000,
    createDatabaseTable: true,
  },
  db
);

// Set up session middleware
app.use(cookieParser());
app.use(
  expressSession({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 86400000,
    },
  })
);

// Configure the cookie parser middleware
// app.use(cookieParser());

// Configure the Express session middleware
// const sessionStore = new expressSession({
//   secret: "my-secret-key",
//   resave: false,
//   saveUninitialized: false,
//   store: new MySQLStore({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "",
//     database: "job_board",
//     table: "sessions",
//   }),
// });
//
// // Create a new session table
// app.use(sessionStore);

// Routes
app.use("/api", APIRouter);
app.use("/register", RegisterRoute);
app.use("/login", LoginRoute);
app.use("/job", JobRoute);
app.use("/jobs", JobListingsRoute);
app.use("/employer", EmployerRoute);
app.use("/seeker", SeekerRoute);
app.use("/jobApps", JobAppsRoute);
app.use("/logout", LogoutRoute);

// Home route
app.get("/", async (req, res) => {
  const jobs = await Job.findAll();
  res.status(200).render("home", { jobs });
});

// About route
app.get("/about", (req, res) => {
  res.render("about");
});

// Error 404 route
app.get("*", (req, res) => {
  res.status(404).render("error");
});

// Listening for incoming requests
app.listen(3000, () => {
  console.log(`Server started listening on port ${port}`);
});
