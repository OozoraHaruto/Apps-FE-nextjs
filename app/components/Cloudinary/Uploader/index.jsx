"use client"

import { useRef } from 'react';

import { WAButton } from '@/app/components/webawesome';


const CloudinaryUploadWidget = ({ uwConfig, setPublicId }, ...props) => {
  const uploadWidgetRef = useRef(null);

  const clickUploadButton = () => {
    if (!uploadWidgetRef.current) {
      uploadWidgetRef.current = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Upload successful:', result.info);
            setPublicId(result.info.public_id);
          }
        }
      );
    }

    if (uploadWidgetRef.current) {
      uploadWidgetRef.current.open();
    }
  }

  return (
    <WAButton
      id="upload_widget"
      onClick={ () => clickUploadButton() }
      { ...props }
    >
      Upload
    </WAButton>
  );
};

export default CloudinaryUploadWidget;
