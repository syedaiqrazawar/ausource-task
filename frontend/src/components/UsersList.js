import React from 'react';
import UserTable from './user-table/UserTable';

export default function UsersList() {

  return (
    <div>
      <div className="column has-background-light has-text-centered">
        <h1 className="title has-text-primary">User List</h1>
      </div>
      <UserTable />
    </div>
  );
}