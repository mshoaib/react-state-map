const iState = {
    uom_name:'',
    uom_desc:'',
    uom_short_code:''
}

const uomReducer = (state=iState,action) => {

    console.log('uom reducer',action.type);

    switch(action.type) {
        case "UPDATE_UOM":{
            return action.payload
            
        }}
      
    return state;

}

export default uomReducer;