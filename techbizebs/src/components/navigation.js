import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { select_form } from '../actions/userActions.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MainContent from '../screens/MainContent';



const Sidebar = (props) => {
  	const dispatch = useDispatch();
  	const { forms, modules , moduleSelected } = useSelector(state => state.user);
    const module = modules.filter(module => module.Module_ID === moduleSelected)
    console.log("Naigation Module : " ,moduleSelected);
 
  const onHandleChange = (props) =>
{
console.log("targe vaue :",props.module_name);

MainContent(props);

}

  return (
    <div style={{ padding: '5px', marginTop: '2px' }}>
      <Typography variant="h6">{module[0].Module_Name}</Typography>
              <ExpansionPanel >
                <ExpansionPanelSummary
                  aria-controls={`module`}
                  id="panel1a-header"
                >
                  <Typography>Menu</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List style={{width:240}}>
                     {
					        		forms.filter(form => form.Module_ID === moduleSelected)
					        			.map((form,index) => <ListItem key={index} className="sidebarItems" onClick={() => dispatch(select_form(form.Form_Name))}>{form.Form_Name} </ListItem>)
					        	} 

                 </List>
                  
               </ExpansionPanelDetails>
              </ExpansionPanel>
    </div>
  )
}

export default Sidebar