const Order = require("../../models/orders");

const calculateOrderNumber = async (tableData) => {

  const allOrders = await Order.find({}).exec()

  const lastOrder = allOrders[allOrders.length - 1]

  let orderNumber = 1000;
  if (lastOrder) {
    orderNumber = +lastOrder.orderNumber++
  }
  return orderNumber;
};


module.exports = {calculateOrderNumber}