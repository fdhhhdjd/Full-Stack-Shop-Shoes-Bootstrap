import React, { useEffect, useRef } from "react";
const Lazy_Load_Img = ({ url, style }) => {
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
    </React.Fragment>
  );
};

export default Lazy_Load_Img;
