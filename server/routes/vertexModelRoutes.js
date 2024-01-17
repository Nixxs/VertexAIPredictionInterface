const express = require("express");
const multer = require('multer');
const VertexModelController = require("../controllers/vertexModelController");

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


// matches GET requests sent to /api/users
// (the prefix from server.js)
router.get("/", (req, res) => {
  VertexModelController.getAvailableModels(res)
});

// matches POST requests sent to /api/users/create
router.post("/dogcat", upload.single('image'), (req, res) => {
  VertexModelController.predictDogCat(req, res);
});

module.exports = router;
