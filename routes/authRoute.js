const express = require("express");

const {
  createUser,
  loginUserCtrl,
  getAllUser,
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
  // emptyCart,
  // applyCoupon,
  // createOrder,
  // getOrders,
  // updateOrderStatus,
  // getAllOrders,
  // getOrderByUserId,
  // removeProductFromCart,
  // updateProductQuantityFromCart,
} = require("../controller/userCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);

router.get("/all-users", getAllUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getUser);

router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.delete("/:id", deleteUser);
module.exports = router;
