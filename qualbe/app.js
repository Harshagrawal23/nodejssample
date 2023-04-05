const express = require("express");
const app = express();
const path = require('path')
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = express.Router();
const customerRoutes = require("./routes/customer");
const estimateRoutes = require("./routes/estimate");
const hostedPageRoutes = require("./routes/hostedPage");
const itemPriceRoutes = require("./routes/itemPrice");
const itemRoutes = require("./routes/item");
const checkoutRoutes = require("./routes/checkout");
const subscriptionConfirmationRoutes = require("./routes/subscriptionConfirmation");
const stateRoutes = require("./routes/state");

const url = require('url');

app.set('view engine', 'ejs');

app.use("/join/plan", checkoutRoutes )
app.use("*/ThankYou", subscriptionConfirmationRoutes);
 
router.get("*/custom.js", (req, res) => {
  res.sendFile(path.join(__dirname+'/custom.js'));
})

app.use('*/images', express.static(__dirname + '/images'));
app.use('*/css', express.static(__dirname + '/css'));


app.use("/", router)

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/customers", customerRoutes);
app.use("/fetchEstimate", estimateRoutes);
app.use("/hostedPage", hostedPageRoutes);
app.use("/itemPrice",itemPriceRoutes);
app.use("/fetchAllStates", stateRoutes );
app.use("/item", itemRoutes);

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.send("<h1>Page not found on the server</h1>");
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send("<h1>" +  error.message + "</h1>")
});
 
module.exports = app;