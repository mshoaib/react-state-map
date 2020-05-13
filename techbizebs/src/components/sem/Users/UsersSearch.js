import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import API from '../../../baseURL';
import CustomPagination from '../../Pagination';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import UsersForm from './UsersForm';
import Button from '@material-ui/core/Button';
import SearchBar from '../../SearchBar.js';
import { customStyles } from '../../../style';
import swal from 'sweetalert';

const UsersSearch = () => {
  const [Users, setUsers] = useState([]);
  const { Organization_ID } = useSelector(state => state.user)
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalInsert, setShowModalInsert] = useState(false);
  const [rowCount, setRowCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [record, setRecord] = useState();
  const [search, setSearch] = useState('');

  const columns = [
    {
      Header: 'ID',
      accessor: 'User_ID',
      sortable: true,
      filterable: false,
      width: 100
    }, {
      Header: 'Username',
      accessor: 'User_Name',
      sortable: true,
      filterable: false,
    }, {
      Header: 'User Status',
      accessor: 'User_Status',
      sortable: true,
      filterable: false,
    }, {
      Header: 'User Email',
      accessor: 'User_Email',
      sortable: true,
      filterable: false,
    }, {
      Header: 'User Mobile',
      accessor: 'User_Mobile',
      sortable: true,
      filterable: false,
    }, {
      Header: 'Employee_ID',
      accessor: 'Employee_ID',
      sortable: true,
      filterable: false,
    }, {
      Header: 'Host ID Restriction',
      accessor: 'Host_ID_Restric',
      sortable: true,
      filterable: false,
    }, {
      Header: 'Account Loc. Flag',
      accessor: 'Account_Locked_Flag',
      sortable: true,
      filterable: false,
    },
    {
      Header: 'EF',
      accessor: 'Enabled_Flag',
      sortable: true,
      filterable: false,
      width: 60
    },
    {
      Header: 'Actions',
      width: 150,
      Cell: props => {
        return (
          <div style={{ textAlign: "center" }}>
            <i
              className="fas fa-edit table_buttons table_edit"
              onClick={() => {
                setRecord(props.original);
                setShowModalUpdate(true);
              }}
            ></i>
            <i
              className="fas fa-trash table_buttons table_delete"
              onClick={() => onDelete(props.original)}
            ></i>
          </div>
        )
      },
      sortable: true,
      filterable: false,
    }
  ]

  const getUsers = () => {
    API.get(`/sem/users/get/${Organization_ID}?limit=${rowCount}&page=${pageNumber}&search=${search}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.data.results !== Users) {
          setUsers(response.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const onDelete = (item) => {
    if (window.confirm("Are You Sure Want To Delete This Role") === true) {
      API.delete(`/sem/users/delete/${item.User_ID}`, {
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function (response) {
          if (response.status === 200)
            swal("Record Deleted!", "", "success");
          getUsers();
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.status === 400 || error.response.status === 403 || error.response.status === 404) {
            swal("Deletion Failed!", error.message, "error");
          }
        });
    } else {
      return;
    }
  }

  // initializer
  useEffect(() => {
    ReactModal.setAppElement('body')
    getUsers()
  }, []) // eslint-disable-line

  //Checks for change in rowCount and PageNumber
  useEffect(() => {
    getUsers()
  }, [rowCount, pageNumber]) // eslint-disable-line

  //search bar change handler
  const handleChange = event => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <div style={{ marginLeft: "2%", marginTop: "1px" }}>

        <p style={{ color: "#113C87" }} className="h5 text-left py-1">
          User
          </p>
      </div>
      <div style={{ marginLeft: "90%", marginBottom: "5px" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowModalInsert(true)}
        >
          <i className="fas fa-plus" style={{ marginRight: "5px" }}></i>
          Create
        </Button>
      </div>

      <SearchBar search={search} handleChange={handleChange} onSearch={getUsers} />
      <ReactTable
        data={Users.results}
        columns={columns}
        noDataText={"Loading..."}
        showPagination={false}
        pageSize={rowCount}
        onPageSizeChange={(size) => {
          setRowCount(size)
        }}
      />
      <CustomPagination
        rowCount={rowCount}
        setRowCount={setRowCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={Users.totalPages}
        newPage={getUsers}
      />

      {/* Modal for Update */}
      <ReactModal
        isOpen={showModalUpdate}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setShowModalUpdate(false);
          setRecord(null);
          getUsers();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times table_buttons modal_cross"
            onClick={() => setShowModalUpdate(false)}
          ></i>
          <UsersForm
            type="update"
            record={record}
            onClose={setShowModalUpdate}
            getUsers={getUsers}
          />

        </div>
      </ReactModal>

      {/* Modal for Insert */}
      <ReactModal
        isOpen={showModalInsert}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setShowModalInsert(false);
          getUsers();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times table_buttons modal_cross"
            onClick={() => setShowModalInsert(false)}
          ></i>
          <UsersForm
            type="insert"
            onClose={setShowModalInsert}
            getUsers={getUsers}
          />
        </div>
      </ReactModal>
    </div>
  )
}

export default UsersSearch