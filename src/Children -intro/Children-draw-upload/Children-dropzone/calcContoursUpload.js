import React from "react";
import { fft, ifft } from "ezfft"
import './calcContours.css'


const Calccountours=() =>{

      let img = document.getElementById("uploadedimg")
      let cvimg = window["cv"].imread(img)
      window["cv"].cvtColor(cvimg, cvimg, window["cv"].COLOR_RGBA2GRAY, 0);
      window["cv"].threshold(cvimg, cvimg, 177, 200, window["cv"].THRESH_BINARY);
      let contours = new window["cv"].MatVector();
      let hierarchy = new window["cv"].Mat();
      window["cv"].findContours(cvimg, contours, hierarchy, window["cv"].RETR_CCOMP, window["cv"].CHAIN_APPROX_SIMPLE);
      const pointsX = []
      const pointsY = []
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
console.log(fft(pointsX, 1))
console.log(fft(pointsY,1))
    return(
<div className="circle"></div>
    )

}
export default Calccountours