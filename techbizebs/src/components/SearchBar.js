import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const SearchBar = (props) => {

	return (
		<div style={{margin:'10px 0', padding: '0 10px'}}>
			 <TextField 
				style={{width:'90%'}}
			 	id="standard-name" 
			 	label="Search ..." 
			 	value={props.search} 
			 	onChange={props.handleChange} />
			 	<Button 
			 		onClick={() => props.onSearch()}
			 		style={{height:'55px',margin:'5px'}}
			 		color="primary"
			 	>
				   <i className="fas fa-search" style={{ fontSize: '1.3rem'}}></i>
				</Button>
		</div>
	)
}

export default SearchBar