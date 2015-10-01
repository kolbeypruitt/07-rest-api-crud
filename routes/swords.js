var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/swords')
var Swords = db.get('swords')

// getting all swords from database
router.get('/', function(req, res) {
  Swords.find({}, function(err, swords) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(swords);
  })
});

// posting swords to database
router.post('/', function(req, res) {
  Swords.insert(req.body, function(err, sword) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(sword);
  });
})

// getting single sword from database
router.get('/:id', function(req, res) {
  Swords.findOne({_id: req.params.id}, function(err, sword) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(sword)
  })
})

// getting and updating single sword from database
router.put('/:id', function(req, res) {
  Swords.findAndModify({_id: req.params.id}, req.body, function(err, sword) {
    if (err) {
      throw err
    }
    res.json(req.body)
  })
})


router.post('/:id/delete', function(req, res) {
  Swords.remove({_id: req.params.id}, req.body, function(err, sword) {
    if (err) {
      throw err
    }
    res.json(req.body);
  })
})


module.exports = router