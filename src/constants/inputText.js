const remindText = {
  username: "允許半形小寫英文、數字、底線",
  image: "僅限上傳 .PNG .JPG .JPEG 格式檔案，尺寸 < 1 MB",
  phone: "請輸入 10 碼手機號碼，須以 09 開頭",
  address: "",
  password: "請輸入 8 - 16 位密碼，僅允許半形數字及大、小寫英文",
  price: "",
  quantity: "",
  manufactureDate: "",
  expiryDate: "",
}

const inputRule = {
  username: "[a-z0-9_]{1,}",
  image: ".png,.jpg,.jpeg",
  phone: "[0][9][0-9]{8}",
  address: "",
  password: "[a-zA-Z0-9]{8,16}",
  price: "",
  quantity: "",
  manufactureDate: "",
  expiryDate: "",
}

module.exports = { remindText, inputRule }
