import React, { useState, useCallback } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';

const acceptedFileTypes =
  '.apng, .flac, .gif, .html, .jpg, .mp3, .pdf, .png, .svg, .txt, .wav, .webm, .webp';

const FileUpload = (props) => {
  const [compressImage, setCompressImage] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].size > 700000) {
      props.fileTooBig();
    } else {
      const fileType = acceptedFiles[0].name.split('.').pop();
      props.setFileType(fileType);

      if (compressImage && isImage(fileType)) {
        try {
          const compressedFile = await imageCompression(acceptedFiles[0], {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          });
          props.setFileSize(compressedFile.size);
          props.setFile(URL.createObjectURL(compressedFile));
          props.setFileName(compressedFile.name);
        } catch (error) {
          console.error('Image compression failed:', error);
        }
      } else {
        props.setFileSize(acceptedFiles[0].size);
        props.setFile(URL.createObjectURL(acceptedFiles[0]));
        props.setFileName(acceptedFiles[0].name);
      }
    }
  }, [compressImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
  });

  const handleCompressionChange = (e) => {
    setCompressImage(e.target.checked);
  };

  const isImage = (fileType) => {
    return ['apng', 'gif', 'jpg', 'jpeg', 'png', 'svg', 'webp'].includes(fileType);
  };

  return (
    <>
      <div className="preview-image-container mt-2">
        {props.file && (
          <div>
            {isImage(props.fileType) ? (
              <Image
                className="preview-image"
                fluid="true"
                thumbnail="true"
                alt="Uploaded file preview"
                src={props.file}
              />
            ) : (
              <div className="non-image-filename-preview">{props.fileName}</div>
            )}
          </div>
        )}
        <div {...getRootProps()} className="dropzone mt-2 mb-2">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag and drop some files here, or click to select files</p>
          )}
        </div>
        {isImage(props.fileType) && (
          <Form.Group controlId="compressImage" className="mt-2 mb-2">
            <Form.Check
              type="checkbox"
              label="Compress image"
              checked={compressImage}
              onChange={handleCompressionChange}
            />
          </Form.Group>
        )}
      </div>
    </>
  );
};

export default FileUpload;
















// import React from 'react';
// import { useState } from 'react';
// import { Form, Container, Image } from 'react-bootstrap';
// const acceptedFileTypes = ".apng, .flac, .gif, .html, .jpg, .mp3, .pdf, .png, .svg, .txt, .wav, .webm, .webp"

// const FileUpload = (props) => {
//   function handleChange(e) {
//     if (e.target.files[0].size > 700000) {
//       props.fileTooBig();
//     } else {
//       props.setFileSize(e.target.files[0].size);
//       props.setFileType(e.target.files[0].name.split('.').pop());
//       props.setFile(URL.createObjectURL(e.target.files[0]));
//     }
//   }

//   return (
//     <>
//       <div className='preview-image-container mt-2'>
//         <Image
//           fluid="true"
//           thumbnail="true"
//           alt="This preview shows up if you want to inscribe a txt,pdf,html,webm,webp,mp3,wav,flac file."
//           src={props.file}
//         />
//         <Form.Group controlId="formFile" className="mt-2 mb-2" id="file-upload-selector">
//           <Form.Control type="file" onChange={handleChange} accept={acceptedFileTypes} />
//         </Form.Group>
//       </div>

//     </>

//   )
// };
// export default FileUpload;