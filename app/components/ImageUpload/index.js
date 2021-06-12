/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/**
 *
 * ImageUpload
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageUploading from 'react-images-uploading';
import { MAX_IMAGE_UPLOAD_COUNT } from '../../../settings';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  max-width: 600px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 120px;
  gap: 10px 10px;
  align-items: stretch;
  justify-content: space-around;
`;

const ImageItem = styled.div`
  width: 100px;
  height: 120px;
  place-self: center stretch;
`;
const ImageButtonWrapper = styled.div``;

const getImagesContainerHeight = imagesListSize =>
  Math.ceil(imagesListSize / 4.0) * 120 + 20;

function ImageUpload({ images, onChange }) {
  /* const [images, setImages] = React.useState([]); */
  const maxNumber = MAX_IMAGE_UPLOAD_COUNT;
  /* const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  }; */

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          <>
            <div className="upload__image-wrapper">
              <button
                className="button button-shadow button-block"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop your images here
              </button>
              &nbsp;
              {errors && (
                <div>
                  {errors.maxNumber && (
                    <span>Number of selected images exceed max number 5</span>
                  )}
                  {errors.acceptType && (
                    <span>Your selected file type is not allow</span>
                  )}
                  {errors.maxFileSize && (
                    <span>Selected file size exceed maxFileSize</span>
                  )}
                  {errors.resolution && (
                    <span>
                      Selected file is not match your desired resolution
                    </span>
                  )}
                </div>
              )}
              {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
              <Wrapper>
                {imageList.map((image, index) => (
                  <ImageItem key={index.toString()} className="image-item">
                    <img
                      src={image.data_url}
                      alt=""
                      style={{
                        maxHeight: '60px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 'auto',
                      }}
                    />
                    <ImageButtonWrapper className="image-item__btn-wrapper">
                      <button
                        className="button button-sm button-block"
                        style={{ marginTop: 10 }}
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </button>
                    </ImageButtonWrapper>
                  </ImageItem>
                ))}
              </Wrapper>
            </div>
            <div
              style={{
                height: getImagesContainerHeight(imageList.length),
              }}
            />
          </>
        )}
      </ImageUploading>
    </div>
  );
}

ImageUpload.propTypes = {
  images: PropTypes.array,
  onChange: PropTypes.func,
};

export default ImageUpload;
