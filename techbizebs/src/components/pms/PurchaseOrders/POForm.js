import React, { useState, useEffect } from 'react'
import POHeader from './POHeader'
import POLine from './POLine.js';
import API from "../../../baseURL";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from 'react-redux';
import { clear_lines, remove_header } from '../../../actions/PO_Actions';
import swal from 'sweetalert';


const PO_Form = (props) => {

	console.log('PO FORM ****');
	const dispatch = useDispatch();
	const { edit, headerID } = props.match.params;
	const { lines, headerDetails } = useSelector(state => state.PO);
	const [total,setTotal] = useState();
	const [header,setHeader] = useState(() => edit ? headerDetails : {});

	const getTotal = () => {
		let tempTotal = 0;
		lines.forEach((line,item) => {
			tempTotal= tempTotal+parseInt(line.Total_Amt)
		})
		setTotal(tempTotal);
	}

	useEffect(() => {
		getTotal()
	}, [lines]) // eslint-disable-line
 
 	const getHeaderInfo = (header) => {
 		console.log(header)
 		setHeader(header)
 	}

 	const onSubmitPO = (submitType) => {
		if (edit === "true") {
			if (lines.length > 0) {
				API.put(`/pms/purchaseOrder/update/${headerID}/${submitType}`, {
					header,
					lines,
				})
					.then((response) => {
						console.log(response);
						if (response.status === 200)
							swal({
								title: "Success",
								text: "New Record(s) Created/Updated",
								buttons: true,
							}).then((value) => {
								dispatch(clear_lines());
								dispatch(remove_header());
								window.close();
							});
					})
					.catch((error) => {
						if (
							error.response.status === 400 ||
							error.response.status === 403 ||
							error.response.status === 404
						) {
							swal("Entry Failed!", error.message, "error");
						}
					});
			} else {
				swal("Empty Form!");
			}
		} else {
			if (
				header.hasOwnProperty('Supplier_ID') &&
				header.hasOwnProperty('Ship_To_ID') &&
				header.hasOwnProperty('Payment_Type') &&
				lines.length > 0
			) {
				API.post(`/pms/purchaseOrder/add/${submitType}`, { header, lines })
					.then((response) => {
						console.log(response);
						if (response.status === 200)
							swal({
								title: "Success",
								text: "New Record(s) Created/Updated",
								buttons: true,
							}).then((value) => {
								dispatch(clear_lines());
								dispatch(remove_header());
								window.close();
							});
					})
					.catch((error) => {
						if (
							error.response.status === 400 ||
							error.response.status === 403 ||
							error.response.status === 404
						) {
							swal("Entry Failed!", error.message, "error");
						}
					});
			} else {
				swal("Empty Form!");
			}
		}
 	}

	return (
		<div>
			<POHeader 
				sendHeaderInfo={getHeaderInfo} 
				edit={edit} 
				data={headerDetails}
			/>
			<POLine editable={headerDetails.Enabled_Flag === '1' ? false : true}/>
			<label style={{fontSize : "15px" , fontWeight: "bold" , marginLeft : "75%" , marginRight : "15%" }}>
	      Total                               
	    </label>
	    <label style={{fontSize : "15px" , fontWeight: "-moz-initial" }} >
	    	{total}
	    </label>

	    <Button 
				style={{marginLeft:'80%',width: '200',}}
				variant="contained" 
				disabled={headerDetails.Enabled_Flag === '1' ? true : false}
				onClick={() => onSubmitPO('apply')}
				color="primary"
			>
        Apply
      </Button>

			<Button 
				style={{width: '200', margin:'0 10px'}}
				variant="outlined" 
				disabled={headerDetails.Enabled_Flag === '1' ? true : false}
				onClick={() => onSubmitPO('post')}
				color="primary"
			>
        POST
      </Button>
		</div>
	)
}

export default PO_Form