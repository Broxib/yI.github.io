import React, { useState } from 'react';
import './CreateProjectModal.css';

const CreateProjectModal = ({ onCreate, onClose }) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, owner, budget: parseInt(budget, 10) });
    onClose();
  };

  return (
    <div className="create-project-modal">
      <div className="modal-content">
        <h3>Create New Project</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Project Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="owner">Owner:</label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />

          <label htmlFor="budget">Budget:</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />

          <button type="submit">Create Project</button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;