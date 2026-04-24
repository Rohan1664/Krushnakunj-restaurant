import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Get users with pagination
// @route   GET /api/users?page=1
// @access  Admin
export const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 10; // users per page
  const page = Number(req.query.page) || 1;

  const count = await User.countDocuments();

  const users = await User.find({})
    .select("-password")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    users,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// DELETE USER (no change)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});