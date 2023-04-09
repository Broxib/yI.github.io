import React, { useState } from 'react';
import Modal from 'react-modal';
import './ProjectModal.css';

Modal.setAppElement('#root');

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  const handleClose = () => {
    setModalIsOpen(false);
    onClose();
  };

  const serviceRows = project.services.map((service, index) => (
    <tr key={index}>
      <td>{service.name}</td>
      <td>${service.price}</td>
    </tr>
  ));

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleClose}
      className="project-modal"
      overlayClassName="project-modal-overlay"
      contentLabel="Project Details"
    >
      <div className="project-modal-header">
        <h2>{project.name}</h2>
        <button onClick={handleClose}>X</button>
      </div>
      <div className="project-modal-body">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{serviceRows}</tbody>
        </table>
      </div>
    </Modal>
  );
};

export default ProjectModal;
