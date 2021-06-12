/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/**
 *
 * Main
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LoadingIndicator from 'components/LoadingIndicator';
import Progress from 'react-circle-progress-bar';
import { useCountUp } from 'react-countup';
import makeSelectMain, {
  makeSelectImages,
  makeSelectResults,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  changeImages,
  classifyImages,
  classifyImagesDone,
  clearUploadedImages,
  loadUploadedImages,
} from './actions';
import ImageUpload from '../../components/ImageUpload';

function CountProgress({ result }) {
  const { countUp } = useCountUp({
    end: Number(result ? result.classificationResult.valueAsPercentage : 0),
  });

  return (
    <Progress
      progress={countUp}
      subtitle={result.classificationResult.label}
      style={{ width: '400px', zIndex: 99 }}
    />
  );
}

export function Main({
  images,
  results,
  onChangeImages,
  onClassifyImages,
  onRefreshResults,
  onLoadUploadedResults,
  onClearUploadedResults,
  main,
}) {
  useInjectReducer({ key: 'main', reducer });
  useInjectSaga({ key: 'main', saga });

  useEffect(() => {
    onLoadUploadedResults();
  }, []);

  const handleImagesChange = imageList => {
    onChangeImages(imageList);
  };

  const handleClassify = () => {
    onRefreshResults();
    onClassifyImages();
  };

  const handleClear = () => {
    onRefreshResults();
    onClearUploadedResults();
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Online SEM classifier" />
      </Helmet>

      <div className="body-wrap">
        <header className="site-header" />

        <main>
          <section className="hero">
            <div className="container">
              <div className="hero-inner">
                <div className="hero-copy">
                  <h1 className="hero-title mt-0 is-revealing">
                    SEM Classifier!
                  </h1>
                  <p className="hero-paragraph is-revealing">
                    Use this service to automatically classify and tag your SEM
                    images. If you are not satisfied with the result, you can
                    manually insert a new category.
                  </p>
                  {main.error ? (
                    <p
                      className="hero-paragraph is-revealing"
                      style={{ color: 'orange' }}
                    >
                      {main.error}
                    </p>
                  ) : null}

                  <div className="hero-form field field-grouped is-revealing">
                    <div className="control control-expanded">
                      <ImageUpload
                        images={images}
                        onChange={handleImagesChange}
                      />
                    </div>
                    <div className="control">
                      {main.loading ? (
                        <LoadingIndicator />
                      ) : (
                        <button
                          className="button button-primary button-block"
                          disabled={!images.length || main.loading}
                          onClick={handleClassify}
                        >
                          Classify Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="hero-illustration">
                  <div className="hero-bg" style={{ zIndex: 0 }}>
                    <svg
                      width="720"
                      height="635"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="97.738%"
                          id="a"
                        >
                          <stop stopColor="#151616" offset="0%" />
                          <stop stopColor="#222424" offset="100%" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 0h720v504.382L279.437 630.304c-53.102 15.177-108.454-15.567-123.631-68.669-.072-.25-.142-.5-.211-.75L0 0z"
                        fill="url(#a)"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {results &&
              Array.from(results)
                .reverse()
                .map(historyResult =>
                  historyResult.map((result, i) => (
                    <div key={String(i)}>
                      <div
                        className=""
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ paddingRight: '70px' }}>
                          <img
                            alt=""
                            src={`uploads/${result.fileName}`}
                            style={{ maxHeight: '100px' }}
                          />
                        </div>
                        <CountProgress result={result} />
                      </div>
                    </div>
                  )),
                )}

            {results && results.length > 0 && (
              <button className="button button-secondary" onClick={handleClear}>
                Clear Old Results
              </button>
            )}
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-bg" style={{ zIndex: -1 }}>
            <svg width="385" height="305" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  x1="50%"
                  y1="34.994%"
                  x2="50%"
                  y2="97.738%"
                  id="footer-bg"
                >
                  <stop stopColor="#151616" offset="0%" />
                  <stop stopColor="#222424" offset="100%" />
                </linearGradient>
              </defs>
              <path
                d="M384.557 116.012V305H0L210.643 0l173.914 116.012z"
                fill="url(#footer-bg)"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <div
            className="footer-dots is-moving-object is-translating"
            data-translating-factor="160"
          >
            <svg width="69" height="91" xmlns="http://www.w3.org/2000/svg">
              <g fill="#43F1FF" fillRule="evenodd">
                <path d="M37.105 41.007l-2.9 1.334-.786 2.823.926 2.689 2.76 1.154 2.6-1.31 1.714-2.533-1.296-2.94z" />
                <path
                  fillOpacity=".64"
                  d="M63.109 27.24l-1.45.666-.394 1.412.464 1.344 1.38.577 1.3-.655.856-1.266-.647-1.47z"
                />
                <path
                  fillOpacity=".24"
                  d="M66.226 86.638l-1.45.667-.393 1.412.463 1.344 1.38.577 1.3-.655.857-1.266-.648-1.47z"
                />
                <path
                  fillOpacity=".64"
                  d="M13.497 43.713l-2.175 1-.59 2.118.695 2.016 2.07.866 1.95-.983 1.285-1.9-.972-2.204z"
                />
                <path
                  fillOpacity=".8"
                  d="M59.076 56.658l-2.175 1-.59 2.117.695 2.017 2.07.866 1.949-.983 1.286-1.9-.972-2.204z"
                />
                <path
                  fillOpacity=".48"
                  d="M22.262 18.49l-1.45.667-.393 1.412.463 1.344 1.38.577 1.3-.655.857-1.266-.648-1.47z"
                />
                <path
                  fillOpacity=".64"
                  d="M23.422.5l-1.45.667-.393 1.412.463 1.344 1.38.577 1.3-.655.857-1.266-.648-1.47z"
                />
                <path
                  fillOpacity=".48"
                  d="M2.637 12.5l-1.45.667-.393 1.412.463 1.344 1.38.577 1.3-.655.857-1.266-.648-1.47zM36.563 10.856l-.725.334-.197.706.232.672.69.288.65-.327.428-.633-.324-.735z"
                />
              </g>
            </svg>
          </div>
          <div className="container" />
        </footer>
      </div>
    </>
  );
}

Main.propTypes = {
  main: PropTypes.object,
  images: PropTypes.array,
  results: PropTypes.array,
  onChangeImages: PropTypes.func,
  onClassifyImages: PropTypes.func,
  onRefreshResults: PropTypes.func,
  onLoadUploadedResults: PropTypes.func,
  onClearUploadedResults: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  main: makeSelectMain(),
  images: makeSelectImages(),
  results: makeSelectResults(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeImages: images => dispatch(changeImages(images)),
    onClassifyImages: () => dispatch(classifyImages()),
    onRefreshResults: () => dispatch(classifyImagesDone([])),
    onLoadUploadedResults: () => dispatch(loadUploadedImages()),
    onClearUploadedResults: () => dispatch(clearUploadedImages()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Main);
