const connection = require("../data/db");

// INDEX
const index = (req, res) => {
  const sql = "SELECT * FROM movies";
  //Lancio query
  connection.execute(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${sql}`,
      });
    }

    res.json(results);
  });
};

// SHOW
const show = (req, res) => {
  // recuperiamo id dalla rotta
  const { id } = req.params;

  const movieSql = `
    SELECT *
    FROM movies
    WHERE id = ?`;

  //lancio la query preparata per leggere il film con id ?
  connection.execute(movieSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${movieSql}`,
      });
    }

    //recupero il film dall' array dei risultati
    const movie = results[0];

    if (!movie) {
      return res.status(404).json({
        error: "Not Found",
        message: "Film non trovato",
      });
    }

    // query per recuperare reviews di quel film
    const reviewsSql = `
    SELECT *
    FROM reviews
    WHERE movie_id = ?`;

    connection.execute(reviewsSql, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Query Error",
          message: `Database query failed: ${reviewsSql}`,
        });
      }

      // aggiungo chiave reviews
      movie.reviews = results;
      res.json(movie);
    });
  });
};

// DESTROY
const destroy = (req, res) => {};

module.exports = { index, show, destroy };
