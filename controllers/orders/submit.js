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
  if (!title) res.status(400).json({status: false, message: "عنوان را وارد کنید"});
  if (!phoneNumber) res.status(400).json({status: false, message: "در توکن ارسالی شماره تماس وجود ندارد"});
  if (!fileName) res.status(400).json({status: false, message: "نام فایل را وارد کنید"});
  if (!fileUrl) res.status(400).json({status: false, message: "آدرس فایل را وارد کنید"});

  // insert to db





  res.send({message: "ok"})
}


module.exports = {
  submitNewOrder
}