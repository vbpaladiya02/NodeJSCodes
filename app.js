const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const passport = require("passport")
const session = require("express-session");

const logger = require("./utils/logger");
global.logger = logger;

const apiMessages = require("./utils/apiMessage")
global.apiMessages = apiMessages

const util = require("./utils/messages");
global.util = util;

const catchAsync = require("./utils/catchAsync")
global.catchAsync = catchAsync;

const {authentication} = require("./middlewares/auth");
global.authentication = authentication;

global._ = require("lodash");

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

const corsOptions = {
  origin: ["http://localhost:1320"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept-Language", "lng"],
};
app.use(cors(corsOptions));

app.use(
  session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {secure: true},
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use(require("./routes/index"));

server.listen(process.env.PORT, () => {
  logger.info(`server started at ${process.env.PORT}!`);
});
