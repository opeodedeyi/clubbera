import React, { useState, useRef } from 'react';
import addPhoto from '../../assets/svg/addPhoto.svg';
import './ImageUpload.css';

function SingleImageUpload() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        readImage(file);
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
        readImage(file);
        setIsDragOver(false);
    };

    const readImage = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        reader.readAsDataURL(file);
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
