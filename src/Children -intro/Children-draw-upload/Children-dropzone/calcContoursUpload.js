import React from "react";
import { fft } from "ezfft"
import './calcContours.css'


const CalcCountoursUpload=() =>{

      let img = document.getElementById("uploadedimg")
      let cvimg = window["cv"].imread(img)
      window["cv"].cvtColor(cvimg, cvimg, window["cv"].COLOR_RGBA2GRAY, 0);
      window["cv"].threshold(cvimg, cvimg, 177, 200, window["cv"].THRESH_BINARY);
      let contours = new window["cv"].MatVector();
      let hierarchy = new window["cv"].Mat();
      window["cv"].findContours(cvimg, contours, hierarchy, window["cv"].RETR_CCOMP, window["cv"].CHAIN_APPROX_SIMPLE);
      let pointsX = []
      let pointsY = []
      for (let i = 0; i < contours.size(); ++i) {
        const ci = contours.get(i)
        for (let j = 0; j < ci.data32S.length; j += 2){
          let px = ci.data32S[j]
          let py = ci.data32S[j+1]
          pointsX.push(px)
          pointsY.push(py)
        }
      }
console.log(pointsX)
      pointsX = pointsX.map(x=>3*x)
      pointsY = pointsY.map(x=>3*x)
      let fourier ={x:fft(pointsX.slice(1),1),y:fft(pointsY.slice(1),1)}
console.log(fourier)
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
  let initialposx = [{x:250-fourier.x.frequency.amplitude[0],y:75-fourier.x.frequency.amplitude[0]}]
  let initialposy = [{x:75-fourier.y.frequency.amplitude[0],y:200 -fourier.y.frequency.amplitude[0]}]
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
      ycircles.push(<div className="circle" 
      style={{width : `${2*fourier.y.frequency.amplitude[i]}px`, height: `${2*fourier.y.frequency.amplitude[i]}px`,transform: ` rotate(90deg)translate(${initialposy[i].x}px, ${initialposy[i].y}px) `,
      transformOrigin: `${50}px ${200}px`}}></div>)
  
  }
  for(let i = 1; i<fourier.x.frequency.amplitude.length; i++){ 
      xcircles.push(  
          <div  className="lines" >            
          <svg 
              width={`100vw`} height={`100vh`}
              xmlns="http://www.w3.org/2000/svg">
              <line id='linex' stroke="white" x1={initialposx[i-1].x+fourier.x.frequency.amplitude[i-1]} 
                                              x2={initialposx[i].x+fourier.x.frequency.amplitude[i]} 
                                              y1={initialposx[i-1].y+fourier.x.frequency.amplitude[i-1]} 
                                              y2={initialposx[i].y+fourier.x.frequency.amplitude[i]} />
          </svg>
          </div> )
      ycircles.push(
          <div  className="lines" >            
          <svg 
              width={`100vw`} height={`100vh`}
              xmlns="http://www.w3.org/2000/svg">
              <line transform= "rotate(90 50 200)"id='linex' stroke="white" 
                                              x1={initialposy[i-1].x+fourier.y.frequency.amplitude[i-1]} 
                                              x2={initialposy[i].x+fourier.y.frequency.amplitude[i]} 
                                              y1={initialposy[i-1].y+fourier.y.frequency.amplitude[i-1]} 
                                              y2={initialposy[i].y+fourier.y.frequency.amplitude[i]} />
          </svg>
          </div>   
      )
        console.log(xcircles)
  }

      return(
  <div>
          
      {/*x values */}
          {xcircles}
      {/*y values */}
          {ycircles} 
  
          </div>
  
      )

}
export default CalcCountoursUpload