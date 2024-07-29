const express = require("express");
const crudRouter = require('./routes/routesHandler');
const errorHandler = require("./middleware/errorHandler");


const app = express();
const port = process.env.PORT || 8000;


app.use('/api/posts',crudRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server is running ot port ${port}`);
});
