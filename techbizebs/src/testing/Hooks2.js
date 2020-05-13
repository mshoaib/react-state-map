import React, { useRef ,useEffect } from 'react';

const Hooks2 = () =>{

    const myHeading = useRef(null);
    const myInput =  useRef(null)

    useEffect(() =>{

        console.log('heading -- '+myHeading.current.innerText);
    console.log('input -- '+myInput.current.value);
    
    },[])
    
    return(
        <div>
            <h1 ref={myHeading}>Ref curose</h1>
            <input type='text' ref={myInput} />
            
        </div>
    )

}
    
export default Hooks2;