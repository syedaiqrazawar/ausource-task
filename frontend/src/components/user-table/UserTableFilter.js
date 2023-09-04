import React from 'react'
import './UserTable.css';

const UserFilter = ({ filter, setFilter}) =>  {
  return (
    <span>
        Search: {' '} 
        <input type="text" 
               value={filter || ''}
               onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

export default UserFilter