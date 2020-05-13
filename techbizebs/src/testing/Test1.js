import React from 'react';
import { connect } from 'react-redux';
import {changeName} from '../redux/actions/inv/uomAction';





const  Test1 = (props) =>   {

  const  changeValue = (e) =>{
       console.log(e.target.value);
       data:{
       e.target.value=e.target.value    
       }
    }

    console.log(props);
        return (
         <div>
         <h1>uom : {props.v_uom}</h1>
         <h1>uom Desc : {props.v_uomDesc}</h1>
         <h1>Item Cateogry group Type : {props.v_icgtname}</h1>
         
         <h1>uom Short Code : {props.v_uomShortCode}</h1>
         
         <input type='text'  onChange={changeValue}/>
         <button onClick={()=>props.changUOM()}>Change uom</button>
        </div>  
        
        );
    
}
const mapStateToProps = (state) =>{
    return {
        v_uom: state.uom_name,
        v_uomDesc:state.uom_desc,
        v_uomShortCode:state.uom_short_code,
        v_icgtname:state.icgt_name
        
   }
}

   const mapDispatchToProps = (dispatch) =>{
    return {
        changUOM : () => {dispatch(changeName()) }
   
     }

   }

   

 
export default connect(mapStateToProps,mapDispatchToProps)(Test1);
