import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export const DropZoneComponent = ({ image, onFileReady }) => {
  const [imageUrl, setImageUrl] = useState(image);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (acceptedFiles[0]) {
      setImageUrl(URL.createObjectURL(acceptedFiles[0]));
      onFileReady(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <Box className={`relative hover:opacity-90 w-full ${imageUrl ? '' : 'h-full'}`}>
      <div {...getRootProps()} className="w-full h-full">
        <input {...getInputProps()} />
        {imageUrl ? (
          <img src={imageUrl} alt="Uploaded" className="rounded-2xl" />
        ) : (
          <Box className="w-full h-full flex justify-center items-center border-2 border-dashed border-black rounded-2xl">
            <AddPhotoAlternateIcon className="text-6xl opacity-60" />
          </Box>
        )}
        <Box className="textColorWhite w-full h-full absolute top-0 left-0 flex justify-center items-center opacity-0 hover:opacity-50">
          <AddPhotoAlternateIcon className="text-6xl" />
        </Box>
      </div>
    </Box>
  );
};
