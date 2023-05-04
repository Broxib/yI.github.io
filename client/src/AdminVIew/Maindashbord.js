import { useNavigate, useParams } from "react-router-dom";
import AppBar from "./AppBar";
import DashboardCard from "./DashboardCard";
import { Route, Routes } from "react-router-dom";
import "./Maindashbord.css";
import React, { useState, useMemo, useEffect } from "react";
import "./Table1.css";
import axios from "axios";

const MainDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [Extrainfo, setExtrainfo] = useState([]);
  const [clientsCount, setClientsCount] = useState(0);
  const amountSpent = Extrainfo.totalAmount;
  const { clientName } = useParams();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/projects");
        setProjects(response.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
    fetchClientsCount();
  }, [clientName]);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const username = "yassine ibork";
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleEditClient = async (clientName, clientProjects) => {
    const newClientName = prompt("Enter new client name:", clientName);

    if (newClientName) {
      try {
        const response = await axios.patch(
          "http://localhost:1000/api/clients",
          { clientName, newClientName }
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error editing client:", error);
      }
    }
  };

  const handleDeleteClient = async (clientName) => {
    try {
      const response = await axios.delete("http://localhost:1000/api/clients", {
        data: { clientName },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const fetchClientsCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/api/clients/count"
      );
      setClientsCount(response.data.count);
    } catch (error) {
      console.error("Error fetching clients count:", error);
    }
  };
  useEffect(() => {
    fetchExtrainfo();
  }, []);

  const fetchExtrainfo = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/extrainfo2');
      setExtrainfo(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  return (
    <>
      <AppBar username={username} />
      <div className="container">
        <h2>Dashboard</h2>
        <div className="dashboard-cards">
          <DashboardCard
            title="Number of Clients"
            value={clientsCount}
            description="Projects you are currently managing"
            onClick={() => setShowProjectModal(true)}
          />
                  <DashboardCard
            title="Amount Spent"
            value={`$${amountSpent}`}
            description="Total amount spent on services"
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

export default MainDashboard;
