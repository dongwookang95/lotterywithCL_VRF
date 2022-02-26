"use strict";

var pgp = require('pg-promise')({});

var cn = "postgres://".concat(process.env.PG_USER, ":").concat(process.env.PG_PASS, "@").concat(process.env.PG_HOST, ":").concat(process.env.PG_PORT, "/").concat(process.env.PG_DATABASE);
var db = pgp(cn);
module.exports = {
  db: db
};