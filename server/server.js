const express = require('express');
const db = require('./database/db');

const PORT = 3000;

const server = express();

// Set the header
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get('/api/quotes', function (req, res) {
  db.getQuotes(function (data) {
    try {
      if (data) res.status(200).json({ data: data });
    } catch (error) {
      res.status(400).json({ msg: 'Could not fetch the quotes' });
    }
  });
});

server.post('/api/quotes', function (req, res) {
  db.insertQuote(req.body, function (data) {
    try {
      if (data != undefined || data) {
        res.status(200).json({ msg: 'Quote successfully created!' });
      }
    } catch (error) {
      res.status(400).json({ msg: 'Could not fetch the quotes' });
    }
  });
});

server.put('/api/quotes/:id', function (req, res) {
  db.updateQuote(req.params.id, req.body, function (data) {
    try {
      if (data != undefined || data) {
        res.status(200).json({ msg: 'Quote successfully updated!' });
      }
    } catch (error) {
      res.status(400).json({ msg: 'Could not fetch the quotes' });
    }
  });
});

server.delete('/api/quotes/:id', function (req, res) {
  db.deleteQuote(req.params.id, function (data) {
    try {
      if (data != undefined || data) {
        res.status(200).json({ msg: 'Quote successfully deleted!' });
      }
    } catch (error) {
      res.status(400).json({ msg: 'Could not fetch the quotes' });
    }
  });
});

server.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));