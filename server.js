import express from "express";
import crudRouter from "./routes/routesHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import path from "path";
import url from "url";

const app = express();
const port = process.env.PORT || 8000;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(`${__dirname}/public`));
app.use("/api/posts", crudRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running ot port ${port}`);
});
