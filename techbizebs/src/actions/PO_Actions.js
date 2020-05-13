const types = {
	ADD_LINE:'ADD_LINE',
	REMOVE_LINE:'REMOVE_LINE',
	EDIT_LINE:'EDIT_LINE',
	CLEAR_LINES:'CLEAR_LINES',
	FILL_TABLE: 'FILL_TABLE',
	GET_HEADER: 'GET_HEADER',
	SET_HEADER: 'SET_HEADER',
	REMOVE_HEADER: 'REMOVE_HEADER'
}


const add_line = (payload) => {
	return {
		type : types.ADD_LINE,
		payload
	}
}

const fill_table = (payload) => {
	return {
		type : types.FILL_TABLE,
		payload
	}
}

const remove_line = (payload) => { // Payload will receive id of item to be removed
	return {
		type : types.REMOVE_LINE,
		payload
	}
}

const edit_line = (payload) => {
	return {
		type : types.EDIT_LINE,
		payload
	}
}

const clear_lines = () => {
	return {
		type: types.CLEAR_LINES
	}
}

const get_header = () => {
	return {
		type: types.GET_HEADER,
	}
}

const set_header = (payload) => {
	return {
		type: types.SET_HEADER,
		payload
	}
}

const remove_header = (payload) => {

	console.log('remove header ',payload)
	return {
		type: types.REMOVE_HEADER,
		payload
	}
}


export {
	types,
	add_line,
	remove_line,
	edit_line,
	clear_lines,
	fill_table,
	set_header,
	get_header,
	remove_header
}

