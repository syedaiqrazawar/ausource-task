import React from 'react'
import './UserTable.css';

const ColumnFilter = ({ column}) =>  {
  const { filterValue, setFilter } = column;
  return (
    <span className='filter'>
      <input type="text" 
              value={filterValue || ''}
              onChange={(e) => setFilter(e.target.value)} 
      />
    </span>
  )
}

export default ColumnFilter