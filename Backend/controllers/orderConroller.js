import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
//@route POST /api/orders
//@acess private
const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    itemPrice,
    shippingPrice,
    paymentMethod,
    taxPrice,
    totalPrice,
    shippingAddress, // Corrected here
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ error: "No item in the cart" });
    throw new Error("No item in the cart");
  } else {
    const userId = req.user?._id;

    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: userId, // Corrected here
      itemPrice,
      shippingPrice,
      paymentMethod,
      taxPrice,
      totalPrice,
      shippingAddress, // Corrected here
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc get logged in users orders
//@route Get /api/orders/myorders
//@acess private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc get order by id
//@route Get /api/orders/:id
//@acess private
const getMyOrdersById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id }).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ error: "Order not found!" });
    throw new Error("Order not found!");
  }
});

// @desc get update order to paid
//@route post /api/orders/:id/pay
//@acess private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      emailAddress: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404).json({ error: "Order not found!" });
    throw new Error("Order not found!");
  }
});

// @desc get update order to delivered
//@route put   /api/orders/:id/deliver
//@acess private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send(" update Order To deliver");
});

// @desc get all oreders
//@route Get /api/orders/:id/pay
//@acess private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  getMyOrders,
  addOrderItem,
  getMyOrdersById,
  updateOrderToDelivered,
  getOrders,
  updateOrderToPaid,
};
