const functions = require("firebase-functions");

const express = require("express");
const axios = require("axios");

const admin = require("firebase-admin")
admin.initializeApp(functions.config().firebase)

const app = express();
const cors = require("cors"); // Import cors package



app.use(cors()); 

exports.app = functions.https.onRequest(app);

// API Gateway route for about content


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
// Get appointments from business logic layer

app.get("/api/appointments", async (req, res) => {
  try {
    const response = await axios.get("https://us-central1-server1237128361.cloudfunctions.net/app/appointments");
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching appointments from business logic layer:",
      error
    );
    res.status(500).json({ message: "Error fetching appointments" });
  }
});
//get projects by client name
app.get("/api/projects/:clientName", async (req, res) => {
  try {
    const response = await axios.get(
      `https://us-central1-server1237128361.cloudfunctions.net/app/projects/${req.params.clientName}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching projects from business logic layer:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
});

app.put("/api/projects/:projectId", async (req, res) => {
  try {
    const response = await axios.put(
      `https://us-central1-server1237128361.cloudfunctions.net/app/projects/${req.params.projectId}`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating project in business logic layer:", error);
    res.status(500).json({ message: "Error updating project" });
  }
});

app.delete("/api/projects/:projectId", async (req, res) => {
  try {
    const response = await axios.delete(
      `https://us-central1-server1237128361.cloudfunctions.net/app/projects/${req.params.projectId}`,
      { data: { clientName: req.body.clientName } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error deleting project in business logic layer:", error);
    res.status(500).json({ message: "Error deleting project" });
  }
});

app.patch("/api/clients", async (req, res) => {
  try {
    const response = await axios.patch(
      "https://us-central1-server1237128361.cloudfunctions.net/app/clients",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error editing client in business logic layer:", error);
    res.status(500).json({ message: "Error editing client" });
  }
});
app.delete("/api/clients", async (req, res) => {
  try {
    const response = await axios.delete("https://us-central1-server1237128361.cloudfunctions.net/app/clients", {
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error deleting client in business logic layer:", error);
    res.status(500).json({ message: "Error deleting client" });
  }
});

app.get("/api/clients/count", async (req, res) => {
  try {
    const response = await axios.get("https://us-central1-server1237128361.cloudfunctions.net/app/clients/count");
    res.json(response.data);
  } catch (error) {
    console.error("Error getting clients count from business logic layer:", error);
    res.status(500).json({ message: "Error getting clients count" });
  }
});

app.get("/api/timeSlots", async (req, res) => {
  try {
    const response = await axios.get("https://us-central1-server1237128361.cloudfunctions.net/app/timeSlots");
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching time slots from business logic layer:",
      error
    );
    res.status(500).json({ message: "Error fetching time slots" });
  }
});

app.get("/api/projects/by-owner/:owner", async (req, res) => {
  try {
    const response = await axios.get(`https://us-central1-server1237128361.cloudfunctions.net/app/projects/by-owner/${req.params.owner}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error getting projects by owner from business logic layer:", error);
    res.status(500).json({ message: "Error getting projects by owner" });
  }
});

app.post("/api/account", async (req, res) => {
  try {
    const response = await axios.post("https://us-central1-server1237128361.cloudfunctions.net/app/account", req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error creating account from business logic layer:", error);
    res.status(500).json({ message: "Error creating account" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const response = await axios.post("https://us-central1-server1237128361.cloudfunctions.net/app/login", req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error login user from business logic layer:", error);
    res.status(500).json({ message: "Error login user" });
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

app.get("/api/projects", async (req, res) => {
  try {
    const response = await axios.get("https://us-central1-server1237128361.cloudfunctions.net/app/projects");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching projects in business logic layer:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
});

app.get("/api/extrainfo", async (req, res) => {
  try {
    const response = await axios.get("https://us-central1-server1237128361.cloudfunctions.net/app/extrainfo");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching projects in business logic layer:", error);
    res.status(500).json({ message: "Error fetching extrainfo" });
  }
});
app.get("/api/extrainfo2", async (req, res) => {
  try {
    const response = await axios.get("https://us-central1-server1237128361.cloudfunctions.net/app/extrainfo2");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching projects in business logic layer:", error);
    res.status(500).json({ message: "Error fetching extrainfo" });
  }
});

app.get("/api/availableServices", async (req, res) => {
  try {
    const response = await axios.get("https://us-central1-server1237128361.cloudfunctions.net/app/availableServices");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching projects in business logic layer:", error);
    res.status(500).json({ message: "Error fetching extrainfo" });
  }
});

