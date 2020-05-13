import { types } from '../actions/PO_Actions.js';

const defaultState = {
  lines:[],
  headerDetails:{}
}

const PO_Reducer = (state = defaultState, {type,payload}) => {
  switch (type) {
  	case types.ADD_LINE: {
  		return {
        ...state,
        lines:[...state.lines,payload]
  		}
  	}

    case types.FILL_TABLE: {
      return {
        ...state,
        lines: [...payload]
      }
    }
    

    case types.EDIT_LINE: { // to be done
      return {
        ...state,
        lines: state.lines.map((line,index) => {
          if(index === payload.index){
            return { ...line, ...payload.data }
          }
          return line;
        })
      }
    }

    case types.REMOVE_LINE: { // payload is index of item
      return {
        ...state,
        lines: state.lines.filter((v,i)=>i!==payload)
      }
    } 

    case types.CLEAR_LINES: {
      return {
        ...state,
        lines:[]
      }
    } 

    case types.SET_HEADER: {
      return {
        ...state,
        headerDetails:{
          ...payload
        }
      }
    } 

    case types.REMOVE_HEADER: {
      return {
        ...defaultState
      }
    } 

    default:
      return state;
  }
};

export default PO_Reducer;