import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
//@route POST /api/orders
//@acess private
const addOrderItem = asyncHandler(async (req, res) => {
  res.send(" add order items");
  // const order = new Order({});
});

// @desc get logged in users orders
//@route Get /api/orders/myorders
//@acess private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send(" get my orders");
  // const order = new Order({});
});

// @desc get order by id
//@route Get /api/orders/:id
//@acess private
const getMyOrdersById = asyncHandler(async (req, res) => {
  res.send(" get orders by id");
  // const order = new Order({});
});

// @desc get update order to paid
//@route Get /api/orders/:id/pay
//@acess private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send(" update Order To Paid");
  // const order = new Order({});
});

// @desc get update order to delivered
//@route Get /api/orders/:id/deliver
//@acess private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send(" update Order To deliver");
});

// @desc get all oreders
//@route Get /api/orders/:id/pay
//@acess private
const getOrders = asyncHandler(async (req, res) => {
  res.send(" get all oreders");
  // const order = new Order({});
});

export {
  getMyOrders,
  addOrderItem,
  getMyOrdersById,
  updateOrderToDelivered,
  getOrders,
  updateOrderToPaid,
};

