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

  const [v_ItemSubCat,setv_ItemSubCat] = React.useState([]); // declare object for item sub cat
  const [v_ItemSubCat1,setv_ItemSubCat1] = useState(null);

/* *************  Get Item Sub Cateogry Lov *************** */
  React.useEffect(() => {
    async function getItemSubCatLov() {
      API.get('/inv/lov/get-isc-lov' , {
        headers:{
          "Content-Type" : "ISC-Lov/json"
        } })
      .then(
          response => {
            setv_ItemSubCat(response.data);
           // console.log(response.data);

            if(props.type==='update')
            {
                setv_ItemSubCat1(props.record.Item_Sub_Category_ID)
            }
               else{
              setv_ItemSubCat1(response.data[0].Item_Sub_Category_ID);
               }
            })
      .catch(err => {console.log(err);})
        }
    getItemSubCatLov();
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
            console.log("props.record :",props.record);

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
    
    data["Organization_ID"] = 1;    
    data["Enabled_Flag"] =  data.Enabled_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    data["Purchaseable_Item_Flag"] =  data.Purchaseable_Item_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    data["Customer_Order_Item_Flag"] =  data.Customer_Order_Item_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    data["Inventory_Item_Flag"] =  data.Inventory_Item_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    data["Sales_Order_Item_Flag"] =  data.Sales_Order_Item_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    
    data["Created_By"] = 1;
    data["Last_Updated_By"] = 1;
  
    /* **********  Post API *********** */

    API.post("/inv/create-item", data, {
      header: {
        "Content-Type": "Item/json"
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
      Item_ID ,
      Item_Name,
      Item_Desc,
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
    data["Purchaseable_Item_Flag"] =  data.Purchaseable_Item_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    data["Customer_Order_Item_Flag"] =  data.Customer_Order_Item_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    data["Inventory_Item_Flag"] =  data.Inventory_Item_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    data["Sales_Order_Item_Flag"] =  data.Sales_Order_Item_Flag === true ? 'Y' : 'N' ;// converting Enabled_Flag from boolean to String
    
    data["Organization_ID"] = 1;
    data["Last_Updated_By"] = 1;
    data["Created_By"] = 1;
    
     console.log(data);
  
/* **************** Update API **************** */
    API.put(`/inv/update-item/${Item_ID}`, data, {
      header: {
        "Content-Type": "Item/json"
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

  const handleChangeIsc = (event) => {
    console.log('handler',event.target.value)
    setv_ItemSubCat1( event.target.value );
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
            <p style={{color : "#113C87"}} className="h5 text-left py-1">Item </p>

            
            <MDBInput autoComplete="off" style={{marginBottom:"5px" }} name="Item_Name" valueDefault = {props.type === "update" ? props.record.Item_Name : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Item Name"  group type="text"  validate error="wrong" success="right" />
            {errors.Item_Name && errors.Item_Name.type === "required" &&  <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Item_Name && errors.Item_Name.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 250 </p>}

            <MDBInput autoComplete="off" style={{marginBottom:"5px" }} name="Item_Code" valueDefault = {props.type === "update" ? props.record.Item_Code : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Item Code"  group type="text"  validate error="wrong" success="right" />
            {errors.Item_Code && errors.Item_Code.type === "required" &&  <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Item_Code && errors.Item_Code.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 250 </p>}

            <MDBInput autoComplete="off" style={{marginBottom:"5px" }} name ="Item_Desc" valueDefault = {props.type === "update" ? props.record.Item_Desc : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Item Desc"  group type="text"  validate error="wrong" success="right" />
            {errors.Item_Desc  && errors.Item_Desc.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
            {errors.Item_Desc  && errors.Item_Desc.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}

            <MDBRow>
            <MDBCol>
            <label style={{width: 50}}>UOM</label>
            
            <select ref={register} name="UOM_ID" 
            value={v_Uom1}
            onChange={e => handleChangeUOM(e)}
            >
            {v_Uom.map((item,index) => (
            <option key={index} 
            value = {item.UOM}
            >
            {item.UOM_Short_Code}
            </option> 
                ))}
            </select>
            </MDBCol>
            <MDBCol>
            <label style={{width: 175}}>Item Sub Category Type </label>
             <select ref={register} name="Item_Sub_Category_ID" 
              value={v_ItemSubCat1}
              onChange={e => handleChangeIsc(e)}
            >
            {v_ItemSubCat.map((item,index) => (
            <option key={index} 
            value = {item.Item_Sub_Category_ID}
            >
             {item.Item_Sub_Category_Name}
           </option> 
               ))}
          </select>
          </MDBCol>
          </MDBRow>
            <MDBRow>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"5px" }} name ="Min_Qty" valueDefault = {props.type === "update" ? props.record.Min_Qty : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Min Qty"  group type="text"  validate error="wrong" success="right" />
            </MDBCol>
            <MDBCol>
            <MDBInput autoComplete="off" style={{marginBottom:"5px" }} name ="Max_Qty" valueDefault = {props.type === "update" ? props.record.Max_Qty : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Max Qty"  group type="text"  validate error="wrong" success="right" />
            
            </MDBCol>
            </MDBRow>
            <MDBRow>

            <MDBCol>
            <div className="checkbox">
              <input name = "Purchaseable_Item_Flag" defaultChecked = {props.type === "update" ? (props.record.Purchaseable_Item_Flag === "Y" ? true : false ) : false  } type="checkbox" id="checkbox1" className ="checkbox__input" ref={register} />
              <label htmlFor="checkbox1" className ="checkbox__label"  >Purchaseable Item</label>
            </div>
            </MDBCol>
            <MDBCol>
            <div className="checkbox">
              <input name = "Customer_Order_Item_Flag" defaultChecked = {props.type === "update" ? (props.record.Customer_Order_Item_Flag === "Y" ? true : false ) : false  } type="checkbox" id="checkbox1" className ="checkbox__input" ref={register} />
              <label htmlFor="checkbox1" className ="checkbox__label"  >Customer Order Item</label>
            </div>
            </MDBCol>
                        
            </MDBRow>

             <MDBRow>
            <MDBCol>
            <div className="checkbox">
              <input name = "Inventory_Item_Flag" defaultChecked = {props.type === "update" ? (props.record.Inventory_Item_Flag === "Y" ? true : false ) : false  } type="checkbox" id="checkbox1" className ="checkbox__input" ref={register} />
              <label htmlFor="checkbox1" className ="checkbox__label"  >Inventory Item</label>
            </div>
            </MDBCol>
            <MDBCol>
            <div className="checkbox">
              <input name = "Sales_Order_Item_Flag" defaultChecked = {props.type === "update" ? (props.record.Sales_Order_Item_Flag === "Y" ? true : false ) : false  } type="checkbox" id="checkbox1" className ="checkbox__input" ref={register} />
              <label htmlFor="checkbox1" className ="checkbox__label"  >Sales Order Item</label>
            </div>
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