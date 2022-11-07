import React, { useEffect, useRef } from "react";
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component";
import { comment_png } from "../imports/Assets_Import"
const Lazy_Load_Img = ({ url, style, scrollPosition }) => {
  const imgRef = useRef();
  useEffect(() => {
    const img = imgRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute("src", url);
        img.classList.add("active");
      }
    });
    if (img) {
      observer.observe(img);
    }
    return () => {
      if (img) observer.unobserve(img);
    };
  }, [url]);

  return (
    <React.Fragment>
      {style ? (
        <img
          alt="...loading"
          ref={imgRef}
          className="lazy-load"
          style={style}
        />
      ) : (
        <img alt="...loading" ref={imgRef} className="lazy-load" />
      )}
      {/* <LazyLoadImage
        src={url}
        effect="opacity"
        alt={url}
        placeholderSrc={url}
        scrollPosition={scrollPosition}
      /> */}
    </React.Fragment>
  );
};

export default Lazy_Load_Img;
// export default trackWindowScroll(Lazy_Load_Img);
