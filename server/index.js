const express = require("express");
const app = express();
const {
  aboutContent,
  projects,
  Extrainfo,
  Extrainfo2,
  availableServices,
  appointments,
  timeSlots,
  defaultAccounts,
} = require("../Data/Data.js");


const { startOfDay, addDays, formatISO } = require("date-fns");

app.use(express.json());

const formatAppointmentTime = (time) => {
  return time;
};

const saveAppointment = async (appointmentData) => {
  // console.log('Appointment date:', appointmentData.date);
  // console.log('Appointment time:', appointmentData.time);

  const formattedTime = formatAppointmentTime(appointmentData.time);
  const newAppointment = {
    date: appointmentData.date,
    time: formattedTime,
  };
  appointments.push(newAppointment);
  return newAppointment;
};

const getAllAppointments = async () => {
  return appointments;
};

app.post('/appointments', async (req, res) => {
  try {
    const appointmentData = req.body;
    const result = await saveAppointment(appointmentData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/appointments', async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    console.log('Appointments:', appointments);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const getProjectsByClient = async (clientName) => {
  const project2 = projects.filter((project) => project.owner === clientName);
  console.log('Project:', project2);
  return project2;
};

app.get('/projects/:clientName', async (req, res) => {
  try {
    const project1 = await getProjectsByClient(req.params.clientName);
    res.status(200).json(project1);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const updateProject = async (projectId, clientName, updatedName) => {
  projects.forEach((project, index) => {
    if (project.id === parseInt(projectId)) {
      projects[index].name = updatedName;
    }
  });

  const updatedProjects = projects.filter((project) => project.owner === clientName);
  return updatedProjects;
};


const deleteProject = async (projectId, clientName) => {
  const projectIndex = projects.findIndex((project) => project.id === parseInt(projectId));

  if (projectIndex > -1) {
    projects.splice(projectIndex, 1);
  }

  const updatedProjects = projects.filter((project) => project.owner === clientName);
  return updatedProjects;
};

async function editClient(clientName, newClientName) {
  projects.forEach((project) => {
    if (project.owner === clientName) {
      project.owner = newClientName;
    }
  });
  return projects;
}
async function deleteClient(clientName) {
  return projects.filter((project) => project.owner !== clientName);
}
async function getClientsCount() {
  const clientsSet = new Set();
  projects.forEach((project) => {
    clientsSet.add(project.owner);
  });
  return { count: clientsSet.size };
}
async function getProjectsByOwner(owner) {
  return projects.filter((project) => project.owner === owner);
}

app.get('/projects/by-owner/:owner', async (req, res) => {
  try {
    const projectsByOwner = await getProjectsByOwner(req.params.owner);
    res.status(200).json(projectsByOwner);
  } catch (error) {
    // ... error handling ...
  }
});

app.get('/clients/count', async (req, res) => {
  try {
    const clientsCount = await getClientsCount();
    res.status(200).json(clientsCount);
  } catch (error) {
    // ... error handling ...
  }
});

app.delete('/clients', async (req, res) => {
  try {
    const updatedProjects = await deleteClient(req.body.clientName);
    res.status(200).json(updatedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.patch('/clients', async (req, res) => {
  try {
    const updatedProjects = await editClient(req.body.clientName, req.body.newClientName);
    res.status(200).json(updatedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/projects/:projectId', async (req, res) => {
  try {
    const updatedProjects = await updateProject(req.params.projectId, req.body.clientName, req.body.name);
    res.status(200).json(updatedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

app.delete('/projects/:projectId', async (req, res) => {
  try {
    const updatedProjects = await deleteProject(req.params.projectId,req.body.clientName);
    res.status(200).json(updatedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Business Logic route for about content
app.get("/about", (req, res) => {
  res.json({ content: aboutContent });
});

app.get("/timeSlots", (req, res) => {
  // Fetch the available time slots from a database or external service
  // ...
  const getDateSlots = () => {
    const dateSlots = [];
    for (let i = 0; i < 7; i++) {
      dateSlots.push(addDays(startOfDay(new Date()), i));
    }
    return dateSlots;
  };

  const dateSlots = getDateSlots();

  const combinedDateTimeSlots = dateSlots.reduce((acc, currentDate) => {
    const currentDateSlots = timeSlots.map((timeSlot) => {
      const [hours, minutes] = timeSlot.split(":");
      const dateTime = new Date(currentDate);
      dateTime.setHours(hours, minutes);
      return formatISO(dateTime);
    });
    return [...acc, ...currentDateSlots];
  }, []);

  res.json(combinedDateTimeSlots);
});

async function createAccount(accountData) {
  // You can perform additional validation, save the account data to a database, or call another API here.
  // For the purpose of this example, we'll just return a success message.

  return { message: "Account created successfully" };
}

async function loginUser(userData) {
  const { email, password } = userData;
  const account = defaultAccounts.find(
    (account) => account.email === email && account.password === password
  );

  if (account) {
    return { userType: account.type };
  } else {
    console.log('Invalid email or password');
    return null;
  }
}

app.post('/login', async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const result = await loginUser(userData);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    // ... error handling ...
  }
});

app.post('/account', async (req, res) => {
  try {
    const accountData = req.body;
    const result = await createAccount(accountData);
    res.status(200).json(result);
  } catch (error) {
    // ... error handling ...
  }
});



app.post("/projects", (req, res) => {
  const { name, owner, budget } = req.body;

  // Validate and process the received data
  // Save the project to a database
  // ...

  res.json({
    message: "Project created successfully",
    project: { name, owner, budget },
  });
});


app.get("/projects", (req, res) => {
  res.json(projects);
});

app.get("/extrainfo", (req, res) => {
  console.log(Extrainfo.amountSpent);
  res.json(Extrainfo);
});
app.get("/extrainfo2", (req, res) => {

  res.json(Extrainfo2);
});

app.post("/projects", (req, res) => {
  const { name, owner, budget } = req.body;

  // Basic validation of the request body data
  if (!name || !owner || !budget) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newProject = {
    id: projects.length + 1,
    name,
    owner,
    budget,
    services: [],
  };

  // Add the new project to the dummy data
  projects.push(newProject);

  res.status(201).json(newProject);
});


app.get("/availableServices", (req, res) => {
  res.json(availableServices);
});

app.listen(2000, () => {
  console.log("the server is listening in port 2000");
});
