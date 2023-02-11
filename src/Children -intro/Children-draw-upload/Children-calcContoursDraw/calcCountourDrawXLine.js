import React from "react";
import {useEffect} from "react"
import { fft, ifft } from "ezfft"
import '../Children-dropzone/calcContours.css'
import { motion } from "framer-motion"


const CalcContoursDrawXLine=({fourier, translateX, translateY}) =>{
    if(fourier.x.frequency.amplitude.length == 0){ 
        return(null)
    }
    translateX.x = fourier.x.frequency.amplitude[0]+fourier.x.frequency.amplitude[0]*Math.cos(fourier.x.frequency.phase[0])-fourier.x.frequency.amplitude[1]
    translateX.y = fourier.x.frequency.amplitude[0]+fourier.x.frequency.amplitude[0]*Math.sin(fourier.x.frequency.phase[0])-fourier.x.frequency.amplitude[1]

    return(
<div>

<svg class='lines'width={`100vw`} height={`100vh`}
                xmlns="http://www.w3.org/2000/svg">
                <line stroke="white" x1={fourier.x.frequency.amplitude[0]} 
                                     x2={translateX.x+fourier.x.frequency.amplitude[1]} 
                                     y1={fourier.x.frequency.amplitude[0]} 
                                     y2={translateX.y+fourier.x.frequency.amplitude[1]} 
                                     stroke-width="10%"/>
            </svg>
            <div style={{transform :`translate(${translateX.x}px, ${translateX.y}px)`,
                        opacity:1 }} >    
                                <CalcContoursDrawXLine   fourier={{x:{frequency:{amplitude:fourier.x.frequency.amplitude.slice(1),
                                    phase:fourier.x.frequency.phase.slice(1),
                                    frequency: fourier.x.frequency.frequency.slice(1)}}, 
                      y:{frequency:{amplitude:fourier.y.frequency.amplitude.slice(1),
                        phase:fourier.y.frequency.phase.slice(1),
                        frequency: fourier.y.frequency.frequency.slice(1)}}}} 
            translateX={{x:translateX.x, y:translateX.y}} 
            translateY={{x:translateY.x,y:translateY.y}}/></div>




        </div>


    )

}
export default CalcContoursDrawXLine