import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
const Carousels = () => {
                const Scroll = useRef();
  const { result_carousel } = useSelector((state) => ({
    ...state.carousel_user,
  }));
  useEffect(() => {
    lottie.loadAnimation({
      container: Scroll.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../../utils/json/ScrollToTop.json'),
    });
  }, []);

  return (
    <React.Fragment>
      {result_carousel && (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            {result_carousel?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={index}
                    className={index === 0 ? 'active' : ''}
                  />
                </React.Fragment>
              );
            })}
          </ol>
          <div className="carousel-inner">
            {result_carousel.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className={`carousel-item ${index === 0 && 'active'}`}>
                    <img className="d-block w-100" src={item.doc.image.url} alt="First slide" />
                    <div className="carousel-caption d-none d-md-block ">
                      <h1>{item.doc.heading}</h1>
                      <p>{item.doc.description}</p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      )}
    </React.Fragment>
  );
};

export default Carousels;
