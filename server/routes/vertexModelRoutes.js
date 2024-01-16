const express = require("express");
const router = express.Router();
const VertexModelController = require("../controllers/vertexModelController");

// matches GET requests sent to /api/users
// (the prefix from server.js)
router.get("/", (req, res) => {
  VertexModelController.getAvailableModels(res)
});

// matches POST requests sent to /api/users/create
router.post("/dogcat", (req, res) => {
  VertexModelController.predictDogCat(req.body, res);
});

module.exports = router;
