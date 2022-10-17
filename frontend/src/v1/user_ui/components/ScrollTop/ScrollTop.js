import React, { useEffect, useState } from "react";
import styled from "styled-components";
const ScrollTop = () => {
  const [Scroll, setScroll] = useState(false);
  const handleScroll = () => {
    const scroll = document.documentElement.scrollTop;
    if (scroll > 80) {
      setScroll(true);
    } else if (scroll < 80) {
      setScroll(false);
    }
  };
  const handleClickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [Scroll]);
  return (
    <>
      <ScrollTops>
        <div
          className={`fas fa-angle-up scroll-top ${Scroll ? "active11" : ""}`}
          id="scroll-top"
          onClick={handleClickTop}
        ></div>
      </ScrollTops>
    </>
  );
};

export default ScrollTop;
const ScrollTops = styled.div`
  .scroll-top {
    position: fixed;
    top: -150%;
    right: 2rem;
    padding: 0.5rem 1.1rem;
    font-size: 2.5rem;
    background: #1cb803;
    color: #fff;
    border-radius: 0.5rem;
    transition: 1s linear;
    z-index: 1000;
  }

  .active11 {
    top: calc(100% - 6.2rem);
  }
`;
