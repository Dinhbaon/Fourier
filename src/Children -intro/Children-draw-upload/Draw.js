import './Draw.css'
import React, { useState,useEffect,useRef } from 'react'
import CalcCountoursDraw from './Children-calcContoursDraw/calcContoursDraw.js';
const Draw = () => { 
 
const containerref = useRef(null);
const contextref = useRef(null)


  const [mousePos, setMousePos] = useState({x:[0],y:[0]});
  const [isDrawing, setIsDrawing] = useState()
  const [finishedDraw,setFinishedDraw] = useState(false)

  useEffect(() => {
      const canvas = containerref.current; 
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight*1.4;
      canvas.style.width= `${0.5*window.innerWidth}px`
      canvas.style.height = `${0.7*window.innerHeight}px`

      const canvasctx = canvas.getContext("2d");
      canvasctx.scale(window.devicePixelRatio,window.devicePixelRatio)
      canvasctx.strokeStyle= "black";
      canvasctx.lineCap="round";
      canvasctx.lineWidth="25";
      contextref.current = canvasctx; 
    },[]);
 
  var draw_on_click = (e) => {
    const boundrect = containerref.current.getBoundingClientRect();
    contextref.current.beginPath()
    contextref.current.moveTo((e.x-boundrect.left)/(0.5*window.devicePixelRatio),(e.y-boundrect.top)/(0.5*window.devicePixelRatio))
    setIsDrawing(true)
  
  }
  var toggle_draw = () =>  {
    setIsDrawing(false)
    contextref.current.closePath()  
    setFinishedDraw(true)
  }

  
  var on_move = (event)=> { 
    

      if(!isDrawing) {

      return 
    }
      const boundrect = containerref.current.getBoundingClientRect();
      contextref.current.beginPath()
      setMousePos((mousePos)=>({x: [...mousePos.x, event.clientX], y:[...mousePos.y, event.clientY]}));

      contextref.current.lineTo((event.clientX-boundrect.left)/(0.5*window.devicePixelRatio), (event.clientY-boundrect.top)/(0.5*window.devicePixelRatio))
      contextref.current.stroke()
      
  }


return(

<div>
{finishedDraw ?
<CalcCountoursDraw points = {mousePos}/>: <canvas className="drawContainer" id="drawContainer" ref={containerref}
onMouseDown={draw_on_click}
onMouseUp={toggle_draw}
onMouseMove={isDrawing ? on_move : undefined}></canvas> }
</div> 
);
}


export default Draw 