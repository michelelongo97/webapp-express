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

    const movies = results.map((movie) => {
      movie.image = `http://localhost:3000/movies_cover/${movie.image}`;
      return movie;
    });

    res.json(movies);
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

// STORE REVIEW
const storeReview = (req, res) => {
  // recuperiamo id dalla rotta
  const { id } = req.params;

  //recuperiamo body della richiesta
  const { name, vote, text } = req.body;
  // preparare query
  const sql =
    "INSERT INTO reviews (movie_id, name, text, vote) VALUES (?,?,?,?)";
  //eseguire query

  connection.execute(sql, [id, name, text, vote], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${sql}`,
      });
    }

    // RESTITUIRE RISPOSTA CLIENT
    res.status(201).json({ id: results.insertId });
  });
};

// DESTROY
const destroy = (req, res) => {};

module.exports = { index, show, storeReview, destroy };
