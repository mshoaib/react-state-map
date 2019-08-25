import React from 'react';


const User = (props) => {

    return(
        <div>
           
           <h5>User : {props.name} ==> Age : {props.age}</h5>
        </div>

    );
}   

export default User;