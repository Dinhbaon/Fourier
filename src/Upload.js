import './Upload.css' 
import Dropzone from './Dropzone.js'
const Upload = () =>{ 
    return(
    <div className="container">
<Dropzone/>
        <form classname='submit'action="/action_page.php">
            <input type="file" id="myFile" name="filename" onChange="this.form.submit()" accept="image/png, image/jpeg"/>
        </form>
    </div>
    );
}
export default Upload