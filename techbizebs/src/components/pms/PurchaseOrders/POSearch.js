import React,{ useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import API from '../../../baseURL';
import CustomPagination from '../../Pagination';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';
import SearchBar from '../../SearchBar.js';
import { onDelete, fetchData } from '../../../util.js';
import { set_header, fill_table, clear_lines, remove_header } from '../../../actions/PO_Actions';
import moment from 'moment';
 
const POSearch = () => {
  const dispatch = useDispatch(); 
  const [PO,setPO] = useState([]);
  // const { Organization_ID } = useSelector(state => state.user)
  const [rowCount,setRowCount] = useState(10);
  const [pageNumber,setPageNumber] = useState(1);
  const [search,setSearch] = useState('');
  const url = `/pms/purchaseOrder/get/header/1?limit=${rowCount}&page=${pageNumber}&search=${search}`;
  const columns = [
    {
      Header: 'PO Number',
      accessor: 'PO_NO',
      sortable: true,
      filterable: false,
    },
    {
      Header: 'PO Date',
      id : 'PO_Date',
      accessor: d => `${moment(d.PO_Date).format('YYYY-MM-DD')}`,
      sortable: true,
      filterable: false,
      width:100
    },
    {
      Header: 'Supplier',
      accessor: 'Supplier_Name',
      sortable: true,
      filterable: false,
    },
    {
      Header: 'Department',
      accessor: 'Department_Name',
      sortable: true,
      filterable: false,
    },
    {
      Header: 'Payment',
      accessor: 'Payment_Type',
      sortable: true,
      filterable: false,
      width:120
    },
    {
      Header: 'Ref No',
      accessor: 'Ref_No',
      sortable: true,
      filterable: false,
      width:100
    },
    {
      Header: 'Status',
      accessor: 'Status',
      sortable: true,
      filterable: false,
      width: 100
    },
    {
      Header: 'Enabled Flag',
      accessor: 'Enabled_Flag',
      sortable: true,
      filterable: false,
      width: 100
    },
    {
        Header: 'Actions',
        width: 120,
        Cell : props =>
        {return(
          <div style={{ textAlign: "center" }}>
						<i
							className="fas fa-edit table_buttons table_edit"
							onClick={() => {
								dispatch(set_header(props.original));
                // console.log(props.original)
                API.get(`/pms/purchaseOrder/get/line/${props.original.PO_Header_ID}`)
                  .then(response => {
                    console.log(response);
                    dispatch(fill_table(response.data))
                    window.open(`/purchaseOrder/true/${props.original.PO_Header_ID}`,'_blank')
                  })
                  .catch(err => {
                    console.log(err);
                  })
							}}
						></i>
            {
              props.original.Enabled_Flag !== "1" && (
                <i
                  className="fas fa-trash table_buttons table_delete"
                  onClick={() => {
                    const deleteUrl = `/purchase-order/delete/${props.original.PO_Header_ID}`;
                    const callback = function(){ fetchData(url,setPO); }
                    onDelete(deleteUrl,callback)
                  }}
                ></i>
              )
            }
					</div>
          )      
        },
        sortable: true,
      filterable: false,
      }
  ]

	// initializer
  useEffect(() => { 
    ReactModal.setAppElement('body')
    fetchData(url,setPO);
  },[]) // eslint-disable-line

  /* Checks for change in rowCount and PageNumber */
  useEffect(() => {
  	fetchData(url,setPO);
  }, [rowCount,pageNumber]) // eslint-disable-line

  return (
    <div>
      <div style={{ marginLeft: "90%", marginBottom: "10px" }}>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => {
            dispatch(remove_header());
            dispatch(clear_lines());
            window.open('/purchaseOrder/false/null','_blank')
          }}           
        >
          <i className="fas fa-plus" style={{ marginRight: "5px" }}></i>
          Create
        </Button>
      </div>

      <SearchBar 
        search={search} 
        handleChange={e => setSearch(e.target.value)} 
        onSearch={() => fetchData(url,setPO)}
      />
      <ReactTable
        data={PO.results}
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
      	totalPages={PO.totalPages}
      	newPage={() => fetchData(url,setPO)}
      />

    </div>
  )
}

export default POSearch