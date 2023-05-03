import { useNavigate } from "react-router-dom";
import AppBar from "./AppBar";
import DashboardCard from "./DashboardCard";
// import "./Maindashbord.css";
import { Route, Routes } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import "./Table1.css";
import axios from "axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetchProjects();
  }, []);


  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/projects');
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };


  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const numberOfProjects = projects.length;

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
