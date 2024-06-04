const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Token được ủy quyền đã hết hạn, vui lòng đăng nhập lại");
    }
  } else {
    throw new Error("Không có token được đính kèm với tiêu đề");
  }
});
const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.roleName !== "Admin") {
    throw new Error("Bạn không phải là 1 quản trị viên!");
  } else {
    next();
  }
});
const isBA = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const BAUser = await User.findOne({ email });
  if (BAUser.roleName !== "BrandAssistant") {
    throw new Error("Bạn không phải là 1 trợ lý thương hiệu!");
  } else {
    next();
  }
});
const isCA = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const CAUser = await User.findOne({ email });
  if (CAUser.roleName !== "ContentAssistant") {
    throw new Error("Bạn không phải là 1 trợ lý nội dung!");
  } else {
    next();
  }
});
const isMA = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const MAUser = await User.findOne({ email });
  if (MAUser.roleName !== "MediaAssistant") {
    throw new Error("Bạn không phải là 1 trợ lý truyền thông!");
  } else {
    next();
  }
});
module.exports = { authMiddleware, isAdmin, isBA, isCA, isMA };
