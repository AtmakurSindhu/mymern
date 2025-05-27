const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://atmakursindhu:sindhu123@cluster0.ahr8u5a.mongodb.net/mydb");

// Updated schema with phone instead of age
const userSchema = new mongoose.Schema({ 
  name: String, 
  phone: String 
});

const User = mongoose.model("User", userSchema);

// Get all users
app.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

// Add new user
app.post("/", (req, res) => {
  const user = new User(req.body);
  user.save().then(() => res.send("User saved"));
});

// Update user by _id (only updating name here)
app.put("/", (req, res) => {
  const { _id, newName, newno } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name: newName, phone: newno },  // update both fields
    { new: true }
  )
    .then(updatedUser => {
      if (updatedUser) res.send("User updated");
      else res.send("User not found");
    });
});


// Delete user by _id
app.delete("/", (req, res) => {
  const { _id } = req.body;
  User.findByIdAndDelete(_id)
    .then(deletedUser => {
      if (deletedUser) res.send("User deleted");
      else res.send("User not found");
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
