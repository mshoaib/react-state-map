import React, { Component } from 'react';
import User from './User';

class Users extends Component {

    state = {
        users:[
            { name:"Shoaib"   , age : 35},
            { name:"Muhammad" , age : 40},
            { name:"OWais"    , age : 34}
         ],
        title:"User List"
        

    };

    makeMeYounger=()=>{
        this.setState({
            users:[
                {name:this.state.users[0].name,age: this.state.users[0].age - 10},
                {name:this.state.users[1].name,age: this.state.users[1].age - 10},
                {name:this.state.users[2].name,age: this.state.users[2].age - 10},
            ]
            

        
        })
        
        
    }

// makeMeYounger = () =>{

//     this.setState({
//         users:[]

//     })
// }

render(){
    

    return(
        <div>
            <h2>{this.state.title}</h2>
            <button onClick={this.makeMeYounger}>Make me 10 years younger</button>
            
            <ul>
               {this.state.users.map((user)=>{
                   return(<li><User age={user.age} name={user.name} /></li>)
               })}
            </ul> 
        </div>
    )
}

}

export default Users;