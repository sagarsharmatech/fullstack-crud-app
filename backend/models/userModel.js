const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [0, "Age must be a positive number"],
  },
  mobile: {
    type: Number,
    required: [true, "Mobile number is required"],
    min: [1000000000, "Mobile must be at least 10 digits"],
  },
  interest: {
    type: [String],
    required: [true, "At least one interest is required"],
    validate: [(arr) => arr.length > 0, "Interest array cannot be empty"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
