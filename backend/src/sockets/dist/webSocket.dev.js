"use strict";

var ethers = require('ethers');

var logger = require('../utils/logger');

var lotteryContract = require('../contracts/LotteryGame.json');

var _require = require('../utils/connectDB'),
    db = _require.db;

var EXPECTED_PONG_BACK = 15000;
var KEEP_ALIVE_CHECK_INTERVAL = 7500;

var startSocketConnection = function startSocketConnection() {
  logger.info("starting socket connection");
  var pingTimeout = null;
  var keepAliveInterval = null;
  var provider = new ethers.providers.WebSocketProvider(process.env.WEBSOCKET_URL);
  var contract = new ethers.Contract(lotteryContract.address, lotteryContract.abi, provider);

  provider._websocket.on('open', function () {
    logger.info("websocket open");
    keepAliveInterval = setInterval(function () {
      logger.trace('Checking if the connection is alive, sending a ping');

      provider._websocket.ping();

      pingTimeout = setTimeout(function () {
        provider._websocket.terminate();
      }, EXPECTED_PONG_BACK);
    }, KEEP_ALIVE_CHECK_INTERVAL);
    contract.on('LotteryCreated', function _callee(id, ticketPrice, prize, date) {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              logger.info("Lottery Created event received");
              _context.next = 4;
              return regeneratorRuntime.awrap(db.one("INSERT INTO LOTTERY(id,ticketprice,prize,enddate) VALUES ($1,$2,$3,$4) RETURNING id", [id.toString(), ticketPrice.toString(), prize.toString(), new Date(date * 1000).toISOString()]));

            case 4:
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              logger.error(_context.t0.message);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 6]]);
    });
    contract.on('PrizeIncreased', function _callee2(id, prize) {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              logger.info("Prize Increased event received");
              _context2.next = 4;
              return regeneratorRuntime.awrap(db.none("UPDATE LOTTERY SET prize = $1 WHERE id = $2", [prize.toString(), id.toString()]));

            case 4:
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              logger.error(_context2.t0.message);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 6]]);
    });
    contract.on('WinnerDeclared', function _callee3(requestId, id, winner) {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              logger.info("Winner Declared event received");
              _context3.next = 4;
              return regeneratorRuntime.awrap(db.none("UPDATE LOTTERY SET winner = $1 WHERE id = $2", [winner, id.String()]));

            case 4:
              _context3.next = 9;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              logger.error(_context3.t0.message);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 6]]);
    });
  });

  provider._websocket.on('close', function () {
    logger.error('The websocket connection was closed');
    clearInterval(keepAliveInterval);
    clearTimeout(pingTimeout);
    startSocketConnection();
  });

  provider._websocket.on('pong', function () {
    logger.trace('Received pong, so connection is alive, clearing the timeout');
    clearInterval(pingTimeout);
  });
};

module.exports = {
  startSocketConnection: startSocketConnection
};