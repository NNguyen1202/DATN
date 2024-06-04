const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();

const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const assignmentRouter = require("./routes/assignmentRoute");
const brandRouter = require("./routes/brandRoute");
const productRouter = require("./routes/productRoute");
const termRouter = require("./routes/termRoute");
const contractRouter = require("./routes/contractRoute");

const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/brand", brandRouter);
app.use("/api/product", productRouter);
app.use("/api/term", termRouter);
app.use("/api/contract", contractRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
