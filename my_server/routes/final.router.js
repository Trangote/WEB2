const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const webPush = require("web-push");
const Camera = require("../models/Camera");
const Studio = require("../models/Studio");
const User = require("../models/User");
const Album = require("../models/Album");
const Blog = require("../models/Blog");
const KhuyenMai = require("../models/KhuyenMai");
const Order = require("../models/Order");

var storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
var upload = multer({ storage: storage });
router.post(
  "/camera",
  upload.fields([
    { name: "imgProduct1", maxCount: 10 },
    { name: "imgProduct2", maxCount: 10 },
    { name: "imgProduct3", maxCount: 10 },
    { name: "imgProduct4", maxCount: 10 },
  ]),
  function (req, res) {
    if (req.files) {
      let cameraInfo = new Camera({
        productName: req.body.productName,
        unitPrice: req.body.unitPrice,
        brand: req.body.brand,
        type: req.body.type,
        origin: req.body.origin,
        model: req.body.model,
        imgProduct1: req.files.imgProduct1[0].filename,
        imgProduct2: req.files.imgProduct2[0].filename,
        imgProduct3: req.files.imgProduct3[0].filename,
        imgProduct4: req.files.imgProduct4[0].filename,
        productDescription: req.body.productDescription,
        quantity: req.body.quantity,
      });
      cameraInfo.save();
      res.json({ message: "success" });
    }
  }
);
router.post(
  "/studio",
  upload.fields([
    { name: "imgProduct1", maxCount: 10 },
    { name: "imgProduct2", maxCount: 10 },
    { name: "imgProduct3", maxCount: 10 },
    { name: "imgProduct4", maxCount: 10 },
  ]),
  function (req, res) {
    if (req.files) {
      let studioInfo = new Studio({
        productName: req.body.productName,
        unitPrice: req.body.unitPrice,
        style: req.body.style,
        album: req.body.album,
        imgProduct1: req.files.imgProduct1[0].filename,
        imgProduct2: req.files.imgProduct2[0].filename,
        imgProduct3: req.files.imgProduct3[0].filename,
        imgProduct4: req.files.imgProduct4[0].filename,
        productDescription: req.body.productDescription,
        quantity: req.body.quantity,
      });
      studioInfo.save();
      res.json({ message: "success" });
    }
  }
);
router.post("/pushDatThue", (req, res) => {
  let info = req.body;
  res.set("Content-Type", "application/json");
  webPush.setVapidDetails(
    "mailto:test@gmail.com",
    "BH0ns3J-fiW3YpJ_fctsGLQ2RWaIWHH10tX_i_-AsEVh_UaXf_bRf3BD4OpYh8stkvRQk38z--y0FCfuJH56l28",
    "-vKx0qwyItAuDpEIGrBjOAfATW-hD1j6caAQVYx2wIE"
  );
  let notifData = JSON.stringify({
    notification: {
      title: "Đặt thuê thành công",
      body: "Bạn đã đặt thuê thành công",
      icon: "https://cdn-icons-png.flaticon.com/512/3486/3486926.png",
    },
  });
  Promise.resolve(webPush.sendNotification(info, notifData))
    .then(() => {
      res.json({ message: "success" });
    })
    .catch((err) => {
      res.json({ Error: err.message });
    });
});
router.post("/pushThanhToan", (req, res) => {
  let info = req.body;
  res.set("Content-Type", "application/json");
  webPush.setVapidDetails(
    "mailto:test@gmail.com",
    "BH0ns3J-fiW3YpJ_fctsGLQ2RWaIWHH10tX_i_-AsEVh_UaXf_bRf3BD4OpYh8stkvRQk38z--y0FCfuJH56l28",
    "-vKx0qwyItAuDpEIGrBjOAfATW-hD1j6caAQVYx2wIE"
  );
  let notifData = JSON.stringify({
    notification: {
      title: "Thanh toán thành công",
      body: "Bạn đã thanh toán thành công",
      icon: "https://cdn-icons-png.flaticon.com/512/3486/3486926.png",
    },
  });
  Promise.resolve(webPush.sendNotification(info, notifData))
    .then(() => {
      res.json({ message: "success" });
    })
    .catch((err) => {
      res.json({ Error: err.message });
    });
});
router.patch("/users/:id", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          content: req.body.content,
          title: req.body.title,
          type: req.body.type,
        },
      }
    );
    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/cameras", function (req, res) {
  Camera.find({}, function (err, data) {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json(data);
    }
  });
});
router.get("/studios", function (req, res) {
  Studio.find({}, function (err, data) {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json(data);
    }
  });
});
router.get("/users", function (req, res) {
  User.find({}, function (err, data) {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json(data);
    }
  });
});
router.get("/cameras/:id", async (req, res) => {
  try {
    let Camera = await Camera.findById(req.params.id);
    res.json(Camera);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/studios/:id", async (req, res) => {
  try {
    let Studio = await Studio.findById(req.params.id);
    res.json(Studio);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/users/:id", async (req, res) => {
  try {
    let User = await User.findById(req.params.id);
    res.json(User);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.patch(
  "/cameras/:id",
  upload.fields([
    { name: "imgProduct1", maxCount: 1 },
    { name: "imgProduct2", maxCount: 1 },
    { name: "imgProduct3", maxCount: 1 },
    { name: "imgProduct4", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (req.files) {
        await Camera.updateOne(
          { _id: req.params.id },
          {
            $set: {
              productName: req.body.productName,
              unitPrice: req.body.unitPrice,
              brand: req.body.brand,
              origin: req.body.origin,
              type: req.body.type,
              model: req.body.model,
              productDescription: req.body.productDescription,
              imgProduct1: req.files.imgProduct1[0].filename,
              imgProduct2: req.files.imgProduct2[0].filename,
              imgProduct3: req.files.imgProduct3[0].filename,
              imgProduct4: req.files.imgProduct4[0].filename,
            },
          }
        );
        res.json({ message: "success" });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  }
);
router.patch(
  "/studios/:id",
  upload.fields([
    { name: "imgProduct1", maxCount: 1 },
    { name: "imgProduct2", maxCount: 1 },
    { name: "imgProduct3", maxCount: 1 },
    { name: "imgProduct4", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (req.files) {
        await Studio.updateOne(
          { _id: req.params.id },
          {
            $set: {
              productName: req.body.productName,
              unitPrice: req.body.unitPrice,
              style: req.body.style,
              album: req.body.album,
              productDescription: req.body.productDescription,
              imgProduct1: req.files.imgProduct1[0].filename,
              imgProduct2: req.files.imgProduct2[0].filename,
              imgProduct3: req.files.imgProduct3[0].filename,
              imgProduct4: req.files.imgProduct4[0].filename,
            },
          }
        );
        res.json({ message: "success" });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  }
);
router.delete("/cameras/:id", async (req, res) => {
  try {
    await Camera.deleteOne({ _id: req.params.id });
    res.json({ status: 200, message: "success" });
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.delete("/studios/:id", async (req, res) => {
  try {
    await Studio.deleteOne({ _id: req.params.id });
    res.json({ status: 200, message: "success" });
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.post("/user", async (req, res) => {
  let user = new User({
    userID: req.body.userID,
    userAvatar: req.body.userAvatar,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    userName: req.body.userName,
    password: req.body.password,
    confirmPass: req.body.confirmPass,
    phone: req.body.phone,
    email: req.body.email,
    fullName: req.body.fullName,
    idCard: req.body.idCard,
  });
  try {
    p = await user.save();
    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.patch(
  "/users/useravatar/:id",
  upload.fields([{ name: "userAvatar", maxCount: 1 }]),
  async (req, res) => {
    try {
      if (req.files) {
        await User.updateOne(
          { _id: req.params.id },
          {
            $set: {
              userName: req.body.userName,
              gender: req.body.gender,
              dateOfBirth: req.body.dateOfBirth,
              phone: req.body.phone,
              email: req.body.email,
              password: req.body.password,
              userAvatar: req.files.userAvatar[0].filename,
            },
          }
        );
        res.json({ message: "success" });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  }
);
router.patch("/users/doidiem/:id", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          userPoint: req.body.userPoint,
        },
      }
    );
    res.json({ status: 200, message: "success" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.patch("/users/uploadnot/:id", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      {
        $push: {
          notifications: {
            title: req.body.title,
            body: req.body.body,
            createdAt: req.body.createdAt,
          },
        },
      }
    );
    res.json({ status: 200, message: "success" });
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/users/:idU/:idO", async (req, res) => {
  try {
    let User = await User.findById(req.params.id);
    res.json(User);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/albums", function (req, res) {
  Album.find({}, function (err, data) {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json(data);
    }
  });
});
router.get("/albums/:id", async (req, res) => {
  try {
    let Album = await Album.findById(req.params.id);
    res.json(Album);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/blogs", function (req, res) {
  Blog.find({}, function (err, data) {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json(data);
    }
  });
});
router.get("/blogs/:id", async (req, res) => {
  try {
    let Blog = await Blog.findById(req.params.id);
    res.json(Blog);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/khuyenmais", function (req, res) {
  KhuyenMai.find({}, function (err, data) {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json(data);
    }
  });
});
router.get("/khuyenmais/:id", async (req, res) => {
  try {
    let KhuyenMai = await Blog.findById(req.params.id);
    res.json(Blog);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/orders", function (req, res) {
  Order.find({}, function (err, data) {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json(data);
    }
  });
});
router.get("/orders/:id", async (req, res) => {
  try {
    let Order = await Order.findById(req.params.id);
    res.json(Order);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.post("/order", async (req, res) => {
  let order = new Order({
    userID: req.body.userID,
    productID: req.body.productID,
    orderID: req.body.orderID,
    dateRent: req.body.dateRent,
    dateEnd: req.body.dateEnd,
    timeRent: req.body.timeRent,
    productName: req.body.productName,
    status: req.body.status,
    dateReceive: req.body.dateReceive,
    rentFor: req.body.rentFor,
    voucherID: req.body.voucherID,
    depositPrice: req.body.depositPrice,
    datePay: req.body.datePay,
    fullName: req.body.fullName,
    idCard: req.body.idCard,
    phone: req.body.phone,
    email: req.body.email,
    quantity: req.body.quantity,
  });
  try {
    p = await order.save();
    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.patch("/orders/:id", async (req, res) => {
  try {
    await Order.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
          depositPrice: req.body.depositPrice,
          datePay: req.body.datePay,
        },
      }
    );
    res.json({ status: 200, message: "success" });
  } catch (err) {
    res.json({ message: err.message });
  }
});
module.exports = router;
