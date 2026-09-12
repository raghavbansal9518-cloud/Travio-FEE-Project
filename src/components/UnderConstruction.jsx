import React from 'react';

const UnderConstruction = ({ pageName }) => {
  return (
    <div className="construction-wrapper">
      <div className="construction-scene">
        
        {/* --- Video Container --- */}
        <div className="video-container">
          
          <video 
            src="/images/under_construction.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="construction-video"
          />

          {/* --- Watermark Cover Badge --- */}
          {/* This sits perfectly over the center to hide the iconscout watermark */}
          <div className="watermark-cover">
            <span className="material-symbols-rounded">engineering</span>
            <span>Travio Development</span>
          </div>

        </div>

        {/* --- Text Container --- */}
        <div className="construction-text-box">
          <h2>{pageName}</h2>
          <p>This section is currently under construction. Our developers are working hard on it!</p>
        </div>
        
      </div>
    </div>
  );
};

export default UnderConstruction;
