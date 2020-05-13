import React from 'react'
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Pagination from '@material-ui/lab/Pagination';

const CustomPagination = (props) => {
	/*
		Props
		1 -- rowCount - setRowCount for handling row per Page
		2 -- pageNumber -- setPageNumber for handling page Number
		3 -- Api Functions for onClick of Next and Previous
	*/

	const handleChange = event => {
    props.setRowCount(event.target.value);
  };

  const pageHandler = (event,value) => {
  	if(props.pageNumber !== value){
			props.setPageNumber(value)
			props.newPage()
  	}
  }

	return (
		<Grid 
			style={{margin:'10px 0px',height:'20px'}}
			container item xs={12} justify="center"
		>
			<Pagination 
		    	count={props.totalPages} 
		    	size="large"
		    	page={props.pageNumber} 
		    	variant="outlined" color="primary"
		    	onChange={pageHandler}
		  />
			<FormControl style={{minWidth: 100,margin: '0 60px',height:'40px'}}>
		    <InputLabel htmlFor='selected-language'>Rows</InputLabel>
		   	<Select
		   		id="selected-language"
	        value={props.rowCount || 5}
	        size="small"
	        onChange={handleChange}
	      >
	        <MenuItem value={5}>5</MenuItem>
	        <MenuItem value={10}>10</MenuItem>
	        <MenuItem value={20}>20</MenuItem>
	        <MenuItem value={50}>50</MenuItem>
	        <MenuItem value={100}>100</MenuItem>
	      </Select>	
			</FormControl>
		</Grid>
	)
}

export default CustomPagination