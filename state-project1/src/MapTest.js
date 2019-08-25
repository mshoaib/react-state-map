import React, { Component } from 'react';

const MapTest = () => {
 
    const carMake =["BMW","Mercedes","Audi","Honda","Toyota"];

    const bikeMake=["Suzuki","Yamaha","Sigma","Honda","Kawaski"]

    const figtherjet=["JF-17","F-16","F-35","Mirage"]

    const studentInfo = [
         {studentID :101,studentName:"kamran",sclass:"X"},
         {studentID :102,studentName:"Salem",sclass:"IX"},
         {studentID :103,studentName:"Khan",sclass:"V"}
         ]

    return(
        <div>

            <h1>Map Test</h1>
            <ul>
                <h3>Car List</h3>
                {carMake.map((cvalue) => {
                    return <li>{cvalue}</li>
                }
                    )}

            </ul>

            <ul>
                <h3>Bike list</h3>
                {
                bikeMake.map((cvalue,i,arr) =>{
                    return <li>{cvalue}{i}{arr}</li>
                })
                }
            </ul>
            <ul>
                <h3>Fighter Jet</h3>
               {figtherjet.map((fvalue) => {
                 return<li>{fvalue}</li>   
               })}
            </ul>
            <ul>
                <h3>Student Info</h3>
                {studentInfo.map((svalue) =>{
                return <li>{svalue.studentID} / {svalue.studentName} / {svalue.sclass}</li>
                })}
            </ul>
        </div>
    )
}
export default MapTest;