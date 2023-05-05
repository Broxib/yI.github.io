const aboutContent = `
  <p>Welcome to [Accounting Firm Name], your trusted partner ...</p>
  <p>Our services include tax planning and compliance ...</p>
  <p>With [Accounting Firm Name], you can expect personalized ...</p>
  <p>Contact us today to learn more ...</p>
`;

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
  
  const Extrainfo = {
    nextAppointment: "May 30, 2023",
    username: "Yassine ibork",
    get amountSpent() {
      let total = 0;
      for (const project of projects) {
        if (project.owner === this.username) {
          total += project.budget;
        }
      }
      return total;
    }
  };
  const Extrainfo2 = {

    get totalAmount() {
      let total = 0;
      for (const project of projects) {
        total += project.budget;
      }
      return total;
    }
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

const appointments = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'];

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

const defaultAccounts = [
  {
    email: 'client@example.com',
    password: 'client123',
    type: 'client',
  },
  {
    email: 'employee@example.com',
    password: 'employee123',
    type: 'employee',
  },
];

module.exports = {
  aboutContent,
  employeeNames,
  projects,
  Extrainfo,
  Extrainfo2,
  availableServices,
  appointments,
  timeSlots,
  defaultAccounts,
};