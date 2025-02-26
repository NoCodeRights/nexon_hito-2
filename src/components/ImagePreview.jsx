import { useState } from 'react';
import PropTypes from 'prop-types';


const ImagePreview = ({ onFilesSelected }) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onFilesSelected(files);
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  return (
    <div className="mb-3">
      <input
        type="file"
        className="form-control"
        multiple
        onChange={handleFileChange}
      />
      <div className="d-flex flex-wrap mt-2">
        {previews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`preview ${index}`}
            style={{ width: '100px', marginRight: '10px', marginBottom: '10px' }} 
          />
        ))}
      </div>
    </div>
  );
};

ImagePreview.propTypes = {
  onFilesSelected: PropTypes.func.isRequired,
};

export default ImagePreview;