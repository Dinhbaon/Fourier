import React from "react";
import {useEffect} from "react"
import { fft, ifft } from "ezfft"
import '../Children-dropzone/calcContours.css'


const CalcCountoursDraw=({points}) =>{

    let fourier ={x:fft(points.x.slice(1),1),y:fft(points.y.slice(1),1)}
    // sorting based on amplitude (descending)
    let amplitudex = fourier.x.frequency.amplitude
    let amplitudey = fourier.y.frequency.amplitude
    //create dictionary based with indics of amplitude before sort
    let tmpmapx = fourier.x.frequency.frequency.map((e,i)=>({index: i, value: amplitudex[i]}))
    let tmpmapy = fourier.y.frequency.frequency.map((e,i)=>({index: i, value: amplitudey[i]}))
    
    tmpmapx.sort((a,b)=>b.value-a.value)
    tmpmapy.sort((a,b)=>b.value-a.value)

    fourier.x.frequency.frequency = tmpmapx.map((e)=>fourier.x.frequency.frequency[e.index])
    fourier.y.frequency.frequency = tmpmapy.map((e)=>fourier.y.frequency.frequency[e.index])
    fourier.x.frequency.phase = tmpmapx.map((e)=>fourier.x.frequency.phase[e.index])
    fourier.y.frequency.phase = tmpmapy.map((e)=>fourier.y.frequency.phase[e.index])
    fourier.x.frequency.realPart = tmpmapx.map((e)=>fourier.x.frequency.realPart[e.index])
    fourier.y.frequency.realPart = tmpmapy.map((e)=>fourier.y.frequency.realPart[e.index])
    
    fourier.x.frequency.amplitude = fourier.x.frequency.amplitude.sort((a,b)=>b-a).map(a=>a/3)
    fourier.y.frequency.amplitude = fourier.y.frequency.amplitude.sort((a,b)=>b-a).map(a=>a/3)
    console.log(fourier.x.frequency.amplitude)
    
let xcircles = []
let ycircles = []
let initialposx = [{x:250-fourier.x.frequency.amplitude[0],y:50-fourier.x.frequency.amplitude[0]}]
let initialposy = [{x:50-fourier.y.frequency.amplitude[0],y:200 -fourier.y.frequency.amplitude[0]}]
function calcNextposX(phase,prevamplitude,prevpos,curramplitude){ 
    return {x:prevpos.x+prevamplitude*Math.cos(phase)+prevamplitude-curramplitude,
            y:prevpos.y+prevamplitude*Math.sin(phase)+prevamplitude-curramplitude }
}
function calcNextposY(phase,prevamplitude,prevpos,curramplitude){ 
    return {x:prevpos.x+prevamplitude*Math.cos(phase)+prevamplitude-curramplitude ,
            y:prevpos.y+prevamplitude*Math.sin(phase)+prevamplitude-curramplitude}
}


for(let i = 1; i<fourier.x.frequency.amplitude.length; i++){ 
    initialposx.push(calcNextposX(fourier.x.frequency.phase[i-1],fourier.x.frequency.amplitude[i-1],initialposx[i-1],fourier.x.frequency.amplitude[i]))
    initialposy.push(calcNextposY(fourier.y.frequency.phase[i-1],fourier.y.frequency.amplitude[i-1],initialposy[i-1],fourier.y.frequency.amplitude[i]))

}

for(let i = 0; i<fourier.x.frequency.amplitude.length; i++){ 
    xcircles.push(<div className="circle" 
    style={{width : `${2*fourier.x.frequency.amplitude[i]}px`, height: `${2*fourier.x.frequency.amplitude[i]}px`,transform: `translate(${initialposx[i].x}px, ${initialposx[i].y}px)`}}>
    </div>
    )
    xcircles.push(  
        <div  className="lines" >            
        <svg xmlns="http://www.w3.org/2000/svg">
            <line id='linex' stroke="white" />
        </svg>
        </div>  )
    ycircles.push(<div className="circle" 
    style={{width : `${2*fourier.y.frequency.amplitude[i]}px`, height: `${2*fourier.y.frequency.amplitude[i]}px`,transform: ` rotate(90deg)translate(${initialposy[i].x}px, ${initialposy[i].y}px) `,
    transformOrigin: `${50}px ${200}px`}}></div>)


}
console.log(50+2*fourier.y.frequency.amplitude[0])
console.log(200+2*fourier.y.frequency.amplitude[0])
console.log(initialposy)
    return(
<div>
        
    {/*x values */}
        {xcircles}
    {/*y values */}
        {ycircles} 

        </div>

    )

}
export default CalcCountoursDraw