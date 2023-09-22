const Order = require("../../models/orders");
const {calculateTotalPrice} = require("./calculateTotalPrice");
const submitNewOrder = async (req, res) => {
  const {
    title: title,
    tableData: tableData,
    fileName: fileName,
    fileUrl: fileUrl,
    description: description,
    receiverId: receiverId

  } = req.body;

  //console.log(req.userInfo.phoneNumber);
  const phoneNumber = req.userInfo.phoneNumber
  debugger
  if (!title) return res.status(400).json({status: false, message: "عنوان را وارد کنید"});
  if (!phoneNumber) return res.status(400).json({status: false, message: "در توکن ارسالی شماره تماس وجود ندارد"});
  // if (!fileName) return  res.status(400).json({status: false, message: "نام فایل را وارد کنید"});
  // if (!fileUrl) return  res.status(400).json({status: false, message: "آدرس فایل را وارد کنید"});

  // insert to db
  //find Object Id  oh sender and reciver PHone Number
  try {
    const totalPrice = await calculateTotalPrice(tableData)
    const order = new Order({
      // senderId: phoneNumber,
      // receiverId: phoneNumber,
      title: "hello",
      tableData,
      fileName: "",
      fileUrl: "",
      description: "",
      totalPrice,
    });

    const newOrder = await order.save();
    res.send({
      status: true, message: "سفارش با موفقیت ثبت شد", order: newOrder
    })
  } catch (err) {
    res.send({
      status: false, message: err,
    })
  }
}


module.exports = {
  submitNewOrder
}