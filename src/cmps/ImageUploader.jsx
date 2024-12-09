
import { useRef, useState } from 'react';
import { uploadService } from '../services/upload.service';

export function ImageUploader({ onUploaded = null }) {
    const [imgData, setImgData] = useState({
        imgUrl: null,
        height: 500,
        width: 500,
    });
    const [isUploading, setIsUploading] = useState(false);

    // Create a reference to the hidden input element
    const fileInputRef = useRef(null);

    // Trigger the hidden file input when the button is clicked
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    
    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        setImgData({ imgUrl: secure_url, width, height })
        setIsUploading(false)
        onUploaded && onUploaded(secure_url)
      }


    function getUploadLabel() {
        if (imgData.imgUrl) return 'Upload Another?';
        return isUploading ? 'Uploading....' : 'Select from computer';
    }

    return (
        <div className="upload-preview">
            {/* Display the uploaded image */}
            {imgData.imgUrl && <img src={imgData.imgUrl} style={{ maxWidth: '200px', float: 'right' }} />}

            {/* Button to trigger the hidden input */}
            <button className="select-from-computer" onClick={handleButtonClick}>
                {getUploadLabel()}
            </button>

            {/* Hidden file input */}
        
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }} // Hide the file input
                    onChange={uploadImg}
                    accept="image/*"
                />
            
        
        </div>
    );
}
