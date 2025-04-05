const express = require("express");
const cors = require("cors");
const registerRouter = require("./router.cjs");

const app = express();
const port = 3000;

app.use(cors());
registerRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
