const router = require("express").Router();
const Product = require("../../models/Product");
const Mongoose = require("mongoose");
const Store = require("../../models/Store");

router.get("/getItems", (req, res) => {
  Product.find().then((result) => res.send(result));
});

router.post("/addItems/:adminId", (req, res) => {
  try {
    const product = new Product({
      productName: "Broom",
      quantity: "15",
      category: "Grocery",
      price: 900,
      adminId: Mongoose.Types.ObjectId(req.params.adminId),
      storeId: Mongoose.Types.ObjectId("5f36b5247337b4a0e52f5cf0"),
    });
    product.save().then((response) => {
      return res.send("Succesful");
    });
  } catch (err) {
    return res.json(err);
  }
});

router.get("/getStoreItem/:adminId", async (req, res) => {
  Product.find({ adminId: req.params.adminId }).then((response) =>
    res.send(response)
  );
});

router.delete("/deleteItem/:productId", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.productId);
  res.send("Success");
});

module.exports = router;