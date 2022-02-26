"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var log4js = require('log4js'); // Logger configuración


log4js.configure({
  appenders: {
    console: {
      type: 'console'
    }
  },
  categories: {
    "default": {
      appenders: ['console'],
      level: 'TRACE'
    }
  }
});
var log4jsLogger = log4js.getLogger();
var Level = {
  TRACE: {
    priority: 0,
    outputString: 'TRACE'
  },
  DEBUG: {
    priority: 100,
    outputString: 'DEBUG'
  },
  INFO: {
    priority: 200,
    outputString: 'INFO'
  },
  WARN: {
    priority: 300,
    outputString: 'WARN'
  },
  ERROR: {
    priority: 400,
    outputString: 'ERROR'
  },
  FATAL: {
    priority: 500,
    outputString: 'FATAL'
  },
  OFF: {
    priority: 1000,
    outputString: 'OFF'
  }
};
var logLevel = Level.INFO;
/**
 * Permite cambiar el log level
 * a un nuevo valor
 * @param {Level} newLevel - the new log Level
 */

var setLogLevel = function setLogLevel(newLevel) {
  logLevel = newLevel;
};

var setLogLevelByName = function setLogLevelByName(newLevel) {
  switch (newLevel) {
    case 'TRACE':
      setLogLevel(Level.TRACE);
      break;

    case 'DEBUG':
      setLogLevel(Level.DEBUG);
      break;

    case 'WARN':
      setLogLevel(Level.WARN);
      break;

    case 'ERROR':
      setLogLevel(Level.ERROR);
      break;

    case 'FATAL':
      setLogLevel(Level.FATAL);
      break;

    case 'OFF':
      setLogLevel(Level.OFF);
      break;

    case 'INFO':
    default:
      setLogLevel(Level.INFO);
  }
};

setLogLevelByName(process.env.LOG_LEVEL);

var log = function log(messageLogLevel, message, source, logFunction) {
  var computedMessage = null;

  if (messageLogLevel.priority >= logLevel.priority) {
    computedMessage = (source ? '[ ' + source + ' ] -- ' : '[na] -- ') + (_typeof(message) === 'object' && message !== null ? JSON.stringify(message) : message);
    logFunction ? logFunction(computedMessage, messageLogLevel) : logMessage(computedMessage, messageLogLevel);
  }

  return computedMessage;
};

var logMessage = function logMessage(computedMessage, messageLogLevel) {
  switch (messageLogLevel) {
    case Level.TRACE:
      log4jsLogger.trace(computedMessage);
      break;

    case Level.DEBUG:
      log4jsLogger.debug(computedMessage);
      break;

    case Level.WARN:
      log4jsLogger.warn(computedMessage);
      break;

    case Level.ERROR:
      log4jsLogger.error(computedMessage);
      break;

    case Level.FATAL:
      log4jsLogger.fatal(computedMessage);
      break;

    case Level.INFO:
    default:
      log4jsLogger.info(computedMessage);
  }
};

var trace = function trace(message, source, logFunction) {
  return log(Level.TRACE, message, source, logFunction);
};

var debug = function debug(message, source, logFunction) {
  return log(Level.DEBUG, message, source, logFunction);
};

var info = function info(message, source, logFunction) {
  return log(Level.INFO, message, source, logFunction);
};

var warn = function warn(message, source, logFunction) {
  return log(Level.WARN, message, source, logFunction);
};

var error = function error(message, source, logFunction) {
  return log(Level.ERROR, message, source, logFunction);
};

var fatal = function fatal(message, source, logFunction) {
  return log(Level.FATAL, message, source, logFunction);
};

var is = function is(level) {
  return level.priority >= logLevel.priority;
};

var isTrace = function isTrace() {
  return is(Level.TRACE);
};

var isDebug = function isDebug() {
  return is(Level.DEBUG);
};

var isInfo = function isInfo() {
  return is(Level.INFO);
};

var isWarn = function isWarn() {
  return is(Level.WARN);
};

var isError = function isError() {
  return is(Level.ERROR);
};

var isFatal = function isFatal() {
  return is(Level.FATAL);
};

var isOff = function isOff() {
  return is(Level.OFF);
};

var logCatch = function logCatch(_errObject, _source) {
  if (_errObject.message) {
    error(_errObject.message, _source);
  } else {
    error(_errObject, _source);
  }

  if (_errObject.stack) {
    debug(_errObject.stack, _source);
  }
};

module.exports = {
  Level: Level,
  setLogLevelByName: setLogLevelByName,
  setLogLevel: setLogLevel,
  trace: trace,
  debug: debug,
  info: info,
  warn: warn,
  error: error,
  fatal: fatal,
  log: log,
  isTrace: isTrace,
  isDebug: isDebug,
  isInfo: isInfo,
  isWarn: isWarn,
  isError: isError,
  isFatal: isFatal,
  isOff: isOff,
  logCatch: logCatch
};