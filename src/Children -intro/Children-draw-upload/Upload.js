import './Upload.css' 
import Dropzone from './Children-dropzone/Dropzone.js'
import {useState} from 'react'
import CalcCountoursUpload from './Children-dropzone/calcContoursUpload.js'
const Upload = () =>{ 

    const [submit, setSubmit] = useState(false)
    return(
        <div>
{submit ?     <CalcCountoursUpload/>:
 <div className="dropzonecontainer" style={{display: submit ? 'none' : 'block'}}>
<Dropzone submit={submit}/>
        <form className='submit'>
        <div onClick= {()=>setSubmit(true)}className='button'>Submit</div>
        </form>
    </div>}

    </div>
    );
}
export default Upload