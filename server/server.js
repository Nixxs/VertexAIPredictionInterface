require("dotenv").config();
const express = require("express");
const cors = require("cors");
let vertexModelRoutes = require("./routes/vertexModelRoutes");

const app = express();

const corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/models", vertexModelRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the vertex ai model endpoint api interface." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
