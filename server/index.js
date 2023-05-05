const express = require("express");
const app = express();
const { startOfDay, addDays, formatISO } = require("date-fns");
const cors = require('cors')({origin: true});
app.use(cors);

const aboutContent = `
  <p>Welcome to [Accounting Firm Name], your trusted partner ...</p>
  <p>Our services include tax planning and compliance ...</p>
  <p>With [Accounting Firm Name], you can expect personalized ...</p>
  <p>Contact us today to learn more ...</p>
`;

app.use(express.json());

const employeeNames = [
  'Ahmed',
  'Saad',
  'Yassine',
  'Suhayb',
  'Hamza',
  'Driss',
];

const getRandomEmployee = () => {
  const randomIndex = Math.floor(Math.random() * employeeNames.length);
  return employeeNames[randomIndex];
};

const projects = [

  {
    id: 1,
    name: "Project 1",
    owner: "Yassine Ibrok",
    budget: 5000,
    services: [
      { name: "Service 1", price: 10, employee: getRandomEmployee() },
      { name: "Service 2", price: 200, employee: getRandomEmployee() },
      { name: "Service 3", price: 300, employee: getRandomEmployee() },
    ],
    files: [],
  },
  {
    id: 2,
    name: "Project 2",
    owner: "Driss Kettani",
    budget: 8000,
    services: [
      { name: "Service 4", price: 400, employee: getRandomEmployee() },
      { name: "Service 5", price: 500, employee: getRandomEmployee() },
      { name: "Service 6", price: 600, employee: getRandomEmployee() },
    ],
    files: [],
  },
  {
    id: 3,
    name: "Project 3",
    owner: "Suhayb Daud",
    budget: 12000,
    services: [
      { name: "Service 7", price: 700, employee: getRandomEmployee() },
      { name: "Service 8", price: 800, employee: getRandomEmployee() },
      { name: "Service 9", price: 900, employee: getRandomEmployee() },
    ],
    files: [],
  },
  {
    id: 4,
    name: "Project 4",
    owner: "Suhayb Daud",
    budget: 14000,
    services: [
      { name: "Service 10", price: 700, employee: getRandomEmployee() },
      { name: "Service 11", price: 800, employee: getRandomEmployee() },
      { name: "Service 12", price: 900, employee: getRandomEmployee()},
    ],
    files: [],
  },
  {
    id: 5,
    name: "Project 5",
    owner: "Driss Kettani",
    budget: 34000,
    services: [
      { name: "Service 13", price: 700, employee: getRandomEmployee() },
      { name: "Service 14", price: 800, employee: getRandomEmployee() },
      { name: "Service 15", price: 900, employee: getRandomEmployee() },
    ],
    files: [],
  },
];

const getClientsWithProjectCount = (projects) => {
  const clientsCount = {};

  projects.forEach((project) => {
    const owner = project.owner;

    if (clientsCount[owner]) {
      clientsCount[owner].count++;
      clientsCount[owner].projects.push(project);
    } else {
      clientsCount[owner] = { count: 1, projects: [project] };
    }
  });

  return clientsCount;
};



const Extrainfo = {
  amountSpent: 17000,
  nextAppointment: "May 30, 2023",
  username: "Yassine ibork",
};

const availableServices = [
  { name: 'Service 1', price: 100 },
  { name: 'Service 2', price: 200 },
  { name: 'Service 3', price: 300 },
  { name: 'Service 4', price: 400 },
  { name: 'Service 5', price: 500 },
  { name: 'Service 6', price: 600 },
  { name: 'Service 7', price: 700 },
  { name: 'Service 8', price: 800 },
  { name: 'Service 9', price: 900 },
];

// Business Logic route for about content
app.get("/about", (req, res) => {
  res.json({ content: aboutContent });
});

app.post("/appointments", (req, res) => {
  // Save the appointment to a database, send confirmation emails, etc.
  // ...

  res.json({ message: "Appointment submitted successfully" });
});


app.get("/timeSlots", (req, res) => {
  // Fetch the available time slots from a database or external service
  // ...

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

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

// app.get("/projectsEmp", (req, res) => {
//   res.json(projectEMployee);
// });

app.get("/extrainfo", (req, res) => {
  res.json(Extrainfo);
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
