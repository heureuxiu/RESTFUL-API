const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Connect to MongoDB (Make sure MongoDB is running)
mongoose
  .connect("mongodb+srv://umarijaz298:<umarijaz298>@cluster0.diqe8cr.mongodb.net/")
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch((err) => {
    console.log("Mongo connection error", err);
  });

// Create a simple mongoose model
const Item = mongoose.model("Item", {
  id: { type: Number, unique: true },
  name: { type: String, unique: true },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("assignment crud app with mongo and express");
});

// Routes
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const updatedItem = await Item.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedItem);
});

app.delete("/items/:id", async (req, res) => {
  const deletedItem = await Item.findOneAndRemove({ id: req.params.id });
  res.json(deletedItem);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
