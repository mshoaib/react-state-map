import React ,{useState} from "react";
import { useForm} from 'react-hook-form'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import API from "../../../baseURL";
import {OnMessage} from "../../misc/message";
 



const IcgtForm = (props) => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let CompletDate = year+'-'+month+'-'+date;

  // const [showSnakeBar,setshowSnakeBar] = useState(false);
  const [open, setOpen] = React.useState(false);

    
  const { register, errors,  handleSubmit ,message } = useForm()

  const onSubmit = data => {
    console.log("**** on sumbit *****")
    //console.log(data);
    if (props.type === "insert") {
      OnInsert(data);
    } else {
      OnUpdate(data);
      // alert('record updated 11');
      console.log('show snake bar');
    }
  };

  
 
 //ForInsert
  const OnInsert = data => {
    
    data["Organization_ID"] = 1;    
    data["Enabled_Flag"] =  data.Enabled_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    data["Created_By"] = 1;
    //data["Creation_Date"] = CompletDate;
    //data["Last_Updated_Date"] = CompletDate;
    data["Last_Updated_By"] = 1;
    // console.log(data);

    /* **********  Post API *********** */

    API.post("/inv/create-icgt", data, {
      header: {
        "Content-Type": "ICGT/json"
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
      Item_Cat_Grp_Type_ID ,
      Item_Cat_Grp_Type_Name,
      Item_Cat_Grp_Type_Desc,
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
    //data["Last_Updated_Date"] = CompletDate;
    data["Organization_ID"] = 1;
    data["Last_Updated_By"] = 1;
    data["Created_By"] = 1;
    
     console.log(data);
  
    //Update
    API.put(`/inv/update-icgt/${Item_Cat_Grp_Type_ID}`, data, {
      header: {
        "Content-Type": "ICGT/json"
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

 
  return (
    <MDBContainer>
     
      <MDBRow>
        <MDBCol>
          <form  onSubmit={handleSubmit(onSubmit)}>
            {/* <p style={{color : "#007bff"}} className="h4 text-center py-4">Unit of measurement1</p> */}
            <p style={{color : "#113C87"}} className="h5 text-left py-1">Item Category Group Type</p>

            
            <MDBInput autoComplete="off" style={{marginBottom:"5px" }} name="Item_Cat_Grp_Type_Name" valueDefault = {props.type === "update" ? props.record.Item_Cat_Grp_Type_Name : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Item Cat Group Type"  group type="text"  validate error="wrong" success="right" />
            {errors.Item_Cat_Grp_Type_Name && errors.Item_Cat_Grp_Type_Name.type === "required" &&  <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Item_Cat_Grp_Type_Name && errors.UOM_Name.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 250 </p>}

            <MDBInput autoComplete="off" style={{marginBottom:"5px" }} name ="Item_Cat_Grp_Type_Desc" valueDefault = {props.type === "update" ? props.record.Item_Cat_Grp_Type_Desc : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Item Cat Group Type Desc"  group type="text"  validate error="wrong" success="right" />
            {errors.Item_Cat_Grp_Type_Desc  && errors.Item_Cat_Grp_Type_Desc .type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Item_Cat_Grp_Type_Desc  && errors.Item_Cat_Grp_Type_Desc .type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}

            <div className="checkbox">
              <input name = "Enabled_Flag" defaultChecked = {props.type === "update" ? (props.record.Enabled_Flag === "Y" ? true : false ) : false  } type="checkbox" id="checkbox1" className ="checkbox__input" ref={register} />
              <label htmlFor="checkbox1" className ="checkbox__label"  >Enabled Flag</label>
            </div>

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

export default IcgtForm;