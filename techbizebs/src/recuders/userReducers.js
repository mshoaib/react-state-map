import { types } from   '../actions/userActions.js';

const defaultState = {
  isLoggedIn:false,
  isToolbar:false,
  User_ID:'',
  User_Name:'',
  User_Email:'',
  Organization_ID:'',
  Branch_ID:'',
  Employee_Name:'',
  Designation:'',
  forms:[], 
  modules:[],
  formSelected:'',
  moduleSelected:''
}

const userReducer = (state = defaultState, {type,payload}) => {

    console.log("user Reducer ",type)
  switch (type) {
  	case types.USER_LOGIN: {
  		return {
  			...state,
			  isLoggedIn:true,
  			...payload
  		}
  	}

  	case types.USER_LOGOUT: {
  		return {
  			...defaultState
  		}
  	}

  	case types.SELECT_FORM: {
  		return {
  			...state,
  			formSelected:payload
  		}
	  }
	  
	  case types.SELECT_MODULE: {
		return {
			...state,
			moduleSelected:payload
		}
	}

	case types.SELECT_TOOLBAR: {
		return {
			...state,
			isToolbar:payload
		}
	}


    default:
      return state;
  }
};

export default userReducer;