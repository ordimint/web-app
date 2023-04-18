import React from 'react';
import { useState } from 'react';
import { Form, Container, Image } from 'react-bootstrap';
const acceptedFileTypes = ".apng, .flac, .gif, .html, .jpg, .mp3, .pdf, .png, .svg, .txt, .wav, .webm, .webp"

const FileUpload = (props) => {
  function handleChange(e) {
    if (e.target.files[0].size > 700000) {
      props.fileTooBig();
    } else {
      props.setFileSize(e.target.files[0].size);
      props.setFileType(e.target.files[0].name.split('.').pop());
      props.setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <div className='preview-image-container mt-2'>
        <Image
          fluid="true"
          thumbnail="true"
          alt="This preview shows up if you want to inscribe a txt,pdf,html,webm,webp,mp3,wav,flac file."
          src={props.file}
        />
        <Form.Group controlId="formFile" className="mt-2 mb-2" id="file-upload-selector">
          <Form.Control type="file" onChange={handleChange} accept={acceptedFileTypes} />
        </Form.Group>
      </div>

    </>

  )
};
export default FileUpload;