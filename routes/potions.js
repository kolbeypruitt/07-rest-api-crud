var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/swords')
var potionColl = db.get('swords')