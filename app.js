require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const apiRouter = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", apiRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
