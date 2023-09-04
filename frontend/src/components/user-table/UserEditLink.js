import React from 'react'
import { useNavigate } from 'react-router';
import { FaUserEdit } from 'react-icons/fa';

function UserEditLink(props) {
  const navigate = useNavigate();

  const handleEdit = (userId) => {
    alert("no edit table yet")
  }

  return (
      <button
          className="button is-info p-4 mt-1"
          onClick={ () => handleEdit(props.userId) }
      >
      <FaUserEdit />
      </button>
  )
}

export default UserEditLink