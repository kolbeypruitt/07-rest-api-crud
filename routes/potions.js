var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/potions')
var potionColl = db.get('potions')

router.get('/', function (req, res) {
  potionColl.find({}, function (err, allPotions) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(allPotions);
  });
});

router.post('/', function (req, res) {
  potionColl.insert(req.body, function (err, potion) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(potion);
  });
});

router.get('/:id', function (req, res) {
  potionColl.findOne({_id: req.params.id}, function (err, potion) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(potion);
  });
});

router.put('/:id', function (req, res) {
  potionColl.findAndModify({_id: req.params.id}, req.body, function (err, potion) {
    if (err) {
      res.send(err);
    }
    res.json(req.body);
  });
});

router.post('/:id/delete', function (req, res) {
  potionColl.remove({_id: req.params.id}, req.body, function (err, potion) {
    if (err) {
      res.send(err);
    }
    res.json(req.body);
  });
});


module.exports = router