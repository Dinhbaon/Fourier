import './Intro.css'
import {useState} from 'react'
import Draw from './Draw'
import Upload from './Upload'
const Intro = ()=> {
    const [draw,setDraw] = useState(false);
    const [upload, setUpload] = useState(false);
    const[intro, setIntro] = useState(true);
    const drawityourself = ()=> {
        setDraw(true)
        setIntro(false)
    }
    const uploadimg = ()=>{ 
        setUpload(true)
        setIntro(false)
    }
    return ( 
        <div> 
    {draw ? <Draw/> : null}
    {upload ? <Upload/>:null}
    {intro ? (
        <div className="startingScreencontainer"> 
            <div className="inputChoice" onClick={drawityourself} ><img src='..\drawityourself.jpg' alt="drawityourselficon"/></div>
            <div className="inputChoice" onClick={uploadimg}></div>
        </div> 
    ): null}

    </div> 

    );
}


export default Intro 