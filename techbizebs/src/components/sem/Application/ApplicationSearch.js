import React,{ useState, useEffect } from 'react'
import API from '../../../baseURL';
import CustomPagination from '../../Pagination';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import ApplicationForm from './ApplicationForm';
import Button from '@material-ui/core/Button';
import SearchBar from '../../SearchBar.js';
import { customStyles } from '../../../style';
import swal from 'sweetalert';
 
const ApplicationSearch = () => {
  const [Application,setApplication] = useState([]);
  const [showModalUpdate,setShowModalUpdate] = useState(false);
  const [showModalInsert,setShowModalInsert] = useState(false);
  const [rowCount,setRowCount] = useState(10);
  const [pageNumber,setPageNumber] = useState(1);
  const [record,setRecord] = useState();
  const [search,setSearch] = useState('');

  const columns = [
    {
      Header: "Application Name",
      accessor: "Application_Name",
      sortable: true,
      filterable: false
    },
    {
      Header: "Application Short Name ",
      accessor: "Application_Short_Name",
      sortable: true,
      filterable: false
    },
    {
      Header: "Application Description",
      accessor: "Application_Desc",
      sortable: true,
      filterable: false
    },
    {
      Header: "Enabled Flag",
      accessor: "Enabled_Flag",
      sortable: true,
      filterable: false,
      width: 120
    },
    {
      Header: "Actions",
      width: 200,
      Cell: props => {
        return (
          <div style={{ textAlign: "center" }}>
            <i
              className="fas fa-edit table_buttons table_edit"
              onClick={() => {
                setRecord(props.original);
                setShowModalUpdate(true);
              }}
            >
            </i>
            <i
              className="fas fa-trash table_buttons table_delete"
              onClick={() => onDelete(props.original)}
            >
            </i>
          </div>
        );
      },
      sortable: true,
      filterable: false
    }
  ]

  const getApplications = () => {
    API.get(`/sem/application/get?limit=${rowCount}&page=${pageNumber}&search=${search}` , {
      headers:{
        "Content-Type" : "application/json"
      }
    })
    .then(response => {
      if(response.data.results !== Application){
        setApplication(response.data) 
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  const onDelete = (item) => {
    if (window.confirm("Are You Sure Want To Delete This Application") === true) {
      API.delete(`/sem/application/delete/${item.Application_ID}`,{
        header: {
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        if(response.status === 200)
				  swal("Record Deleted!","", "success");
        getApplications();
      })
      .catch(function(error) {
        console.log(error);
        if(error.response.status === 400 ||error.response.status === 403 || error.response.status === 404){
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
    getApplications()
  },[]) // eslint-disable-line

  //Checks for change in rowCount and PageNumber
  useEffect(() => {
  	// console.log(Application)
  	getApplications()
  }, [rowCount,pageNumber]) // eslint-disable-line


  //search bar change handler
  const handleChange = event => {
    setSearch(event.target.value);
  };

  return (
    <div>
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

      <SearchBar search={search} handleChange={handleChange} onSearch={getApplications}/>
      
      {/* React Table */}
      <ReactTable
        data={Application.results}
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
      	totalPages={Application.totalPages}
      	newPage={getApplications}
      />

      {/* Modal for Update */}
      <ReactModal
        isOpen={showModalUpdate}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setShowModalUpdate(false);
          setRecord(null);
          getApplications();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times table_buttons modal_cross"
            onClick={() => setShowModalUpdate(false)}
          ></i>
          <ApplicationForm
            type="update"
            record={record}
            onClose={setShowModalUpdate}
            getApplications={getApplications}
          />
          
        </div>
      </ReactModal>
      
      {/* Modal for Insert */}
      <ReactModal
        isOpen={showModalInsert}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setShowModalInsert(false);
          getApplications();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times table_buttons modal_cross"
            onClick={() => setShowModalInsert(false)}
          ></i>
          <ApplicationForm
            type="insert"
            onClose={setShowModalInsert}
            getApplications={getApplications}
          />
        </div>
      </ReactModal>
    </div>
  );
}

export default ApplicationSearch