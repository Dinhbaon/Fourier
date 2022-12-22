import './Upload.css' 
import Dropzone from './Children-dropzone/Dropzone.js'
import {useState} from 'react'
const Upload = () =>{ 

    const [submit, setSubmit] = useState(false)
console.log(submit)

    return(
        <div>
 <div className="dropzonecontainer" style={{display: submit ? 'none' : 'block'}}>
<Dropzone submit={submit}/>
        <form className='submit'>
        <div onClick= {()=>setSubmit(true)}className='button'>Submit</div>
        </form>
    </div>

    </div>
    );
}
export default Upload