const types = {
	USER_LOGIN : 'USER_LOGIN',
	USER_LOGOUT: 'USER_LOGOUT',
	SELECT_FORM: 'SELECT_FORM',
	SELECT_MODULE : 'SELECT_MODULE',
	SELECT_TOOLBAR : 'SELECT_TOOLBAR'

}
 

const user_login = (payload) => {
    console.log("user login (action)",payload);

	return {
		type : types.USER_LOGIN,
		payload
	}
}

const user_logout = () => {
	localStorage.removeItem('persist:root')
	return {
		type : types.USER_LOGOUT,
	}
}

const select_form = (payload) => {
	return {
		type : types.SELECT_FORM,
		payload
	}
}

const select_module = (payload) => {
	return {
		type : types.SELECT_MODULE,
		payload
	}
}

const select_toolbar =(payload)=>{
	return{
		type : types.SELECT_TOOLBAR,
		payload
	}
}

 
export {
	types,
	user_login,
	user_logout,
	select_form,
	select_module,
	select_toolbar
}