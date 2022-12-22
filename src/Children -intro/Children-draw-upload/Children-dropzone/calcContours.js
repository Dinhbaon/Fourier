import React from "react";
import {useEffect} from "react"

const Calccountours=({files}) =>{
console.log(files)
      useEffect(() => {
    
        const script = document.createElement("script");
        script.src = "https://docs.opencv.org/3.4.0/opencv.js";
        script.async = false;    
        document.body.appendChild(script);
        //
        console.log('cv from opencv is');
        console.log(window["cv"]);
     
        
      });

    return(
<div></div>
    )

}
export default Calccountours