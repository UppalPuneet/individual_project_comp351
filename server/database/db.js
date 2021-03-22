const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '144.168.230.163',
  user: 'uppalpun_quoteadmin',
  password: 'comp351',
  database: 'uppalpun_quotes',
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
    connection.end();
  }
});

function queryDatabase(query, callback) {
  connection.query(query, function (err, results) {
    if (err) {
      console.log(err);
      callback(err, function () {
        connection.end();
      });
      return;
    }

    callback(results, function () {
      connection.end();
    });
  });
}

function getQuotes(callback) {
  let query = `SELECT * FROM quotes ORDER BY id DESC;`;
  queryDatabase(query, callback);
}

function insertQuote(data, callback) {
  let query = `INSERT INTO quotes (quote, quote_author) VALUES ("${data.quoteValue}", "${data.authorValue}");`;
  queryDatabase(query, callback);
}

function updateQuote(id, data, callback) {
  let query = `UPDATE quotes SET quote = "${data.quote}", quote_author = "${data.author}" WHERE id = ${id};`;
  queryDatabase(query, callback);
}

function deleteQuote(id, callback) {
  let query = `DELETE FROM quotes WHERE id = ${id};`;
  queryDatabase(query, callback);
}

module.exports = {
  getQuotes: getQuotes,
  insertQuote: insertQuote,
  updateQuote: updateQuote,
  deleteQuote: deleteQuote,
};

/**
 * CREATE TABLE IF NOT EXISTS quote (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    quote VARCHAR(500) NOT NULL,
    quote_author VARCHAR(50) NOT NULL)
 */