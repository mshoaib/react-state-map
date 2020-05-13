import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import API from "../../../baseURL";
import Button from '@material-ui/core/Button';
import POModal from './POModal';
import { customStyles } from '../../../style.js';
import { remove_line } from '../../../actions/PO_Actions.js';


const PurchaseOrderLine = (props) => {
	const { editable } = props;
	const dispatch = useDispatch();
	const { lines } = useSelector(state => state.PO)
	const [modal,showModal] = useState(false);
	const [updateModal,showUpdateModal] = useState(false);
	const [record,setRecord] = useState();
	// initializer
  useEffect(() => { 
    ReactModal.setAppElement('body')
  },[]) // eslint-disable-line


  const columns = [
    {
      Header: "ITEM",
      accessor: "Item_Name",
      sortable: true,
      filterable: false
    },
    {
      Header: "UOM",
      accessor: "UOM_Name",
      sortable: true,
      filterable: false
    },
    {
      Header: "QUANTITY",
      accessor: "Item_Qty",
      sortable: true,
      filterable: false
    },
    {
      Header: "PRICE",
      accessor: "Price",
      sortable: true,
      filterable: false
    },
    {
      Header: "G.S.T %",
      accessor: "GST_Per",
      sortable: true,
      filterable: false
    },
    {
      Header: "G.S.T Amt",
      accessor: "GST_Amt",
      sortable: true,
      filterable: false
    },
    {
      Header: "TOTAL AMOUNT",
      accessor: "Total_Amt",
      sortable: true,
      filterable: false
    },
    {
      Header: 'Actions',
      Cell : props => { 
        return(
        	editable ?
        	<div style={{ textAlign: "center" }}>
        		{console.log(props)}
	        	<i
							className="fas fa-edit table_buttons table_edit"
							onClick={() => {
								setRecord({...props.original,index:props.index});
								console.log(props.original)
								showUpdateModal(true)
							}}
						></i>
	        	<i
							className="fas fa-trash table_buttons table_delete"
							onClick={() => onDelete(props)}
						></i>
					</div> :
					<div style={{ textAlign: "center" }}>*</div>
        )      
      },
      sortable: true,
      filterable: false,
    }
  ]

  const onDelete = (item) => {
  	const { PO_Line_ID } = item.original;
  	const { index } = item;
    if (window.confirm("Are you sure you want to delete?. Item Deletes are PERMENANT") === true) {
    	if(item.original.hasOwnProperty('PO_Line_ID')){
		    API.delete(`/purchase-order/delete/line/${PO_Line_ID}`,{
		      header: {
		        "Content-Type": "application/json"
		      }
		    })
		    .then(function(response) {
		      dispatch(remove_line(index))
		    })
		    .catch(function(error) {
		      console.log(error);
		    });
    	} else {
    		dispatch(remove_line(index))
    	}
    } else {
      return;
    }
  }

  return (
    <div>
      
      <div style={{ marginLeft: "90%", marginBottom: "10px" }}>
        <Button 
          variant="outlined" 
          color="primary"
          disabled={!editable}
          onClick={() => showModal(true)}
        >
          <i className="fas fa-plus" style={{ marginRight: "5px" }}></i>
          Add ITEM
        </Button>
      </div>

      <ReactTable
        data={lines}
        columns={columns}
        noDataText="no item"
        pageSize={10}
        showPagination={false}
      />
     	
      <ReactModal // New Modal
      	isOpen={modal}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          showModal(false)
        }}
        style={customStyles}
        ariaHideApp={true}
      >
      	<i
          className="fas fa-times table_buttons modal_cross"
          onClick={() => showModal(false)}
        ></i>
      	<POModal type='insert' close={showModal}/>
      </ReactModal>

      <ReactModal // Update Modal
      	isOpen={updateModal}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          showUpdateModal(false)
        }}
        style={customStyles}
        ariaHideApp={true}
      >
      	<i
          className="fas fa-times table_buttons modal_cross"
          onClick={() => showUpdateModal(false)}
        ></i>
      	<POModal type='update' record={record} close={showUpdateModal}/>
      </ReactModal>

	   
    </div>
  );
}

export default PurchaseOrderLine


