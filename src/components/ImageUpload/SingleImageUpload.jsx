import React, { useState, useRef } from 'react';
import { readAndCompressImage } from 'browser-image-resizer';

import addPhoto from '../../assets/svg/addPhoto.svg';

import './ImageUpload.css';

function SingleImageUpload({ selectedImage, setSelectedImage, setSelectedImageName }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImageName(file.name)
        // console.log(file.name); // This will log the name of the file
        readImage(file).then(dataUrl => {
            setSelectedImage(dataUrl);
        });
    };

    const handleImageDelete = () => {
        setSelectedImage(null);
        fileInputRef.current.value = null;
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedImageName(file.name)
        // console.log(file.name); // This will log the name of the file
        readImage(file).then(dataUrl => {
            setSelectedImage(dataUrl);
        });
        setIsDragOver(false);
    };

    const readImage = async (file) => {
        const config = {
            quality: 0.7,
            maxWidth: 1920,
            maxHeight: 1080,
            mimeType: 'image/webp',
            debug: true,
        };
        
        try {
            const resizedImageFile = await readAndCompressImage(file, config);
            const reader = new FileReader();
            
            return new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                
                reader.onerror = reject;
    
                reader.readAsDataURL(resizedImageFile);
            });
        } catch (error) {
            console.log('Failed to resize the image:', error);
        }
    };

    return (
        <div className="single-image-box">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
            />

            {selectedImage ? (
                <div className='single-image-result'>
                    <button className='single-image-result-delete' onClick={handleImageDelete}>Delete</button>
                    <img src={selectedImage} alt="Selected"/>
                </div>
            ) : (
                <div className={`single-image-box-inner ${isDragOver ? 'enbolden-border' : ''}`} onClick={() => fileInputRef.current.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                    <img src={addPhoto} alt="add banner image" className="single-image-box-image" />
                    <span className='single-image-innertext'>Drop your file here or browse</span>
                </div>
            )}
        </div>
    );
}

export default SingleImageUpload;
