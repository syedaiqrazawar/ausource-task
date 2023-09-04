import React, 
       { useMemo, 
         useEffect, 
         useState
       } from 'react';
import axios from 'axios';
import { useTable, 
         useSortBy, 
         useFilters, 
         useGlobalFilter, 
         usePagination 
       } from 'react-table';
import { FaAngleDoubleUp,
         FaAngleDoubleDown
       } from 'react-icons/fa';
import { RiDeleteBin5Line,
         RiSkipBackLine,
         RiRewindLine,
         RiSpeedLine,
         RiSkipForwardLine
       } from 'react-icons/ri';
import './UserTable.css';
import UserTableFilter from './UserTableFilter';
import ColumnFilter from './UserColumnFilter';
import RoleDropdownFilter from './UserRoleFilter';
import UserResetPass from './UserResetPass';
import UserEditLink from './UserEditLink';
import Modal from '../modal/Modal.js';
import Tooltip from '../Tooltip';
import { ToastContainer, 
         toast 
       } from'react-toastify';

function UserTable() {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const jwt = localStorage.getItem('token');

  useEffect(() => {
    setPageSize(5);

    async function fetchData() {
      await axios
      .get('http://localhost:4000/api/user', { headers: { token: jwt } })
      .then((result) => {
          setData(result.data.users);
      })
      .catch((err) => {
          console.log(err);
      });
    }

    fetchData();
  }, [refresh]);

  const handleDelete = (userId) => {
    axios
    .delete('http://localhost:4000/api/user/' + userId, { headers: { token: jwt } })
    .then(() => {
      toast.success('User successfully deleted.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setRefresh(prevState => !prevState);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const columns = useMemo(() =>
    [
      {
          Header: 'User Name',
          accessor: 'username',
          Filter: ColumnFilter
      },
      {
          Header: 'Email Address',
          accessor: 'email',
          Filter: ColumnFilter
      },
      {
          Header: 'Role',
          accessor: 'is_admin',
          Cell: ({ value }) => {
              return ( value === 'yes' ? 'Administrator' : 'Normal')
          },
          Filter: RoleDropdownFilter
      },
      {
          Header: 'Manage User',
          accessor:'userid',
          Cell: (props) => {
              return (
                  <div className='manage'>
                      <Tooltip text="edit"><UserEditLink userId={props.value}></UserEditLink></Tooltip>&nbsp;
                      <Tooltip text="delete"><UserDeleteLink userId={props} handleDelete={handleDelete}></UserDeleteLink></Tooltip>&nbsp;
                      <Tooltip text="reset password"><UserResetPass userId={props} ></UserResetPass></Tooltip>
                  </div>
              )
          },
          Filter: ''
      }
  ], []);

  const { getTableProps,
          getTableBodyProps,
          headerGroups,
          page,
          nextPage,
          previousPage,
          canNextPage,
          canPreviousPage,
          pageOptions,
          setPageSize,
          gotoPage,
          pageCount,
          prepareRow,
          state,
          setGlobalFilter
        } = useTable({
      columns,
      data
  }, useFilters, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex } = state;

  return (
    <div className='user-table'>
      <ToastContainer />
      <UserTableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                      &nbsp;{column.isSorted ? (column.isSortedDesc ? <FaAngleDoubleDown /> :  <FaAngleDoubleUp />) : ' '}
                  </span>
                  {column.canFilter ? column.render('Filter') : null}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='navigation'>
        <div className='page-index'>
          Page{' '}
          <b>
            {pageIndex + 1} of {pageOptions.length}
          </b>
          {' '}
        </div>
        <button className='button is-primary' onClick={() => gotoPage(0)} disabled={!canPreviousPage}><RiSkipBackLine /></button>
        <button className='button is-primary' onClick={() => previousPage()} disabled={!canPreviousPage}><RiRewindLine /></button>
        <button className='button is-primary' onClick={() => nextPage()} disabled={!canNextPage}><RiSpeedLine /></button>
        <button className='button is-primary' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><RiSkipForwardLine /></button>
      </div>
    </div>
  )
}

function UserDeleteLink(props) {
  const [userId, setUserId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickDelete = (userId) => {
    setUserId(userId);
    setIsModalOpen(true);
  };

  return (
    <>
      {
        isModalOpen &&
        <Modal setIsModalOpen={setIsModalOpen} doAction={props.handleDelete} actionParam={userId}>
          Delete user "{props.userId.row.original.first_name} {props.userId.row.original.last_name}"
        </Modal>
      }
      <button
        className="button is-danger p-4 mt-1"
        onClick={ () => {
          onClickDelete(props.userId.value)
        }}
      >
        <RiDeleteBin5Line />
      </button>
    </>
  )
}

export default UserTable
