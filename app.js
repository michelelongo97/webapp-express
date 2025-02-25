const express = require("express");
const cors = require("cors");
const moviesRouter = require("./routers/moviesRouter");
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");

const app = express();
const { PORT, FE_URL } = process.env;

//CORS
app.use(
  cors({
    origin: FE_URL,
  })
);

//MIDDLEWARES STATICI
app.use(express.static("public"));
//MIDDLEWARES PARSING req.body
app.use(express.json());
//ROUTES
app.use("/movies", moviesRouter);
//MIDDLEWARES PER ERRORI
app.use(notFound);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
