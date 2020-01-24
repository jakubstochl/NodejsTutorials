const express = require('express');
const logger = require('@lib/logger');

const router = new express.Router();

router.get('/constant-time', (req, res) => {
    res.sendStatus(200);
  });

router.get('/countToN', (req, res) => {
    let n = req.query.n;
    // n iterations before giving someone else a turn
    for (let i = 0; i < n; i++) {
      logger.winston.info(`Iteration ${i}`);
    }
  
    res.sendStatus(200);
  });

  router.get('/countToN2', (req, res) => {
    let n = req.query.n;
    // n^2 iterations before giving someone else a turn
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(`Iter ${i}.${j}`);
      }
    }
  
    res.sendStatus(200);
  });

  module.exports = router;