import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./Dropzone.css";

function Dropzone() {
  const { getRootProps, getInputProps, acceptedFiles } =useDropzone({onDrop: acceptedFiles => {
    acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));}, maxFiles:1});
  const files = acceptedFiles.map((file) => (
<div key = {file.path}>
      {file.path}
      <img  className="uploadedimg"
            id = "uploadedimg"
            style={{}}
            src={file.preview}
            alt = "User uploaded" />  
</div>
  ));

  return (    
    <div className="container">
      <aside>
        <ul >{files}</ul>
      </aside>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Click or Drag your Image here</p>
      </div>
  </div>
  );
}
export default Dropzone;