import React, {useState, useEffect} from 'react';

const Hooks = () =>{
const [state, setstate] = useState({
    name:"Muhammad Shoaib",
    company:"Techbiz Solution Pvt Ltd",
    mobile:"0343-2774730",
    count:1
});

const [count,setCount] = useState(0);

useEffect(()=>{
    console.log('use effect :'+count);
},[state,count])
return(
<div>
    <h1>Hooks</h1>
<h3>Name : { state.name }</h3>
<h3>Company : { state.company }</h3>
<h3>Contact : { state.mobile }</h3>
<h3>Count : { state.count }</h3>

<button onClick={()=>setstate({...state,name:"Adeel",count:state.count+1})}> Change State </button>

<div>
 <h2>UseEffect</h2>
 <h3>Count with useEffect :{count}</h3>
 <button onClick = {()=>setCount(count+1)}>Count Increment</button>
</div>
</div>
);
}
export default Hooks;