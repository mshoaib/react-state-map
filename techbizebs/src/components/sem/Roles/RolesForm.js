import React from "react";
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import API from '../../../baseURL';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import swal from 'sweetalert';

const RolesForm = (props) => {
	const { register, errors, handleSubmit } = useForm()
	let currentDate = moment();
	const { Organization_ID, User_ID } = useSelector(state => state.user)

	const onSubmit = data => {
		if (props.type === "insert") {
			OnInsert(data);
		} else {
			OnUpdate(data);
		}
	};

	/* INSERT FORM FUNCTION */
	const OnInsert = data => {

		data = {
			...data,
			Organization_ID, // Organization_ID from redux
			Enabled_Flag: data.Enabled_Flag === true ? '1' : 'Y',
			Created_By: User_ID, // temp Changed With User_ID
			Creation_Date: currentDate.format('YYYY-MM-DD'),
			Last_Updated_By: User_ID, // temp Changed With User_ID
			Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss')
		}

		API.post("/sem/roles/post", data, {
			header: {
				"Content-Type": "application/json"
			}
		})
			.then(function (response) {
				if (response.status === 200)
					swal("New Record Created!", "", "success");
				props.onClose(false);
				props.getRoles();
			})
			.catch(function (error) {
				console.log(error);
				if (error.response.status === 400 || error.response.status === 403 || error.response.status === 404) {
					swal("Entry Failed!", error.message, "error");
				}
			});
	};

	/* UPDATE FORM FUNCTION */
	const OnUpdate = data => {
		const {
			Role_ID,
			Role_Desc,
			Role_Name,
			Enabled_Flag
		} = props.record;
		if (
			data.Role_Name === Role_Name &&
			data.Role_Desc === Role_Desc &&
			(data.Enabled_Flag === true ? 1 : "Y") === Enabled_Flag
		) {
			alert("No Data Change To Be Noted");
			return;
		}

		data = {
			...data,
			Enabled_Flag: data.Enabled_Flag === true ? '1' : 'Y',
			Last_Updated_By: User_ID, // temp Changed With User_ID
			Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss')
		}

		API.put(`/sem/roles/update/${Role_ID}`, data, {
			header: {
				"Content-Type": "application/json"
			}
		})
			.then(function (response) {
				if (response.status === 200)
					swal("Record Updated!", "", "success");
				props.onClose(false);
				props.getRoles();
			})
			.catch(function (error) {
				console.log(error);
				if (error.response.status === 400 || error.response.status === 403 || error.response.status === 404) {
					swal("Entry Failed!", error.message, "error");
				}
			});
	};

	return (
		<Grid>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p style={{ color: "#113C87" }} className="h5 text-left py-1">
					Roles  > Create / Update
      			  </p>

				<TextField
					id="standard-search"
					type="search"
					fullWidth
					name="Role_Name"
					style={{ marginBottom: "20px" }}
					defaultValue={props.type === "update" ? props.record.Role_Name : ""}
					inputRef={register({ required: true, maxLength: 255 })}
					label="Role Name"
				/>
				{errors.Role_Name && errors.Role_Name.type === "required" && (
					<p className="form_error">
						{" "}
						<i className="fas fa-exclamation-triangle"></i> This field is required
					</p>
				)}
				{errors.Role_Name && errors.Role_Name.type === "maxLength" && (
					<p className="form_error"> Maximum Length Allowed is 250 </p>
				)}

				<TextField
					id="standard-search"
					type="search"
					name="Role_Desc"
					fullWidth
					style={{ marginBottom: "20px", marginTop: "5px" }}
					defaultValue={props.type === "update" ? props.record.Role_Desc : ""}
					inputRef={register({ required: true, maxLength: 255 })}
					label="Role Description"
				/>
				{errors.Role_Desc && errors.Role_Desc.type === "required" && (
					<p className="form_error">
						{" "}
						<i className="fas fa-exclamation-triangle"></i> This field is required
					</p>
				)}
				{errors.Role_Desc && errors.Role_Desc.type === "maxLength" && (
					<p className="form_error"> Maximum Length Allowed is 250 </p>
				)}

				<FormControlLabel
					control={
						<Checkbox
							inputRef={register}
							defaultChecked={
								props.type === "update"
									? props.record.Enabled_Flag === "1"
										? true
										: false
									: false
							}
							name="Enabled_Flag"
							color="primary"
						/>
					}
					label="Enable Flag"
				/>

				<div>
					<Button color="primary" variant="contained" type="submit">
						{props.type === "insert" ? "Register" : "Update"}
					</Button>
				</div>
			</form>
		</Grid>
	);
};

export default RolesForm;