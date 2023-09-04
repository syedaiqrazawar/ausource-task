import React, { useState } from 'react';

const Resource = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState('');
  const [editResource, setEditResource] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleCreate = () => {
    if (newResource) {
      setResources([...resources, newResource]);
      setNewResource('');
    }
  };

  const handleUpdate = () => {
    if (editResource !== '' && editIndex !== null) {
      const updatedResources = [...resources];
      updatedResources[editIndex] = editResource;
      setResources(updatedResources);
      setEditResource('');
      setEditIndex(null);
    }
  };

  const handleDelete = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };

  return (
    <div className='resource'>
      <h2>Resource Component</h2>
      <div>
        <h3>Create</h3>
        <input
          type="text"
          placeholder="New Resource"
          value={newResource}
          onChange={(e) => setNewResource(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div>
        <h3>Update</h3>
        <input
          type="text"
          placeholder="Edit Resource"
          value={editResource}
          onChange={(e) => setEditResource(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div>
        <h3>Resources</h3>
        <ul>
          {resources.map((resource, index) => (
            <li key={index}>
              {resource}
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => setEditIndex(index)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Resource;
