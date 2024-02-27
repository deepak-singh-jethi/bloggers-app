const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const app = express();
const port = process.env.PORT || 3000;
const secretKey = crypto.randomBytes(32).toString("hex");
const tokenExpiration = "1h";

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const usersFilePath = path.join(dataDir, "users.json");
const vlogsFilePath = path.join(dataDir, "vlogs.json");

// Helper function to read and write files
const readFromFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const writeToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const authenticateUser = (req, res, next) => {
  const authToken = req.cookies.authToken;

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(authToken, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  if (username.length < 3) {
    return res.status(400).json({
      message: "Invalid username format or too short (min 3 characters)",
    });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password is too short (min 6 characters)" });
  }

  const usersData = readFromFile(usersFilePath);

  // Check if user already exists
  if (usersData[username]) {
    return res.status(400).json({ message: "Username already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    usersData[username] = { username, password: hashedPassword };
    writeToFile(usersFilePath, usersData);

    // Generate a JWT token
    const authToken = jwt.sign({ username }, secretKey, {
      expiresIn: tokenExpiration,
    });

    // Set authentication cookie with the JWT token
    res.cookie("authToken", authToken, { httpOnly: true });

    // Respond with the same structure as the login endpoint
    res.json({ message: "User registered successfully", username, authToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const usersData = readFromFile(usersFilePath);

  // Check if user exists
  if (!usersData[username]) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    const userData = usersData[username];
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const authToken = jwt.sign({ username }, secretKey, {
      expiresIn: tokenExpiration,
    });

    // Set authentication cookie with the JWT token
    res.cookie("authToken", authToken, { httpOnly: true });
    res.json({ message: "Login successful", username, authToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Logout endpoint
app.post("/logout", authenticateUser, (req, res) => {
  // Clear authentication cookie
  res.clearCookie("authToken");
  res.json({ message: "Logout successful" });
});

// Vlog creation endpoint
app.post("/vlogs", (req, res) => {
  const { heading, content, category, imageURL, username } = req.body;

  // Validation: Check if heading, content, category, and imageURL are provided
  if (!heading || !content || !category || !imageURL) {
    return res.status(400).json({
      message:
        "Heading, content, category, and imageURL are required for vlog creation",
    });
  }

  try {
    const vlogId = uuidv4();
    const vlogData = {
      id: vlogId,
      heading,
      content,
      category,
      imageURL,
      author: username,
      createdAt: new Date(),
    };

    const allVlogs = readFromFile(vlogsFilePath);
    allVlogs.push(vlogData);
    writeToFile(vlogsFilePath, allVlogs);

    res.json({ message: "Vlog created successfully", vlog: vlogData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all vlogs endpoint
app.get("/vlogs", (req, res) => {
  try {
    // Read all vlogs from the data file
    const allVlogs = readFromFile(vlogsFilePath);
    res.json({ vlogs: allVlogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a specific vlog endpoint
app.get("/vlogs/:id", (req, res) => {
  const vlogId = req.params.id;

  try {
    // Read all vlogs from the data file
    const allVlogs = readFromFile(vlogsFilePath);

    // Find the vlog with the given ID
    const vlog = allVlogs.find((v) => v.id === vlogId);

    if (!vlog) {
      return res.status(404).json({ message: "Vlog not found" });
    }

    res.json({ vlog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update vlog endpoint
app.put("/vlogs/:id", (req, res) => {
  const vlogId = req.params.id;
  const { heading, content, category, imageURL } = req.body;

  // Check if vlog file exists
  try {
    const allVlogs = readFromFile(vlogsFilePath);

    // Find the vlog with the given ID
    const vlogIndex = allVlogs.findIndex((v) => v.id === vlogId);

    if (vlogIndex === -1) {
      return res.status(404).json({ message: "Vlog not found" });
    }

    const existingVlogData = allVlogs[vlogIndex];

    // Update vlog data
    existingVlogData.heading = heading || existingVlogData.heading;
    existingVlogData.content = content || existingVlogData.content;
    existingVlogData.category = category || existingVlogData.category;
    existingVlogData.imageURL = imageURL || existingVlogData.imageURL;

    // Save updated vlog data to file
    writeToFile(vlogsFilePath, allVlogs);

    res.json({ message: "Vlog updated successfully", vlog: existingVlogData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete vlog endpoint

app.delete("/vlogs/:id", (req, res) => {
  const vlogId = req.params.id;

  try {
    const allVlogs = readFromFile(vlogsFilePath);

    // Find the vlog with the given ID
    const vlogIndex = allVlogs.findIndex((v) => v.id === vlogId);

    if (vlogIndex === -1) {
      return res.status(404).json({ message: "Vlog not found" });
    }

    // Delete vlog from the array
    allVlogs.splice(vlogIndex, 1);

    // Save updated vlog data to file
    writeToFile(vlogsFilePath, allVlogs);

    res.json({ message: "Vlog deleted successfully", vlogs: allVlogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/logout", authenticateUser, (req, res) => {
  res.clearCookie("authToken");

  res.json({ message: "Logout successful" });
});

// Server listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
