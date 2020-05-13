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
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

 



const IcgForm = (props) => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let CompletDate = year+'-'+month+'-'+date;

  // const [showSnakeBar,setshowSnakeBar] = useState(false);
  const [open, setOpen] = React.useState(false);
 // const classes = useStyles();
  const [age, setAge] = React.useState('');


  const [itemCat,setItemCat] = React.useState([]);
    React.useEffect(() => {
    async function getCharacters() {

      API.get('/inv/lov/get-icgt-lov' , {
        headers:{
          "Content-Type" : "ICGT-Lov/json"
        }
      })
      .then(response => {
         console.log(response.data);        
         setItemCat(response.data);
               })
      .catch(err => {
        console.log(err);
      })
    }
     getCharacters();
  }, []);
    
  const { register, errors,  handleSubmit , setValue } = useForm()

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
    
    data["Organization_ID"] = 1;    
    data["Enabled_Flag"] =  data.Enabled_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    data["Created_By"] = 1;
    //data["Creation_Date"] = CompletDate;
    //data["Last_Updated_Date"] = CompletDate;
    data["Last_Updated_By"] = 1;
    // console.log(data);

    /* **********  Post API *********** */

    API.post("/inv/create-icg", data, {
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
      Item_Cat_Group_ID ,
      Item_Cat_Group_Name,
      Item_Cat_Group_Desc,
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
    API.put(`/inv/update-icg/${Item_Cat_Group_ID}`, data, {
      header: {
        "Content-Type": "ICG/json"
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

  const handleChange = (e) =>{
    console.log(e.target.value);
    
  }
  
 // console.log("items",items);
    
  return (
    <MDBContainer>
     
      <MDBRow>
        <MDBCol>
          <form  onSubmit={handleSubmit(onSubmit)}>
            {/* <p style={{color : "#007bff"}} className="h4 text-center py-4">Unit of measurement1</p> */}
            <p style={{color : "#113C87"}} className="h5 text-left py-1">Item Category Group</p>

            
            <MDBInput autoComplete="off" style={{marginBottom:"5px" }} name="Item_Cat_Group_Name" valueDefault = {props.type === "update" ? props.record.Item_Cat_Group_Name : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Item Cat Group"  group type="text"  validate error="wrong" success="right" />
            {errors.Item_Cat_Group_Name && errors.Item_Cat_Group_Name.type === "required" &&  <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Item_Cat_Group_Name && errors.UOM_Name.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 250 </p>}

            <MDBInput autoComplete="off" style={{marginBottom:"5px" }} name ="Item_Cat_Group_Desc" valueDefault = {props.type === "update" ? props.record.Item_Cat_Group_Desc : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Item Cat Group Desc"  group type="text"  validate error="wrong" success="right" />
            {errors.Item_Cat_Group_Desc  && errors.Item_Cat_Group_Desc.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Item_Cat_Group_Desc  && errors.Item_Cat_Group_Desc.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}

            {/* <label>Item Category Group Type</label>
            <select ref={register} name="Item_Cat_Grp_Type_ID">
            {items.map((item,index) => (
              
            <option key={index} 
            value = {props.type === "update" ? props.record.Item_Cat_Grp_Type_ID:item.Item_Cat_Grp_Type_ID}
            >
            
             {props.type === "update" ? props.record.Item_Cat_Grp_Type_Name:item.Item_Cat_Grp_Type_Name}
           </option> 
               ))}
          </select> */}
            {console.log("Item category type lov :",itemCat)}
            <Autocomplete
						id="disable-portal2"
						options={itemCat}
						ref={register}
						name="Item_Cat_Grp_Type_ID"
						defaultValue={
							props.type === "update"
								? itemCat.find((iCat) => iCat.Item_Cat_Grp_Type_ID === props.record.Item_Cat_Grp_Type_ID)
								: {}
						}
						getOptionLabel={(option) => option.Item_Cat_Grp_Type_Name || ""}
						onChange={(event, value) => {
							if (value != null) setValue("Item_Cat_Grp_Type_ID", value.Item_Cat_Grp_Type_ID);
						}}
						style={{ marginBottom: "20px" }}
						renderInput={(params) => {
							return (
								<TextField
									{...params}
									label="Item Cat Group Type"
									name="Item_Cat_Grp_Type_ID"
									fullWidth
									value={params}
								/>
							);
						}}
					/>
					{errors.Item_Cat_Grp_Type_ID && errors.Item_Cat_Grp_Type_ID.type === "required" && (
						<p className="form_error">
							<i className="fas fa-exclamation-triangle"></i> This field is
							required
						</p>
					)}

           
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

export default IcgForm;