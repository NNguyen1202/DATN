const User = require("../models/userModel");
const Role = require("../models/roleModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");

//Create a user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //Create a new User
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    //User already exists
    throw new Error("Người dùng đã tồn tại");
  }
});

//Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      fullName: findUser?.fullName,
      email: findUser?.email,
      phoneNumber: findUser?.phoneNumber,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Thông tin không hợp lệ");
  }
});

//Logout functionality
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken)
    throw new Error("Không làm mới Token trong Cookies");
  const refreshTokenn = cookie.refreshToken;
  const user = await User.findOne({ refreshTokenn });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //fobidden
  }
  await User.findOneAndUpdate(refreshTokenn, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); //fobidden
});

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken)
    throw new Error("Không làm mới Token trong Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user)
    throw new Error(
      "Không làm mới Token hiện tại trong cơ sở dữ liệu hoặc không phù hợp"
    );
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Có gì đó sai xót với refresh Token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//Get all users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all brand users
const getAllBrandUser = asyncHandler(async (req, res) => {
  try {
    const getBrandUsers = await Role.findOne({ roleName: 'BrandAssistant' });
    // Tìm tất cả người dùng có roleID là của "BrandAssistant"
    const getUsers = await User.find({ roleID: getBrandUsers._id });
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all content users
const getAllContentUser = asyncHandler(async (req, res) => {
  try {
    const getContentUsers = await Role.findOne({ roleName: 'ContentAssistant' });
    // Tìm tất cả người dùng có roleID là của "BrandAssistant"
    const getUsers = await User.find({ roleID: getContentUsers._id });
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all brand users
const getAllMediaUser = asyncHandler(async (req, res) => {
  try {
    const getMediaUsers = await Role.findOne({ roleName: 'MediaAssistant' });
    // Tìm tất cả người dùng có roleID là của "BrandAssistant"
    const getUsers = await User.find({ roleID: getMediaUsers._id });
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//Get a single use
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getUser = await User.findById(id);
    res.json({
      getUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Block user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(block);
  } catch (error) {
    throw new Error(error);
  }
});

//Unlock user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unBlock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json(unBlock);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getAllUser,
  getAllBrandUser,
  getAllContentUser,
  getAllMediaUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  // updatePassword,
  // forgotPasswordToken,
  // resetPassword,
  // loginAdmin,
  // getWishlist,
  // saveAddress,
  // userCart,
  // getUserCart,
  // createOrder,
  // // emptyCart,
  // // applyCoupon,
  // // createOrder,
  // // getOrders,
  // // updateOrderStatus,
  // getAllOrders,
  // // getOrderByUserId,
  // removeProductFromCart,
  // updateProductQuantityFromCart,
};
