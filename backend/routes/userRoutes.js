const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// RESTful routes
router.get("/", userController.getAllUsers);           // GET /api/users
router.get("/:id", userController.getUserById);        // GET /api/users/:id
router.post("/", userController.createUser);           // POST /api/users
router.put("/:id", userController.updateUser);         // PUT /api/users/:id
router.delete("/:id", userController.deleteUser);      // DELETE /api/users/:id

module.exports = router;
