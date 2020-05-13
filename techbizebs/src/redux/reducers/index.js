import { combineReducers } from "redux";
import uomReducer from "./inv/uomReducer";
import icgtReducer from "./inv/icgtReducer";


const rootReducer = combineReducers({uomReducer,icgtReducer});

// const test = () =>{
//     console.log('test Reducer');
// }

export default rootReducer;
