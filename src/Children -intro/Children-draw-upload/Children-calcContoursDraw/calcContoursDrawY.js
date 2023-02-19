import React from "react";
import {useEffect} from "react"
import { fft, ifft } from "ezfft"
import '../Children-dropzone/calcContours.css'
import { motion } from "framer-motion"


const CalcContoursDrawY=({fourier, translateX, translateY}) =>{
    if(fourier.y.frequency.amplitude.length == 0){ 
        return(null)
    }

        





    translateY.x = fourier.y.frequency.amplitude[0]+fourier.y.frequency.amplitude[0]*Math.sin(fourier.y.frequency.phase[0])-fourier.y.frequency.amplitude[1]
    translateY.y = fourier.y.frequency.amplitude[0]+fourier.y.frequency.amplitude[0]*Math.cos(fourier.y.frequency.phase[0])-fourier.y.frequency.amplitude[1]



   
    return(

<div>
{fourier.y.frequency.amplitude.length == 1 ? 
    <div>
<svg className='lines'width={`50vw`} height={`100vh`}
                xmlns="http://www.w3.org/2000/svg">
                <line stroke="white" x1={fourier.y.frequency.amplitude[0]} 
                                     x2={fourier.y.frequency.amplitude[0]+fourier.y.frequency.amplitude[0]*Math.sin(fourier.y.frequency.phase[0])} 
                                     y1={fourier.y.frequency.amplitude[0]} 
                                     y2={fourier.y.frequency.amplitude[0]+fourier.y.frequency.amplitude[0]*Math.cos(fourier.y.frequency.phase[0])} 
                                     strokeWidth="3"/>
            </svg> </div>
:
<div>
<svg className='lines'width={`50vw`} height={`100vh`}
                xmlns="http://www.w3.org/2000/svg">
                <line stroke="white" x1={fourier.y.frequency.amplitude[0]} 
                                     x2={translateY.x+fourier.y.frequency.amplitude[1]} 
                                     y1={fourier.y.frequency.amplitude[0]} 
                                     y2={translateY.y+fourier.y.frequency.amplitude[1]} 
                                     strokeWidth="3"/>
            </svg>
<div className="circle"style={{transform :`translate(${translateY.x}px, ${translateY.y}px)`,
                                width: `${2*fourier.y.frequency.amplitude[1]}px`, 
                                height:`${2*fourier.y.frequency.amplitude[1]}px` }} >    
                                <CalcContoursDrawY   fourier={{x:{frequency:{amplitude:fourier.x.frequency.amplitude.slice(1),
                                    phase:fourier.x.frequency.phase.slice(1),
                                    frequency: fourier.x.frequency.frequency.slice(1)}}, 
                      y:{frequency:{amplitude:fourier.y.frequency.amplitude.slice(1),
                        phase:fourier.y.frequency.phase.slice(1),
                        frequency: fourier.y.frequency.frequency.slice(1)}}}} 
            translateX={{x:translateX.x, y:translateX.y}} 
            translateY={{x:translateY.x,y:translateY.y}}/></div> </div>}



        </div>


    )

}
export default CalcContoursDrawY