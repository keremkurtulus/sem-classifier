/* eslint-disable react/button-has-type */
/**
 *
 * Main
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
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
import messages from './messages';
import { changeImages, classifyImages, classifyImagesDone } from './actions';
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
  main,
}) {
  useInjectReducer({ key: 'main', reducer });
  useInjectSaga({ key: 'main', saga });

  const handleImagesChange = imageList => {
    onChangeImages(imageList);
  };

  const handleClassify = () => {
    onRefreshResults();
    onClassifyImages();
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
                    <FormattedMessage {...messages.header} />
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
              results.map((result, i) => (
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
              ))}
          </section>

          {/* <section className="features section">
            <div className="container">
              <div className="features-inner section-inner">
                <div className="features-wrap">
                  <div className="feature">
                    <div className="feature-inner">
                      <div className="feature-header mb-16">
                        <div className="feature-icon mr-16">
                          <svg
                            width="32"
                            height="32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fillRule="nonzero" fill="none">
                              <path
                                d="M7 8H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1zM19 8h-6a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"
                                fill="#4353FF"
                              />
                              <path
                                d="M19 20h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"
                                fill="#43F1FF"
                              />
                              <path
                                d="M31 8h-6a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"
                                fill="#4353FF"
                              />
                              <path
                                d="M7 20H1a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"
                                fill="#43F1FF"
                              />
                              <path
                                d="M7 32H1a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"
                                fill="#4353FF"
                              />
                              <path
                                d="M29.5 18h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5z"
                                fill="#43F1FF"
                              />
                              <path
                                d="M17.5 30h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5zM29.5 30h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5z"
                                fill="#4353FF"
                              />
                            </g>
                          </svg>
                        </div>
                        <h4 className="feature-title m-0">Discover</h4>
                      </div>
                      <p className="text-sm mb-0">
                        A pseudo-Latin text used in web design, layout, and
                        printing in place of things to emphasise design
                        elements.
                      </p>
                    </div>
                  </div>
                  <div className="feature">
                    <div className="feature-inner">
                      <div className="feature-header mb-16">
                        <div className="feature-icon mr-16">
                          <svg
                            width="32"
                            height="32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fillRule="nonzero" fill="none">
                              <path
                                d="M4 12H0V5a5.006 5.006 0 0 1 5-5h7v4H5a1 1 0 0 0-1 1v7z"
                                fill="#43F1FF"
                              />
                              <path
                                d="M32 12h-4V5a1 1 0 0 0-1-1h-7V0h7a5.006 5.006 0 0 1 5 5v7zM12 32H5a5.006 5.006 0 0 1-5-5v-7h4v7a1 1 0 0 0 1 1h7v4z"
                                fill="#4353FF"
                              />
                              <path
                                d="M27 32h-7v-4h7a1 1 0 0 0 1-1v-7h4v7a5.006 5.006 0 0 1-5 5z"
                                fill="#43F1FF"
                              />
                            </g>
                          </svg>
                        </div>
                        <h4 className="feature-title m-0">Discover</h4>
                      </div>
                      <p className="text-sm mb-0">
                        A pseudo-Latin text used in web design, layout, and
                        printing in place of things to emphasise design
                        elements.
                      </p>
                    </div>
                  </div>
                  <div className="feature">
                    <div className="feature-inner">
                      <div className="feature-header mb-16">
                        <div className="feature-icon mr-16">
                          <svg
                            width="32"
                            height="32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fill="none" fillRule="nonzero">
                              <path
                                d="M16 9c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"
                                fill="#4353FF"
                              />
                              <path
                                d="M27 9c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"
                                fill="#43F1FF"
                              />
                              <path
                                d="M27 12c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"
                                fill="#4353FF"
                              />
                              <path
                                d="M5 23c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"
                                fill="#43F1FF"
                              />
                              <path
                                d="M27 23c-1.859 0-3.41 1.28-3.858 3h-3.284A3.994 3.994 0 0 0 17 23.142v-3.284c1.72-.447 3-2 3-3.858 0-2.206-1.794-4-4-4-1.859 0-3.41 1.28-3.858 3H8.858A3.994 3.994 0 0 0 6 12.142V8.858c1.72-.447 3-2 3-3.858 0-2.206-1.794-4-4-4S1 2.794 1 5c0 1.858 1.28 3.41 3 3.858v3.284c-1.72.447-3 2-3 3.858 0 2.206 1.794 4 4 4 1.859 0 3.41-1.28 3.858-3h3.284A3.994 3.994 0 0 0 15 19.858v3.284c-1.72.447-3 2-3 3.858 0 2.206 1.794 4 4 4 1.859 0 3.41-1.28 3.858-3h3.284c.447 1.72 2 3 3.858 3 2.206 0 4-1.794 4-4s-1.794-4-4-4z"
                                fill="#4353FF"
                              />
                            </g>
                          </svg>
                        </div>
                        <h4 className="feature-title m-0">Discover</h4>
                      </div>
                      <p className="text-sm mb-0">
                        A pseudo-Latin text used in web design, layout, and
                        printing in place of things to emphasise design
                        elements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
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
          <div className="container">
            {/* <div className="site-footer-inner has-top-divider">
              <div className="footer-copyright">
                &copy; 2021 Ellie, all rights reserved
              </div>
              <ul className="footer-social-links list-reset">
                <li>
                  <a href="#">
                    <span className="screen-reader-text">Facebook</span>
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="screen-reader-text">Twitter</span>
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="screen-reader-text">Google</span>
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Main);
