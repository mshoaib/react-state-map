import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import API from '../../../baseURL';
import CustomPagination from '../../Pagination';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import RolesFormsForm from './RolesFormsForm';
import Button from '@material-ui/core/Button';
import SearchBar from '../../SearchBar.js';
import { customStyles } from '../../../style';
import swal from 'sweetalert';

const RolesFormsSearch = () => {
	const { Organization_ID } = useSelector(state => state.user)
  const [RolesForms,setRolesForms] = useState([]);
  const [showModalUpdate,setShowModalUpdate] = useState(false);
  const [showModalInsert,setShowModalInsert] = useState(false);
  const [rowCount,setRowCount] = useState(10);
  const [pageNumber,setPageNumber] = useState(1);
  const [record,setRecord] = useState();
  const [search,setSearch] = useState('');

  const columns = [
    {
      Header: 'ID',
      accessor: 'Role_Form_ID',
      sortable: true,
      filterable: false,
      maxWidth: 100
    },
    {
      Header: 'Role Name',
      accessor: 'Role_Name',
      sortable: true,
      filterable: false,
    },
    {
      Header: 'Module Name',
      accessor: 'Module_Name',
      sortable: true,
      filterable: false,
    },
    {
      Header: 'Form Name',
      accessor: 'Form_Name',
      sortable: true,
      filterable: false,
    },
    {
      Header: 'Enabled Flag',
      accessor: 'Enabled_Flag',
      sortable: true,
      filterable: false,
      width: 120
      
    },
    {
        Header: 'Actions',
        maxWidth: 150,
        Cell : props =>
        {return(
          <div style={{ textAlign: "center" }}>
						<i
							className="fas fa-edit table_buttons table_edit"
							onClick={() => {
								setRecord(props.original);
								console.log(props.original)
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
 
  const getRolesForms = () => {
    API.get(`/sem/roles-forms/get/${Organization_ID}?limit=${rowCount}&page=${pageNumber}&search=${search}` , {
      headers:{
        "Content-Type" : "application/json"
      }
    })
    .then(response => {
      if(response.data.results !== RolesForms){
        setRolesForms(response.data) 
      }
      // console.log(response.data.results)
    })
    .catch(err => {
      console.log(err);
    })
  }

  const onDelete = (item) => {
    if (window.confirm("Are You Sure Want To Delete This Role") === true) {
      API.delete(`/sem/roles-forms/delete/${item.Role_Form_ID}`,{
        header: {
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        if(response.status === 200)
				  swal("Record Deleted!","", "success");
        getRolesForms();
      })
      .catch(function(error) {
        console.log(error);
        if(error.response.status === 400 ||error.response.status === 403 || error.response.status === 404 || error.response.status === 401){
					swal("Deletion Failed!",error.message, "error");
 				}
      });
    } else {
      return;
    }
  }

	// initializer
  useEffect(() => { 
    ReactModal.setAppElement('body')
    getRolesForms()
    // console.log(Application)
  },[]) // eslint-disable-line

  //Checks for change in rowCount and PageNumber
  useEffect(() => {
  	getRolesForms()
  }, [rowCount,pageNumber]) // eslint-disable-line

  //search bar change handler
  const handleChange = event => {
    setSearch(event.target.value);
  };

  return (
    <div>
       <p style={{ color: "#113C87" }} className="h5 text-left py-1">
        Roles Forms
        </p>

      <div style={{ marginLeft: "90%", marginBottom: "10px" }}>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => setShowModalInsert(true)}
        >
          <i className="fas fa-plus" style={{ marginRight: "5px" }}></i>
          Create
        </Button>
      </div>

      <SearchBar search={search} handleChange={handleChange} onSearch={getRolesForms}/>
      <ReactTable
        data={RolesForms.results}
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
      	totalPages={RolesForms.totalPages}
      	newPage={getRolesForms}
      />

      {/* Modal for Update */}
      <ReactModal
        isOpen={showModalUpdate}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setShowModalUpdate(false);
          setRecord(null);
          getRolesForms();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times table_buttons modal_cross"
            onClick={() => setShowModalUpdate(false)}
          ></i>
          <RolesFormsForm
            type="update"
            record={record}
            onClose={setShowModalUpdate}
            getRolesForms={getRolesForms}
          />
          
        </div>
      </ReactModal>
      
      {/* Modal for Insert */}
      <ReactModal
        isOpen={showModalInsert}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setShowModalInsert(false);
          getRolesForms();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times table_buttons modal_cross"
            onClick={() => setShowModalInsert(false)}
          ></i>
          <RolesFormsForm
            type="insert"
            onClose={setShowModalInsert}
            getRolesForms={getRolesForms}
          />
        </div>
      </ReactModal> 
    </div>
  )
}



export default RolesFormsSearch