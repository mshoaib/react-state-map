import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from 'axios';
import API from '../../../baseURL';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import moment from "moment";
import swal from "sweetalert";

const UserRolesForm = (props) => {
	const { Organization_ID, User_ID } = useSelector(state => state.user)
	const { register, errors, handleSubmit, setValue } = useForm({
		defaultValues: {
			User_ID: props.type === "update" ? props.record.User_ID : "",
			Role_ID: props.type === "update" ? props.record.Role_ID : "",
		},
	});

	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [ready, setReady] = useState(false);
	const currentDate = moment();

	useEffect(() => {
		register({ name: "Role_ID" }, { required: true });
		register({ name: "User_ID" }, { required: true });
	}, []); // eslint-disable-line

	useEffect(() => {
		if (roles.length === 0) {
			axios.all([
				API.get(`/get/RMF/1`), API.get("sem/users/get/names/1")
			])
				.then(axios.spread((url1, url2) => {
					setRoles(url1.data.roles)
					setUsers(url2.data)
					setReady(true);
				}))
				.catch(err => {
					console.log(err);
				})
		}
	}, [roles]); // eslint-disable-line

	const onSubmit = (data, e) => {
		if (props.type === "insert") {
			OnInsert(data);
		} else {
			OnUpdate(data);
		}
	};

	const OnInsert = (data) => {
		/* Additional Values to Form */
		data = {
			...data,
			Organization_ID, // Replace
			Enabled_Flag: data.Enabled_Flag === true ? "1" : "Y",
			Created_By: User_ID,
			Creation_Date: currentDate.format("YYYY-MM-DD"),
			Last_Updated_By: User_ID,
			Last_Updated_Date: currentDate.format("YYYY-MM-DD HH:mm:ss"),
		};

		API.post("/sem/user-roles/post", data, {
			header: {
				"Content-Type": "application/json",
			},
		})
			.then(function (response) {
				if (response.status === 200) swal("New Record Created!", "", "success");
				props.onClose(false);
				props.getUserRoles();
			})
			.catch(function (error) {
				console.log(error);
				if (
					error.response.status === 400 ||
					error.response.status === 403 ||
					error.response.status === 404
				) {
					swal("Entry Failed!", error.message, "error");
				}
			});
	};

	/* UPDATE FORM FUNCTION */
	const OnUpdate = (data) => {
		const {
			Role_ID,
			User_Role_ID,
			Enabled_Flag,
		} = props.record;
		if (
			data.Role_ID === Role_ID &&
			data.User_ID === User_ID &&
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

		API.put(`sem/user-roles/update/${User_Role_ID}`, data, {
			header: {
				"Content-Type": "application/json",
			},
		})
			.then(function (response) {
				// console.log(response);
				if (response.status === 200) swal("Record Updated!", "", "success");
				props.onClose(false);
				props.getUserRoles();
			})
			.catch(function (error) {
				console.log(error);
				if (
					error.response.status === 400 ||
					error.response.status === 403 ||
					error.response.status === 404
				) {
					swal(`Entry Failed!`, error.message, "error");
				}
			});
	};

	return (
		<div style={{ margin: "0 10px" }}>
			{ready ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<p style={{ color: "#113C87" }} className="h5 text-left py-1">
				    User Roles > Create / Update
        			</p>


					<Autocomplete
						id="disable-portal2"
						options={users}
						ref={register}
						name="User_ID"
						defaultValue={
							props.type === "update"
								? users.find((user) => user.User_ID === props.record.User_ID)
								: {}
						}
						getOptionLabel={(option) => option.User_Name || ""}
						onChange={(event, value) => {
							if (value != null) setValue("User_ID", value.User_ID);
						}}
						style={{ marginBottom: "20px" }}
						renderInput={(params) => {
							return (
								<TextField
									{...params}
									label="User List"
									name="User_ID"
									fullWidth
									value={params}
								/>
							);
						}}
					/>
					{errors.User_Name && errors.User_Name.type === "required" && (
						<p className="form_error">
							<i className="fas fa-exclamation-triangle"></i> This field is
							required
						</p>
					)}


					<Autocomplete
						id="disable-portal1"
						options={roles}
						ref={register}
						name="Role_ID"
						defaultValue={
							props.type === "update"
								? roles.find((role) => role.Role_ID === props.record.Role_ID)
								: {}
						}
						getOptionLabel={(option) => option.Role_Name || ""}
						onChange={(event, value) => {
							if (value != null) setValue("Role_ID", value.Role_ID);
						}}
						style={{ marginBottom: "20px" }}
						renderInput={(params) => {
							return (
								<TextField
									{...params}
									label="Role List"
									name="Role_ID"
									fullWidth
									value={params}
								/>
							);
						}}
					/>
					{errors.Role_ID && errors.Role_ID.type === "required" && (
						<p className="form_error">
							<i className="fas fa-exclamation-triangle"></i> This field is
							required
						</p>
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
			) : (
					<h6>Loading</h6>
				)}
		</div>
	);
};

export default UserRolesForm;