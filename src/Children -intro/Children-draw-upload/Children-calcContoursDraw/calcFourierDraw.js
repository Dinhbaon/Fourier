import CalcCountoursDrawX from "./calcContoursDrawX"
import CalcCountoursDrawY from "./calcContoursDrawY"
import { fft, ifft } from "ezfft"



const calcFourierDraw = ({points}) => { 

    let fourier = {x:fft(points.x.slice(1),1), y:fft(points.y.slice(1),1)}
    let amplitudex = fourier.x.frequency.amplitude
    let amplitudey = fourier.y.frequency.amplitude
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
    
 


    return(
        <div>
            <div style={{position: `absolute`}}>
        <div className="circle"style={{transform :`translate(${300-fourier.x.frequency.amplitude[0]}px, ${75-fourier.x.frequency.amplitude[0]}px)`,
                                width: `${2*fourier.x.frequency.amplitude[0]}px`, 
                                height:`${2*fourier.x.frequency.amplitude[0]}px`}} > <CalcCountoursDrawX fourier = {fourier} translateX={{x:250-fourier.x.frequency.amplitude[0], y:75-fourier.x.frequency.amplitude[0],}} translateY={{x:0, y:0}}/> </div>
            </div>
            <div style={{position: `absolute`}}>
        <div className="circle"style={{transform :`translate(${75-fourier.y.frequency.amplitude[0]}px, ${250-fourier.y.frequency.amplitude[0]}px)`,
                                width: `${2*fourier.y.frequency.amplitude[0]}px`, 
                                height:`${2*fourier.y.frequency.amplitude[0]}px` }} > <CalcCountoursDrawY fourier = {fourier} translateX={{x:75-fourier.y.frequency.amplitude[0], y:250-fourier.y.frequency.amplitude[0],}} translateY={{x:0, y:0}}/> </div>
        </div>
        </div>
        
    )

}
export default calcFourierDraw