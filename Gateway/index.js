const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import cors package

const app = express();
const PORT = 1000;
const admin = require("firebase-admin")

app.use(cors()); // Use cors middleware to enable CORS
app.use(express.json());

// API Gateway route for about content
app.get("/api/about", async (req, res) => {
  try {
    const response = await axios.get("https://us-central1-server1237128361.cloudfunctions.net/app/about");
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching about content from business logic layer:",
      error
    );
    res.status(500).json({ message: "Error fetching about content" });
  }
});
app.post("/api/appointments", async (req, res) => {
  try {
    const response = await axios.post(
      "https://us-central1-server1237128361.cloudfunctions.net/app/appointments",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error submitting appointment to business logic layer:",
      error
    );
    res.status(500).json({ message: "Error submitting appointment" });
  }
});

app.get("/api/timeSlots", async (req, res) => {
  try {
    const response = await axios.get("https://us-central1-server1237128361.cloudfunctions.net/app00/timeSlots");
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching time slots from business logic layer:",
      error
    );
    res.status(500).json({ message: "Error fetching time slots" });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const response = await axios.post(
      "https://us-central1-server1237128361.cloudfunctions.net/app/projects",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error creating project in business logic layer:", error);
    res.status(500).json({ message: "Error creating project" });
  }
});

app.get('/api/projects', async (req, res) => {
 
  fetch('https://us-central1-server1237128361.cloudfunctions.net/app/projects')
      .then(response => response.json())
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        console.error('Error fetching projects in business logic layer:', error);
        res.status(500).json({ message: 'Error fetching projects' });   });
});


app.get('/api/extrainfo', async (req, res) => {
  try {
    const response = await axios.get('https://us-central1-server1237128361.cloudfunctions.net/app/extrainfo');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching projects in business logic layer:', error);
    res.status(500).json({ message: 'Error fetching extrainfo' });
  }
});

app.get('/api/availableServices', async (req, res) => {
  try {
    const response = await axios.get('https://us-central1-server1237128361.cloudfunctions.net/app/availableServices');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching projects in business logic layer:', error);
    res.status(500).json({ message: 'Error fetching extrainfo' });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});

