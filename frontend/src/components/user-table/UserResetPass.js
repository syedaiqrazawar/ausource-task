import React from 'react'
import { useNavigate } from 'react-router';
import { RxReset } from 'react-icons/rx';

function UserResetPass(props) {
  const navigate = useNavigate();

  const handleResetPass = (props) => {
    const {userid, email} = props.userId.row.original
    navigate('/ResetPassword', { state: { userId: userid, email } });
  }

  return (
      <button
          className="button is-link p-4 mt-1"
          onClick={ () => handleResetPass(props) }
      >
      <RxReset />
      </button>
  )
}

export default UserResetPass
