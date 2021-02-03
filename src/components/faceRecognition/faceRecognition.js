import React from 'react';
import './facerecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div class='center ma'>
      <div className='absolute mt2'>
        {imageUrl !== '' ? (
          <img
            id='inputImage'
            src={imageUrl}
            alt='img'
            width='500px'
            height='auto'
          />
        ) : null}
        <div
          className='bounding-box'
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
