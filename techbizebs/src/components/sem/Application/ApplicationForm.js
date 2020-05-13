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

const ApplicationForm = (props) => {
  const { register, errors,  handleSubmit } = useForm()
  let currentDate = moment();
	const { User_ID } = useSelector(state => state.user)

  const OnInsert = data => { 
    /* Additional Values to Form */
  	data = {
  		...data,
  		Enabled_Flag: data.Enabled_Flag === true ? '1' : 'Y',
  		Created_By: User_ID, // temp Changed With User_ID
			Creation_Date: currentDate.format('YYYY-MM-DD'),
			Last_Updated_By: User_ID, // temp Changed With User_ID
			Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss')
  	}

    API.post("/application/post", data, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      if(response.status === 200)
			  swal("New Record Created!","", "success");
      props.onClose(false);
      props.getApplications();
    })
    .catch(function(error) {
      console.log(error);
      if(error.response.status === 400 ||error.response.status === 403 || error.response.status === 404){
				swal("Entry Failed!",error.message, "error");
 			}
    });
  };

  const OnUpdate = data => {
    const {
      Application_ID,
      Application_Desc,
      Application_Name,
      Application_Short_Name,
      Enabled_Flag
    } = props.record;
    
    if (
      data.Application_Name === Application_Name &&
      data.Application_Short_Name === Application_Short_Name &&
      data.Application_Desc === Application_Desc &&
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

    //Update
    API.put(`/application/update/${Application_ID}`, data, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      // console.log(response);
      if(response.status === 200)
			  swal("Record Updated!","", "success");
      props.onClose(false);
      props.getApplications();
    })
    .catch(function(error) {
      console.log(error);
      if(error.response.status === 400 ||error.response.status === 403 || error.response.status === 404){
				swal("Entry Failed!",error.message, "error");
 			}
    });
  };

  const onSubmit = data => {
    if (props.type === "insert") {
      OnInsert(data);
    } else {
      OnUpdate(data);
    }
  };

  return (
  	<Grid>
  			<form onSubmit={handleSubmit(onSubmit)} style={{minWidth:'100%'}}>
				  <p style={{ color: "#4252a7", textAlign:'center' }} className="h4 text-left py-4">
				    APPLICATION
				  </p>

				  <TextField
				    id="standard-search"
				    autoComplete="off"
				    fullWidth
                    defaultValue={props.type === "update" ? props.record.Application_Name : ""}
				    type="search"
				    name="Application_Name"
				    style={{ marginBottom: "20px" }}
				    inputRef={register({ required: true, maxLength: 255 })}
				    label="Application Name"
				  />
				  {errors.Application_Name && errors.Application_Name.type === "required" && (
				    <p className="form_error">
				      <i className="fas fa-exclamation-triangle"></i> This field is required
				    </p>
				  )}
				  {errors.Application_Name && errors.Application_Name.type === "maxLength" && (
				    <p className="form_error"> Maximum Length Allowed is 250 </p>
				  )}

				  <TextField
				    id="standard-search"
				    type="search"
				    autoComplete="off"
				    fullWidth
				    name="Application_Short_Name"
				    style={{ marginBottom: "20px", marginTop: "5px" }}
				    defaultValue={
				      props.type === "update" ? props.record.Application_Short_Name : ""
				    }
				    inputRef={register({ required: true, maxLength: 255 })}
				    label="Application Short Name"
				  />
				  {errors.Application_Short_Name &&
				    errors.Application_Short_Name.type === "required" && (
				      <p className="form_error">
				        <i className="fas fa-exclamation-triangle"></i> This field is required
				      </p>
				    )}
				  {errors.Application_Short_Name &&
				    errors.Application_Short_Name.type === "maxLength" && (
				      <p className="form_error"> Maximum Length Allowed is 250 </p>
				    )}


				  <TextField
				    id="standard-search"
				    type="search"
				    autoComplete="off"
				    fullWidth
				    name="Application_Desc"
				    style={{ marginBottom: "20px", marginTop: "5px" }}
				    defaultValue={props.type === "update" ? props.record.Application_Desc : ""}
				    inputRef={register({ required: true, maxLength: 255 })}
				    label="Application Description"
				  />
				  {errors.Application_Desc && errors.Application_Desc.type === "required" && (
				    <p className="form_error">
				      <i className="fas fa-exclamation-triangle"></i> This field is required
				    </p>
				  )}
				  {errors.Application_Desc && errors.Application_Desc.type === "maxLength" && (
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

export default ApplicationForm;