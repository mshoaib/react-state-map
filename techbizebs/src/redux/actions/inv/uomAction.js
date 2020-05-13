import axios from 'axios';

export const changeName = () =>{
return(dispatch)=>{

    axios.get('http://localhost:5000/api/organization/get-organization')
   // .then(res=>console.log(res.data[0].NAME))
    .then(res2 => {dispatch({type:'UPDATE_UOM',payload:res2.data[0].NAME})})
    .catch(function (error) {
        console.log(error);
    })


 }}

