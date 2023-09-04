import React from 'react'
import './UserTable.css';

const RoleDropdownFilter = ({ column}) =>  {
  const { setFilter } = column;
  return (
    <select 
      onChange = {
        (e) => setFilter(e.target.value)
      } 
      className='filter-dropdown'
    >
      <option value=""></option>
      <option value="yes">Administrator</option>
      <option value="no">Normal</option>
    </select>
  )
}

export default RoleDropdownFilter