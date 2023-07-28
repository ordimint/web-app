import React, { useState, useCallback, useContext } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { AiOutlineCloudUpload } from 'react-icons/ai';


const acceptedFileTypes =
  'image/apng, image/gif, image/jpeg, image/jpg, image/png, image/svg+xml, image/webp, .html, .txt, audio/flac, audio/mpeg, audio/wav, video/webm, application/pdf';

const FileUpload = (props) => {

  const [compressImage, setCompressImage] = useState(true);
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedImageURL, setCompressedImageURL] = useState(null);


  const compressAndSetImage = async (file) => {
    try {

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1280,
        quality: 0.3,
        resize: true,
        initialQuality: 0.5,
        alwaysKeepResolution: true,
        useWebWorker: true,
      });
      props.setFileSize(compressedFile.size);
      setCompressedImageURL(URL.createObjectURL(compressedFile));
      props.setFile(URL.createObjectURL(compressedFile));
      props.setFileName(compressedFile.name);

    } catch (error) {
      console.error('Image compression failed:', error);
    }
  };


  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!acceptedFileTypes.includes(fileExtension)) {
      alert('Unsupported file type. Please upload a supported file.');
      return;
    }


    const sizeLimit = 700000;

    if (acceptedFiles[0].size > sizeLimit) {
      props.fileTooBig();
    } else {
      const fileType = acceptedFiles[0].name.split('.').pop();
      props.setFileType(fileType);
      setOriginalFile(acceptedFiles[0]);

      if (compressImage && isImage(fileType)) {
        await compressAndSetImage(acceptedFiles[0]);
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
    maxFiles: 1,
  });


  const handleCompressionChange = async (e) => {
    const isChecked = e.target.checked;
    setCompressImage(isChecked);

    if (props.file && isImage(props.fileType)) {
      if (isChecked) {
        await compressAndSetImage(await fetch(props.file).then((res) => res.blob()));
      } else if (originalFile) {
        // Revert to the original file
        props.setFileSize(originalFile.size);
        props.setFile(URL.createObjectURL(originalFile));
        props.setFileName(originalFile.name);
      }
    }
  };


  const isImage = (fileType) => {
    return ['apng', 'gif', 'jpg', 'jpeg', 'png', 'webp'].includes(fileType);
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
                src={compressImage && compressedImageURL ? compressedImageURL : props.file}
              />
            ) : (
              <h5 className="non-image-filename-preview">{props.fileName}</h5>
            )}
          </div>
        )}
        <div {...getRootProps()} className="dropzone mt-2 mb-2">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <>
              <AiOutlineCloudUpload size={48} className="upload-icon" />
              <p>

                {' '}
                Drag and drop a file here, or click to select a file you want to inscribe.</p>
            </>
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
