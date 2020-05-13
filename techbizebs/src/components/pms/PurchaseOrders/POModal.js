import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import API from "../../../baseURL";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch } from 'react-redux';
import { add_line, edit_line } from '../../../actions/PO_Actions.js';
import moment from "moment";
import swal from 'sweetalert';

const PurchaseInsertModal = (props) => {
	const dispatch = useDispatch();
	// const { User_ID, Organization_ID } = useSelector(state => state.user);
	const { register, errors, handleSubmit, setValue } = useForm({
		defaultValues: {
			"Item_ID": props.type === 'update' ? props.record.Item_ID : "",
			"Item_Name": props.type === 'update' ? props.record.Item_Name : "",
			"UOM_ID": props.type === 'update' ? props.record.UOM_ID : "",
  	 }
	});
	const [items, setItems] = useState([]);
	const [ready,setReady] = useState(false);
	const currentDate = moment();


	useEffect(() => { /* Intialize the value for AutoComplete InputBox*/
    register({ name: "Item_ID"}, {required: true});
    register({ name: "Item_Name"}, {required: true});
    register({ name: "UOM_ID"}, {required: false});
  },[]); // eslint-disable-line
	
	/* Get ITEMS on Component load */
	useEffect(() => {
		API.get(`/pms/purchaseOrder/item/1`) //Replace Organization_ID
			.then((response) => {
				setItems(response.data);
				setReady(true)
			})
			.catch((err) => {
				console.log(err);
				return;
			});
	},[]); // eslint-disable-line

	const lineStructure = {
		Item_ID:'',
		Item_Name:'',
		UOM_Name:'',
		Item_Qty:0, 
		Price: 0,
		GST_Per: 0, //placeHolder Data
		GST_Amt: 0,
		Total_Amt: 0,
		Created_By: 1,  // User_ID
		Creation_Date: currentDate.format('YYYY-MM-DD'),
		Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss'),
		Last_Updated_By: 1, // User_ID
	}

	const onSubmit = (data) => {
		const { Item_ID, Item_Name, UOM_ID, Item_Qty, GST_Per, Price } = data;

		if(props.type === 'update'){
			console.log('updated - ',data)
			data.GST_Amt = (Price*GST_Per)/100;
			data.Total_Amt = (+data.GST_Amt + +Price) * Item_Qty;
			dispatch(edit_line({ data,index:props.record.index}))
			props.close(false);
		} else {
			API.get(`/pms/purchaseOrder/item/get/item-details?Item_ID=${Item_ID}&UOM_ID=${UOM_ID}`)
				.then(response => {
					let newLine = Object.assign({},lineStructure);
					let GrossAmt = null;
					newLine.Item_ID = Item_ID;
					newLine.Item_Name = Item_Name;
					newLine.Price = Price
					newLine.Item_Qty = Item_Qty;
					GrossAmt = Price * Item_Qty;
					newLine.GST_Per = GST_Per;
					newLine.GST_Amt = (GrossAmt*GST_Per)/100;
					newLine.Total_Amt = (newLine.GST_Amt +GrossAmt) ;
					newLine.UOM_Name = response.data.UOM_Name;
					dispatch(add_line(newLine))
					swal('New Item Added',`${Item_Name}`,'success')
					setValue([
						{"Item_ID": ""},
						{"Item_Name": ""},
						{"Price":""},
						{"UOM_ID": ""},
						{"Item_Qty": ""},
						{"GST_Per": ""}
					])
				})
				.catch(err => {
					console.log(err)
				})	
		}
	};

	return (
		ready &&
		<Grid container justify="center">
			<form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: "100%" }}>
				<p
					style={{ color: "#4252a7", textAlign: "center" }}
					className="h4 text-left py-4"
				>
					ITEM SELECTION
				</p>

				<Autocomplete
					id="disable-portal"
					options={items}
					ref={register}
					name="Item_ID"
					defaultValue={props.type === 'update' ? items.find(item => item.Item_ID === props.record.Item_ID) : {}}
					getOptionLabel={(option) => option.Item_Name || ""}
					onChange={(event, value) => {
						if(value != null)
						setValue([{"Item_ID":value.Item_ID},{"UOM_ID":value.UOM_ID},{Item_Name:value.Item_Name}])
					}}
					style={{ marginBottom: "5px" }}
					renderInput={params => {
	          return (
	            <TextField
	              {...params}
	              label="Item List"
	              name="Item_ID"
	              fullWidth
	              value={params}
	            />
	          );
					}}
				/>
				{errors.Item_List && errors.Item_List.type === "required" && (
					<p className="form_error_PIM">
						<i className="fas fa-exclamation-triangle"></i> This field is
						required
					</p>
				)}
				{errors.Item_List && errors.Item_List.type === "maxLength" && (
					<p className="form_error_PIM"> Maximum Length Allowed is 250 </p>
				)}

				<TextField
					id="price"
					type="Number"
					autoComplete="off"
					fullWidth
					name="Price"
					style={{ marginBottom: "5px" }}
					defaultValue={
						props.type === "update" ? props.record.Price : ""
					}
					inputRef={register({ required: true })}
					label="Price"
				/>
				{errors.Price && errors.Price.type === "required" && (
					<p className="form_error_PIM">
						<i className="fas fa-exclamation-triangle"></i> This field is
						required
					</p>
				)}

				<TextField
					id="standard-search"
					type="Number"
					autoComplete="off"
					fullWidth
					name="Item_Qty"
					style={{ marginBottom: "5px" }}
					defaultValue={
						props.type === "update" ? props.record.Item_Qty : ""
					}
					inputRef={register({ required: true})}
					label="Item Quantity"
				/>
				{errors.Item_Qty && errors.Item_Qty.type === "required" && (
					<p className="form_error_PIM">
						<i className="fas fa-exclamation-triangle"></i> This field is
						required
					</p>
				)}
	

				<TextField
					id="standard-search"
					type="number"
					inputProps={{
						'step':'any'
					}}
					autoComplete="off"
					fullWidth
					name="GST_Per"
					style={{ marginBottom: "5px" }}
					defaultValue={
						props.type === "update" ? props.record.GST_Per : ""
					}
					inputRef={register({ required: true})}
					label="GST Percentage"
				/>
				{errors.GST_Per && errors.GST_Per.type === "required" && (
					<p className="form_error_PIM">
						<i className="fas fa-exclamation-triangle"></i> This field is
						required
					</p>
				)}
			

				<div>
					<Button
						color="primary"
						variant="contained"
						type="submit"
						style={{
							marginBottom: "5px",
							marginTop: "50px",
							marginLeft: "45%",
						}}
					>{props.type === 'update' ? 'UPDATE ITEM' : 'ADD ITEM'}
					</Button>
				</div>
			</form>
		</Grid>
	);
};

export default PurchaseInsertModal;