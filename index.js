const express = require("express");
const dbConnect = require("./config/dbConnect");
const cron = require('node-cron');
const { swaggerUi, swaggerSpec } = require("./config/swaggerConfig");
const { refreshToken, updateTokenRefreshCounter, getTokenRefreshCounter  } = require('./services/tokenService');
const sendNotification = require('./services/notificationService');

const app = express();

const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const assignmentRouter = require("./routes/assignmentRoute");
const brandRouter = require("./routes/brandRoute");
const prodCategoryRouter = require("./routes/categoryRoute");
const cosmeticProdDetailRouter = require("./routes/cosmeticProductDetailRoute");
const fashionProdDetailRouter = require("./routes/fashionProductDetailRoute");
const productRouter = require("./routes/productRoute");
const termRouter = require("./routes/termRoute");
const contractRouter = require("./routes/contractRoute");
const minestoneRouter = require("./routes/minstoneRoute");
const paymentTermRouter = require("./routes/paymentTermRoute");
const paymentMethodRouter = require("./routes/paymentMethodRoute");
const codMethodRouter = require("./routes/codMethodRoute");
const bankingMethodRouter = require("./routes/bankingMethodRoute");
const momoMethodRouter = require("./routes/momoMethodRoute");
const penaltyRouter = require("./routes/penaltyRoute");
const roleRouter = require("./routes/roleRoute");
const taskRouter = require("./routes/taskRoute");
const scriptRouter = require("./routes/scriptRoute");
const videoRouter = require("./routes/videoRoute");
const postRouter = require("./routes/postRoute");
const statisticRouter = require("./routes/statisticRoute");
const postInfoRouter = require("./routes/postInfoRoute");
const responseRouter = require("./routes/responseRoute");
const facebookWHRouter = require("./routes/facebookWHRoute");

const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Route cho Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);
app.use("/api/user", authRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/brand", brandRouter);
app.use("/api/product", productRouter);
app.use("/api/category", prodCategoryRouter);
app.use("/api/cosmeticProdDetail", cosmeticProdDetailRouter);
app.use("/api/fashionProdDetail", fashionProdDetailRouter);
app.use("/api/term", termRouter);
app.use("/api/contract", contractRouter);
app.use("/api/role", roleRouter);
app.use("/api/task", taskRouter);
app.use("/api/paymentterm", paymentTermRouter);
app.use("/api/paymentMethod", paymentMethodRouter);
app.use("/api/codMethod", codMethodRouter);
app.use("/api/bankingMethod", bankingMethodRouter);
app.use("/api/momoMethod", momoMethodRouter);
app.use("/api/penalty", penaltyRouter);
app.use("/api/minestone", minestoneRouter);
app.use("/api/script", scriptRouter);
app.use("/api/video", videoRouter);
app.use("/api/post", postRouter);
app.use("/api/statistic", statisticRouter);
app.use("/api/postInfo", postInfoRouter);
app.use("/api/response", responseRouter);
app.use("/webhook", facebookWHRouter);

app.use(notFound);
app.use(errorHandler);

//refreshToken();
sendNotification();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
