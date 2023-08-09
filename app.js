const express = require('express');
const app = express();
const apiRouter = require('./routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/", apiRouter)

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
