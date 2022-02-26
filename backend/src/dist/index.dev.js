"use strict";

require("dotenv").config();

var express = require('express');

var logger = require('./utils/logger');

var _require = require('./utils/connectDB'),
    db = _require.db;

var _require2 = require('./sockets/webSocket'),
    startSocketConnection = _require2.startSocketConnection;

var app = express();

var cors = require('cors');

app.use(express.json());
app.use(cors());
app.get('/lotteries', function _callee(req, res) {
  var lotteries;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT id,enddate,ticketprice,prize,winner from lottery"));

        case 3:
          lotteries = _context.sent;
          res.status(200).send(lotteries);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).send({
            error: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.listen(process.env.PORT, function () {
  logger.info("Server started");
  startSocketConnection();
});