import React ,{useState} from "react";
import { useForm} from 'react-hook-form'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import API from "../../../baseURL";
import {OnMessage} from "../../misc/message";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
 



const ItemForm = (props) => {

  const [v_City,setv_City] = React.useState([]); // declare object for item sub cat
  const [v_City1,setv_City1] = useState(null);

/* *************  Get City Lov *************** */
  React.useEffect(() => {
    async function getCityLov() {
      API.get('/adm/lov/get-city-lov' , {
        headers:{
          "Content-Type" : "application/json"
        } })
      .then(
          response => {
            setv_City(response.data);
          //  console.log(response.data);

            if(props.type==='update')
            {
                setv_City1(props.record.City_ID)
            }
               else{
              setv_City1(response.data[0].City_ID);
               }
            })
      .catch(err => {console.log(err);})
        }
    getCityLov();
  },[]
  );
  
  const [v_Uom,setv_Uom] = React.useState([]); // declare object for item sub cat
  const [v_Uom1,setv_Uom1] = useState(null);

/* *************  Get UOM Lov *************** */
  React.useEffect(() => {
    async function getUomLov() {
      API.get('/inv/lov/get-uom-lov' , {
        headers:{
          "Content-Type" : "UOM-Lov/json"
        } })
      .then(
          response => {
            setv_Uom(response.data);
           // console.log("props.record :",props.record);

            if(props.type==='update')
            {
                setv_Uom1(props.record.UOM_ID)
            }
               else{
              setv_Uom1(response.data[0].UOM);
               }
            })
      .catch(err => {console.log(err);})
        }
        getUomLov();
  },[]
  );
    
  



  const { register, errors,  handleSubmit ,message } = useForm()

  const onSubmit = data => {
    console.log("**** on sumbit *****")
    //console.log(data);
    if (props.type === "insert") {
      OnInsert(data);
      console.log(data);
    } else {
      OnUpdate(data);
      // alert('record updated 11');
      console.log('show snake bar');
    }
  };

  
  console.log('props :',props.record);
 //ForInsert
  const OnInsert = data => {
    
    //data["Organization_ID"] = 1;    
    data["Enabled_Flag"] =  data.Enabled_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    data["Created_By"] = 1;
    data["Last_Updated_By"] = 1;
  
    /* **********  Post API *********** */

    API.post("/adm/create-busgrp", data, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      console.log(response);
      props.onClose(false);
      props.getData();
      OnMessage("Record has been created","success");
    })
    .catch(function(error) {
      console.log(error.response.header);
    });
  };

  /* ********************** Update API **************** */
  const OnUpdate = data => {
    const {
      Business_Group_ID ,
      Business_Group_Name,
      Business_Group_Desc,
      Business_Group_AddressLine1,
      Enabled_Flag
    } = props.record;
    
    // if (
    //   data.UOM_Name === UOM_Name &&
    //   data.UM_Desc === UM_Desc &&
    //   data.UOM_Short_Code === UOM_Short_Code &&
    //   data.Enabled_Flag === Enabled_Flag
    // ) {
    //   alert("No Data Change To Be Noted");
    //   return;
    // }

    data["Enabled_Flag"] = data.Enabled_Flag === true ? 'Y' : 'N' // converting Enabled_Flag from boolean to String
    data["Last_Updated_By"] = 1;
    data["Created_By"] = 1;
    
     console.log(data);
  
/* **************** Update API **************** */
    API.put(`/adm/update-busgrp/${Business_Group_ID}`, data, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
       console.log(response);
      props.onClose(false);
      props.getData();
      OnMessage("Record has been updated","success");
    })
    .catch(function(error) {
      console.log(error);
    });
  }; 

  const handleChangeCity = (event) => {
    console.log('handler',event.target.value)
    setv_City1( event.target.value );
  }
  
  const handleChangeUOM = (event) => {
    console.log('handler',event.target.value)
    setv_Uom1( event.target.value );
  }
  
    
  return (
    <MDBContainer>
     
      <MDBRow>
        <MDBCol>
          <form  onSubmit={handleSubmit(onSubmit)}>
            {/* <p style={{color : "#007bff"}} className="h4 text-center py-4">Unit of measurement1</p> */}
            <p style={{color : "#113C87"}} className="h5 text-left py-1">Business Group </p>

            
            <MDBInput autoComplete="off" style={{marginBottom:"2px" }} name="Business_Group_Name" valueDefault = {props.type === "update" ? props.record.Business_Group_Name : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Business Group Name"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_Name && errors.Business_Group_Name.type === "required" &&  <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_Name && errors.Business_Group_Name.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 250 </p>}

            <MDBInput autoComplete="off" style={{marginBottom:"2px" }} name="Business_Group_Desc" valueDefault = {props.type === "update" ? props.record.Business_Group_Desc : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Description"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_Desc && errors.Business_Group_Desc.type === "required" &&  <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_Desc && errors.Business_Group_Desc.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 250 </p>}
            
            <MDBRow>
            <MDBCol>
          
            <MDBInput autoComplete="off" style={{marginBottom:"3px" }} name ="Business_Group_AddressLine1" valueDefault = {props.type === "update" ? props.record.Business_Group_AddressLine1 : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Address Line 1"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_AddressLine1  && errors.Business_Group_AddressLine1.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_AddressLine1  && errors.Business_Group_AddressLine1.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}

            </MDBCol>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"3px" }} name ="Business_Group_AddressLine2" valueDefault = {props.type === "update" ? props.record.Business_Group_AddressLine2 : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Address Line 2"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_AddressLine2  && errors.Business_Group_AddressLine2.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_AddressLine2  && errors.Business_Group_AddressLine2.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}
            </MDBCol>
            </MDBRow>
            <label style={{width: 50}}>City</label>            
            <select style={{width: 150}} ref={register} name="City_ID" 
            value={v_City1}
            onChange={e => handleChangeCity(e)}
            >
            {v_City.map((item,index) => (
            <option key={index} 
            value = {item.city_id}
            >
            {item.city_name}
            </option> 
                ))}
            </select>
            
            <MDBRow>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"2px" }} name ="Business_Group_TelNo1" valueDefault = {props.type === "update" ? props.record.Business_Group_TelNo1 : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Tel No 1"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_TelNo1  && errors.Business_Group_TelNo1.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_TelNo1  && errors.Business_Group_TelNo1.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}
            </MDBCol>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"2px" }} name ="Business_Group_TelNo2" valueDefault = {props.type === "update" ? props.record.Business_Group_TelNo2 : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Tel No 2"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_TelNo2  && errors.Business_Group_TelNo2.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_TelNo2  && errors.Business_Group_TelNo2.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}
              
            </MDBCol>
            </MDBRow>

            <MDBRow>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"2px" }} name ="Business_Group_Email" valueDefault = {props.type === "update" ? props.record.Business_Group_Email : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Email"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_Email  && errors.Business_Group_Email.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_Email  && errors.Business_Group_Email.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}
            </MDBCol>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"2px" }} name ="Business_Group_Website" valueDefault = {props.type === "update" ? props.record.Business_Group_Website : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Website"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_Website  && errors.Business_Group_Website.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_Website  && errors.Business_Group_Website.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}
              
            </MDBCol>
            </MDBRow>
            
            <MDBRow>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"2px" }} name ="Business_Group_NTN_NO" valueDefault = {props.type === "update" ? props.record.Business_Group_NTN_NO : ""} inputRef={register({ required: false, maxLength: 255 })   }  label="NTN NO"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_NTN_NO  && errors.Business_Group_NTN_NO.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_NTN_NO  && errors.Business_Group_NTN_NO.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}
            </MDBCol>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"2px" }} name ="Business_Group_GST_NO" valueDefault = {props.type === "update" ? props.record.Business_Group_GST_NO : ""} inputRef={register({ required: false, maxLength: 255 })   }  label="GST NO"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_GST_NO  && errors.Business_Group_GST_NO.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_GST_NO  && errors.Business_Group_GST_NO.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}
              
            </MDBCol>
            </MDBRow>

            <MDBRow>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"2px" }} name ="Business_Group_Book_ID" valueDefault = {props.type === "update" ? props.record.Business_Group_Book_ID : ""} inputRef={register({ required: false, maxLength: 255 })   }  label="Book ID"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_Book_ID  && errors.Business_Group_Book_ID.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_Book_ID  && errors.Business_Group_Book_ID.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}
            </MDBCol>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"2px" }} name ="Business_Group_Account_ID" valueDefault = {props.type === "update" ? props.record.Business_Group_Account_ID : ""} inputRef={register({ required: false, maxLength: 255 })   }  label="Account ID"  group type="text"  validate error="wrong" success="right" />
            {errors.Business_Group_Account_ID  && errors.Business_Group_Account_ID.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Business_Group_Account_ID  && errors.Business_Group_Account_ID.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}
              
            </MDBCol>
            </MDBRow>

            <MDBRow>
            <MDBCol>
            <div className="checkbox">
              <input name = "Enabled_Flag" defaultChecked = {props.type === "update" ? (props.record.Enabled_Flag === "Y" ? true : false ) : false  } type="checkbox" id="checkbox1" className ="checkbox__input" ref={register} />
              <label htmlFor="checkbox1" className ="checkbox__label"  >Enabled Flag</label>
            </div>
            
           </MDBCol>
            </MDBRow>

            <div className="text-center py-4 mt-3">
              <MDBBtn color="cyan"  type="submit">
              {
                props.type === "insert" ? "Apply" : "Update"
              }
              </MDBBtn>
            </div>
          </form>
            
        </MDBCol>
      </MDBRow>
            
              
    </MDBContainer>
  );
};

export default ItemForm;