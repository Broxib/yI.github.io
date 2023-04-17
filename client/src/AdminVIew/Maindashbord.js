import { useNavigate } from "react-router-dom";
import AppBar from "./AppBar";
import DashboardCard from "./DashboardCard";
import "./Maindashbord.css";
import { Route, Routes } from "react-router-dom";
import React, { useState, useMemo } from "react";
// import ClientDetails from './Projectdetails';

const Dashboard = () => {

  const employeeNames = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
  ];

  const getRandomEmployee = () => {
    const randomIndex = Math.floor(Math.random() * employeeNames.length);
    return employeeNames[randomIndex];
  };
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project 1",
      owner: "John Doe",
      budget: 5000,
      services: [
        { name: "Service 1", price: 10, employee: getRandomEmployee() },
        { name: "Service 2", price: 200, employee: getRandomEmployee() },
        { name: "Service 3", price: 300, employee: getRandomEmployee() },
      ],
    },
    {
      id: 2,
      name: "Project 2",
      owner: "Jane Smith",
      budget: 8000,
      services: [
        { name: "Service 4", price: 400, employee: getRandomEmployee() },
        { name: "Service 5", price: 500, employee: getRandomEmployee() },
        { name: "Service 6", price: 600, employee: getRandomEmployee() },
      ],
    },
    {
      id: 3,
      name: "Project 3",
      owner: "Bobbb Johnson",
      budget: 12000,
      services: [
        { name: "Service 7", price: 700, employee: getRandomEmployee() },
        { name: "Service 8", price: 800, employee: getRandomEmployee() },
        { name: "Service 9", price: 900, employee: getRandomEmployee() },
      ],
    },
    {
      id: 4,
      name: "Project 4",
      owner: "Bobbb Johnson",
      budget: 14000,
      services: [
        { name: "Service 10", price: 700, employee: getRandomEmployee() },
        { name: "Service 11", price: 800, employee: getRandomEmployee() },
        { name: "Service 12", price: 900, employee: getRandomEmployee()},
      ],
    },
    {
      id: 5,
      name: "Project 5",
      owner: "Jane Smith",
      budget: 34000,
      services: [
        { name: "Service 13", price: 700, employee: getRandomEmployee() },
        { name: "Service 14", price: 800, employee: getRandomEmployee() },
        { name: "Service 15", price: 900, employee: getRandomEmployee() },
      ],
    },
  ]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const numberOfProjects = projects.length;
  const amountSpent = 1200;
  const nextAppointment = "April 30, 2023";
  const username = "yassine ibork";
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' for ascending, 'desc' for descending

  const clientsWithProjectCount = useMemo(() => {
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
  }, [projects]);

  const handleClientNameClick = (clientName, clientProjects) => {
    navigate(`/AdminView/${clientName}`, {
      state: { projects: clientProjects },
    });
  };

  const handleSort = () => {
    if (sortOrder === "asc") {
      setProjects([...projects].sort((a, b) => a.owner.localeCompare(b.owner)));
      setSortOrder("desc");
    } else {
      setProjects([...projects].sort((a, b) => b.owner.localeCompare(a.owner)));
      setSortOrder("asc");
    }
  };
  const handleEdit = (id, updatedName) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, owner: updatedName } : project
      )
    );
  };

  const handleEditClient = (clientName, clientProjects) => {
    const updatedName = prompt("Enter new client name:", clientName);

    if (updatedName) {
      setProjects(
        projects.map((project) =>
          project.owner === clientName
            ? { ...project, owner: updatedName }
            : project
        )
      );
    }
  };

  const handleDeleteClient = (clientName) => {
    setProjects(projects.filter((project) => project.owner !== clientName));
  };



  
  return (
    <>
      <AppBar username={username} />
      <div className="container">
        <h2>Dashboard</h2>
        <div className="dashboard-cards">
          <DashboardCard
            title="Number of Clients"
            value={numberOfProjects}
            description="Projects you are currently managing"
            onClick={() => setShowProjectModal(true)}
          />
        </div>
        {showProjectModal && (
          <div className="project-list">
            <h3>Projects</h3>
            <table>
              <thead>
                <tr>
                  <th onClick={handleSort} style={{ cursor: "pointer" }}>
                    Client Name {sortOrder === "asc" ? "Sort ASC" : "Sort DESC"}
                  </th>
                  <th>Number of Projects</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(clientsWithProjectCount).map(
                  ([clientName, { count, projects }]) => (
                    <tr key={clientName}>
                      <td>
                        <span
                          onClick={() =>
                            handleClientNameClick(clientName, projects)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {clientName}
                        </span>
                      </td>
                      <td>{count}</td>
                      <td>
                        <button
                          onClick={() => handleEditClient(clientName, projects)}
                        >
                          Edit
                        </button>
                        <button onClick={() => handleDeleteClient(clientName)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
