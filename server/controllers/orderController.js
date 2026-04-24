import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// ================= CREATE ORDER =================
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// ================= GET ORDERS (SEARCH + FILTER + PAGINATION) =================
export const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword?.toLowerCase() || "";
  const status = req.query.status;

  // Base query (status filter)
  let query = {};

  if (status === "delivered") {
    query.isDelivered = true;
  } else if (status === "pending") {
    query.isDelivered = false;
  }

  // Count BEFORE pagination
  const count = await Order.countDocuments(query);

  // Fetch paginated orders
  let orders = await Order.find(query)
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // 🔍 Search filter (after populate)
  if (keyword) {
    orders = orders.filter(
      (order) =>
        order._id.toString().includes(keyword) ||
        order.user?.name?.toLowerCase().includes(keyword)
    );
  }

  res.json({
    orders,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// ================= UPDATE STATUS =================
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isDelivered = !order.isDelivered;
  order.deliveredAt = order.isDelivered ? Date.now() : null;

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// ================= DELETE ORDER =================
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  await order.deleteOne();
  res.json({ message: "Order deleted" });
});