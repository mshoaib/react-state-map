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
import Grid from '@material-ui/core/Grid';


const SupplierForm = (props) => {
  const { Organization_ID, User_ID } = useSelector(state => state.user)
  const { register, errors, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      "Supplier_Type": props.type === 'update' ? props.record.Supplier_Type : "",
      "City_ID": props.type === 'update' ? props.record.City_ID : "",
       "Country_ID": props.type === 'update' ? props.record.Country_ID : ""      
    }
  });

  const [SupplierType, setSupplierType] = useState([]);
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState([]);
  
  const [ready, setReady] = useState(false);
  const currentDate = moment();
  const watchValues = watch();



  useEffect(() => {
    console.log(watchValues)
  })

  useEffect(() => {
    register({ name: "Supplier_Type" }, { required: true })
    register({ name: "City_ID" }, { required: true })
    register({ name: "Country_ID" }, { required: true })


  }, []); // eslint-disable-line

  useEffect(() => {
    if (city.length === 0) {
      axios.all([
        API.get("/pms/lov/get-city-lov"), API.get("/pms/lov/get-supplierType-lov"),
        API.get("/pms/lov/get-country-lov"), 
      ])
        .then(axios.spread((url1, url2 , url3) => {
          setCity(url1.data)
          setSupplierType(url2.data)
          setCountry(url3.data)

          console.log(url3.data);
          setReady(true);
        }))
        .catch(err => {
          console.log(err);
        })
    }
  }, [city]); // eslint-disable-line

  const onSubmit = (data, e) => {
    console.log(e);
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
      Branch_ID:"",
      Organization_ID:1, // Replace
      Enabled_Flag: data.Enabled_Flag === true ? "Y" : "N",
      Created_By: User_ID,
      Creation_Date: currentDate.format("YYYY-MM-DD"),
      Last_Updated_By: User_ID,
     // Last_Updated_Date: currentDate.format("YYYY-MM-DD HH:mm:ss"),
    };

    API.post("/pms/create-supplier", data, {
      header: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.status === 200) swal("New Record Created!", "", "success");
        props.onClose(false);
        props.getData();
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

//  console.log(props.record);

  /* UPDATE FORM FUNCTION */
  const OnUpdate = (data) => {
    const {
      Supplier_ID,
      Supplier_Name,
    } = props.record;
    // if (
    //   data.Supplier_ID === Supplier_ID &&
    //   data.User_ID === User_ID &&
    //   (data.Enabled_Flag === true ? 1 : "Y") === Enabled_Flag
    // ) {
    //   alert("No Data Change To Be Noted");
    //   return;
    // }

    data = {
      ...data,
      Enabled_Flag: data.Enabled_Flag === true ? 'Y' : 'N',
      Created_By: User_ID,
      Last_Updated_By: User_ID, // temp Changed With User_ID
      // Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss'),
      Organization_ID: 1

    }

    console.log("data ---- > ", data);
    API.put(`pms/update-supplier/${Supplier_ID}`, data, {
      header: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) swal("Record Updated!", "", "success");
        props.onClose(false);
        props.getData();
      })
      .catch(function (error) {
        console.log("response.error", error);
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '100%' }}>
          <p style={{ color: "#113C87" }} className="h5 text-left py-1">   Supplier 	</p>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id="standard-search"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Supplier_Name : ""}
                type="search"
                name="Supplier_Name"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Supplier Name"
              />
              {errors.Supplier_Name && errors.Supplier_Name.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Supplier_Name && errors.Supplier_Name.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="disable-portal2"
                options={SupplierType}
                ref={register}
                name="Supplier_Type"
                defaultValue={
                  props.type === "update"
                    ? SupplierType.find((SupplierType) => SupplierType.Supplier_Type === props.record.Supplier_Type)
                    : {}
                }
                getOptionLabel={(option) => option.Supplier_Type || ""}
                onChange={(event, value) => {
                  if (value != null) setValue("Supplier_Type", value.Supplier_Type);
                }}
                style={{ marginBottom: "5px" }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Supplier Type"
                      name="Supplier_Type"
                      fullWidth
                      value={params}
                    />
                  );
                }}
              />
              {/* {errors.Supplier_Type && errors.Supplier_Type.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )} */}
            </Grid>

            <Grid item xs={6}>
              <p style={{ color: "#ffffff", background: "#113C87" }} className="h6 text-left py-1">  Contact Info	</p>
            </Grid>
            <Grid item xs={6}>
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="Address_Line1"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Address_Line1 : ""}
                type="search"
                name="Address_Line1"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Address Line1"
              />
              {errors.Address_Line1 && errors.Address_Line1.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Address_Line1 && errors.Address_Line1.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}

            </Grid>
            <Grid item xs={4}>
              <TextField
                id="Address_Line2"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Address_Line2 : ""}
                type="search"
                name="Address_Line2"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Address Line2"
              />
              {errors.Address_Line2 && errors.Address_Line2.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Address_Line2 && errors.Address_Line2.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>
            <Grid item xs={2}>
               <Autocomplete
                id="City_ID"
                options={city}
                ref={register}
                name="City_ID"
                defaultValue={
                  props.type === "update"
                    ? city.find((city) => city.City_ID === props.record.City_ID)
                    : {}
                }
                getOptionLabel={(option) => option.City_Name || ""}
                onChange={(event, value) => {
                  if (value != null) setValue("City_ID", value.City_ID);
                }}
                style={{ marginBottom: "5px" }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="City"
                      name="City_ID"
                      fullWidth
                      value={params}
                    />
                  );
                }}
              />

            </Grid>
            <Grid item xs={2}>


                <Autocomplete
                id="Country_ID"
                options={country}
                ref={register}
                name="Country_ID"
                defaultValue={
                  props.type === "update"
                    ? country.find((country) => country.Country_ID === props.record.Country_ID)
                    : {}
                }
                getOptionLabel={(option) => option.Country_Name || ""}
                onChange={(event, value) => {
                  if (value != null) setValue("Country_ID", value.Country_ID);
                }}
                style={{ marginBottom: "5px" }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Country"
                      name="Country_ID"
                      fullWidth
                      value={params}
                    />
                  );
                }}
              />

            </Grid>
            <Grid item xs={3}>
              <TextField
                id="Tel_NO1"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Tel_NO1 : ""}
                type="search"
                name="Tel_NO1"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Tel NO"
              />
              {errors.Tel_NO1 && errors.Tel_NO1.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Tel_NO1 && errors.Tel_NO1.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="Tel_NO2"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Tel_NO2 : ""}
                type="search"
                name="Tel_NO2"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Tel NO2"
              />
              {errors.Tel_NO2 && errors.Tel_NO2.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Tel_NO2 && errors.Tel_NO2.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="Email"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Email : ""}
                type="search"
                name="Email"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Email"
              />
              {errors.Tel_NO1 && errors.Tel_NO1.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Email && errors.Email.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="Website"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Website : ""}
                type="search"
                name="Website"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Website"
              />
              {errors.Website && errors.Website.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Website && errors.Website.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>


            <Grid item xs={6}>
              <p style={{ color: "#ffffff", background: "#113C87" }} className="h6 text-left py-1">  Contact Person Info	</p>
            </Grid>
            <Grid item xs={6}>
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="Contact_Person"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Contact_Person : ""}
                type="search"
                name="Contact_Person"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Contact Person"
              />
              {errors.Contact_Person && errors.Contact_Person.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Contact_Person && errors.Contact_Person.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}

            </Grid>
            <Grid item xs={4}>
              <TextField
                id="Contact_Person_Mobile"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Contact_Person_Mobile : ""}
                type="search"
                name="Contact_Person_Mobile"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Person's Mobile"
              />
              {errors.Contact_Person_Mobile && errors.Contact_Person_Mobile.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Contact_Person_Mobile && errors.Contact_Person_Mobile.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="Contact_Person_Email"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Contact_Person_Email : ""}
                type="search"
                name="Contact_Person_Email"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Person's Email"
              />
              {errors.Contact_Person_Email && errors.Contact_Person_Email.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Contact_Person_Email && errors.Contact_Person_Email.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>

            <Grid item xs={6}>
              <p style={{ color: "#ffffff", background: "#113C87" }} className="h6 text-left py-1">
                Other Details	</p> </Grid>
            <Grid item xs={6}>         </Grid>

            <Grid item xs={3}>
              <TextField
                id="NTN_NO"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.NTN_NO : ""}
                type="search"
                name="NTN_NO"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="NTN NO"
              />
              {errors.NTN_NO && errors.NTN_NO.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.NTN_NO && errors.NTN_NO.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="Sales_Tax_NO"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Sales_Tax_NO : ""}
                type="search"
                name="Sales_Tax_NO"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Sales Tax NO"
              />
              {errors.Sales_Tax_NO && errors.Sales_Tax_NO.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Sales_Tax_NO && errors.Sales_Tax_NO.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="Remarks"
                autoComplete="off"
                fullWidth
                defaultValue={props.type === "update" ? props.record.Remarks : ""}
                type="search"
                name="Remarks"
                style={{ marginBottom: "5px" }}
                inputRef={register({ required: true, maxLength: 255 })}
                label="Remarks"
              />
              {errors.Remarks && errors.Remarks.type === "required" && (
                <p className="form_error">
                  <i className="fas fa-exclamation-triangle"></i> This field is required
                </p>
              )}
              {errors.Remarks && errors.Remarks.type === "maxLength" && (
                <p className="form_error"> Maximum Length Allowed is 250 </p>
              )}
            </Grid>


            <Grid item xs={3}>

              <FormControlLabel
                control={
                  <Checkbox
                    inputRef={register}
                    defaultChecked={
                      props.type === "update"
                        ? props.record.Enabled_Flag === "Y"
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
            </Grid>
          </Grid>
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

export default SupplierForm;