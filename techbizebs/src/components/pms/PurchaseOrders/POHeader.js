import React, { useState, useEffect } from "react";
// import { useSelector } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import API from "../../../baseURL";
import axios from 'axios';
import ReactModal from "react-modal";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";


const PurchaseOrderHeader = (props) => {
	// const { User_ID, Organization_ID, Branch_ID } = useSelector(state => state.user);
	const { register, errors } = useForm();
	const currentDate = moment();
	const [suppliers, setSuppliers] = useState([]);
	const [departments, setdepartments] = useState([]);
	const [ready, setReady] = useState(false);
	const initialState = {
		PO_NO:`PO/ABC/2019-2020/${Math.random()}`, // temperory placeholder
		Status: "y",
		Created_By: 1,
		Organization_ID: 1,
		Enabled_Flag: 'Y',
		Branch_ID : 1,
		Approved_by_ID:0,
		Approved_Date:currentDate.format('YYYY-MM-DD'),
		PO_Date: currentDate.format('YYYY-MM-DD'),
		Creation_Date: currentDate.format('YYYY-MM-DD'),
		Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss'),
		Last_Updated_By: 1,
	}
	const [header, setHeader] = useState(() => props.edit === 'true' ? props.data : initialState);

	const PaymentType = [
		{ title: "Cash" },
		{ title: "Credit Card" },
		{ title: "Online Transfer" },
		{ title: "PayOrder" },
	];

	useEffect(() => { // whenever there is change in header update HeaderInfo in POForm
		props.sendHeaderInfo(header);
	}, [header]); // eslint-disable-line

	useEffect(() => { // Initializer
		ReactModal.setAppElement("body");
		axios.all([
			API.get(`/pms/purchaseOrder/supplier/1`),API.get("/pms/purchaseOrder/department/1")
		])
		.then(axios.spread((url1,url2) => {
			// console.log('url1',url1);	
			setSuppliers(url1.data)
			setdepartments(url2.data)
			setReady(true);
		}))
		.catch(err => {
			console.log(err);
		})
	}, []); // eslint-disable-line


	return (
		ready &&
		<div>
			<label style={{ fontSize: "24px", marginLeft: "15%" }}>
				PURCHASE ORDER
			</label>

			{
				props.edit === 'true' &&
				<TextField
					id="standard-search2"
					inputProps={{
						readOnly:true
					}}
					type="Search"
					style={{ marginBottom: "5px", width: "70%", margin: "0 15%" }}
					defaultValue={header.PO_NO}
					label="P.O Number"
				/>
			}

			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					style={{ width: "70%", marginLeft: "0%" }}
					disableToolbar
					variant="inline"
					format="MM/dd/yyyy"
					disabled={header.Enabled_Flag === '1' ? true : false}
					id="PO_Date"
					label="P.O Date"
					value={header.PO_Date}
					onChange={date => setHeader({...header,PO_Date: date})}
					KeyboardButtonProps={{
						"aria-label": "change date",
					}}
				/>
			</MuiPickersUtilsProvider>

			<Autocomplete
				id="disable-portal1"
				options={suppliers}
				disabled={header.Enabled_Flag === '1' ? true : false}
				getOptionLabel={(option) => option.Supplier_Name}
				defaultValue={props.edit ? suppliers.find(supplier => supplier.Supplier_Name === props.data.Supplier_Name) : {}}
				onChange={(event, values) =>
					setHeader({ ...header, Supplier_ID: values && values.Supplier_ID })
				}
				style={{ marginBottom: "5px", width: "70%", margin: "0 15%" }}
				renderInput={(params) => <TextField {...params} label="Supplier" />}
			/>

			<Autocomplete
				id="disable-portal2"
				options={PaymentType}
				disabled={header.Enabled_Flag === '1' ? true : false}
				getOptionLabel={(option) => option.title || ""}
				defaultValue={props.edit ? PaymentType.find(item => item.title === props.data.Payment_Type) : {}}
				style={{ marginBottom: "20px", width: "70%", margin: "0 15%" }}
				onChange={(event, values) =>
					setHeader({ ...header, Payment_Type: values && values.title })
				}
				renderInput={params => {
          return (
            <TextField
              {...params}
              label="Payment Type"
              value={params}
            />
          );
				}}
			/>

			<Autocomplete
				id="disable-portal3"
				options={departments}
				disabled={header.Enabled_Flag === '1' ? true : false}
				getOptionLabel={(option) => option.Department_Name || ""}
				defaultValue={props.edit ? departments.find(department => department.Department_Name === props.data.Department_Name) : {}}
				onChange={(event, values) =>
					setHeader({ ...header, Ship_To_ID: values && values.Department_ID })
				}
				style={{ marginBottom: "5px", width: "70%", margin: "0 15%" }}
				renderInput={(params) => (
					<TextField {...params} label="Ship To Location" />
				)}
			/>

			<TextField
				id="standard-search"
				inputProps={{
					readOnly:header.Enabled_Flag === '1' ? true : false
				}}
				type="Search"
				name="RefNo"
				style={{ width: "70%", margin: "0 15%" }}
				onChange={(event) =>
					setHeader({ ...header, Ref_No: event.target.value })
				}
				defaultValue={props.edit ? props.data.Ref_No : ""}
				inputRef={register({ required: true, maxLength: 255 })}
				label="RefNo"
			/>

			<TextField
				id="standard-search"
				disabled={header.Enabled_Flag === '1' ? true : false}
				type="Search"
				name="Remarks"
				style={{ marginBottom: "5px", width: "70%", margin: "0 15%" }}
				onChange={(event) =>
					setHeader({ ...header, Remarks: event.target.value })
				}
				defaultValue={props.edit ? props.data.Remarks : ""}
				inputRef={register({ required: true, maxLength: 500 })}
				label="Remarks"
			/>
			{errors.Remarks && errors.Remarks.type === "required" && (
				<p className="form_error">
					<i className="fas fa-exclamation-triangle"></i> This field is required
				</p>
			)}
			{errors.Remarks && errors.Remarks.type === "maxLength" && (
				<p className="form_error"> Maximum Length Allowed is 500 </p>
			)}

		</div>
	);
};

export default PurchaseOrderHeader;

